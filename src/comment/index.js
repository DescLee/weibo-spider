import getBigComment from '../proxy/getBigComment.js';
import createParam from './createParam.js';
import qs from 'querystring';
import cheerio from 'cheerio';
import fs from 'fs';
import transDiffTime from '../util/transDiffTime.js';

let count = 0;


export default async function start(params) {
    console.log(`---------第${params.page || 1}页----------`);
    const CUR_START_TIME = Date.now();
    const info = await getBigComment(params);
    if (info.code !== '100000') {
        console.log('接口请求错误！', info.msg);
        return;
    }
    const { html } = info.data;

    const $ = cheerio.load(html.split('\n').join(''));
    const commentList = $('[node-type="replywrap"]>.WB_text');
    let textToSave = [];

    for (let i = 0; i < commentList.length; i += 1) {
        const textEle = commentList[i];
        let commentContent = '';
        let commentPic = '';
        const userName = textEle.children[1].children[0].data;
        const curContent = [];

        let commentContentEle = null;
        let contentIndex = -1;
        ([4, 3, 2]).forEach(index => {
            if (textEle.children[index] && textEle.children[index].data) {
                contentIndex = index;
                commentContentEle = textEle.children[index];
                commentContent = commentContentEle.data || '';
                commentContent = commentContent.trim().replace('：', '');
                return;
            }
        });

        if (
            commentContentEle
            && commentContentEle.parent.children[commentContentEle.parent.children.length - 2]?.name === 'a'
            && commentContentEle.parent.children.length - 2 > contentIndex
        ) {
            // 取评论右侧的"图片评论"短连接，前两页没有这个，因此需要判断取用的"图片链接"要在评论内容右侧
            commentPic = commentContentEle.parent.children[commentContentEle.parent.children.length - 2].attribs.alt;
        } else {
            // 取下面大图的链接
            commentPic = textEle.next?.next?.next?.next?.children[1]?.children[1]?.children[4]?.children[0]?.attribs.src || '--';
            commentPic = commentPic.replace('thumb180', 'bmiddle');
            if (commentPic.startsWith('//')) {
                commentPic = `http:${commentPic}`;
            }
        }
        if (commentContent && commentPic) {
            console.log(`(${count})【${userName}】:${commentContent}, 链接：[${commentPic}]`);

            curContent.push(count, userName, commentContent, commentPic);
            textToSave.push(curContent.join('\t'));
            count += 1;
        }
    }
    // 为了防止最后一行之后与下次循环第一行之前没有换行，这里手动加入一个空行
    textToSave.push('');

    // 将获取的数据存入txt文件中进行保存
    fs.appendFile(`${process.env.PWD}/data/${params.id}.txt`, textToSave.join('\n'), 'utf8', e => {
        if (e) {
            throw new Error(e);
        } else {
            console.log(`存入成功！本次运行总时长：${transDiffTime(Date.now() - CUR_START_TIME)}`);
        }
    });

    // 获取最后一个元素，拿到下一个请求的参数
    const commentLoading = $('[node-type="comment_loading"],[action-type="click_more_comment"]');
    if (commentLoading.length === 0) {
        process.exit(0);
    }
    const originNextParam = qs.parse(commentLoading[0].attribs['action-data']);

    const delay = Math.random() * 10 + 5;
    setTimeout(() => {
        const nextParams = createParam(originNextParam);
        start(nextParams);
    }, delay * 1000);
}
