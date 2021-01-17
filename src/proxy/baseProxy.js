import Axios from 'axios';
import config from '../../config.js';
const proxy = Axios.create({
    baseURL: 'https://weibo.com/',
    headers: {
        'accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9',
        'accept-encoding': 'gzip, deflate, br',
        'accept-language': 'zh-CN,zh;q=0.9,en-US;q=0.8,en-CA;q=0.7,en;q=0.6',
        'cache-control': 'no-cache',
        'cookie': config.cookie,
        'pragma': 'no-cache',
        'upgrade-insecure-requests': 1,
        'user-agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_5) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/87.0.4280.141 Safari/537.36'
    }
});

export default proxy;
