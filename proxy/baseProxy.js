import Axios from 'axios';
const proxy = Axios.create({
    baseURL: 'https://weibo.com/'
});

export default proxy;
