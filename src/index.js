import createParam from './comment/createParam.js';
import transDiffTime from './util/transDiffTime.js';
import start from './comment/index.js';
import config from '../config.js';

const START_TIME = Date.now();

const params = createParam({
    id: config.id,
});

start(params);

process.on('unhandledRejection', (reason) => {
    console.log(reason);
    console.log(`unhandledRejection, 本次运行总时长：${transDiffTime(Date.now() - START_TIME)}`);
});
process.on('rejectionHandled', () => {
    console.log(`rejectionHandled, 本次运行总时长：${transDiffTime(Date.now() - START_TIME)}`);
});

process.on('uncaughtException', () => {
    console.log(`rejectionHandled, 本次运行总时长：${transDiffTime(Date.now() - START_TIME)}`);
});
process.on('SIGINT', () => {
    process.exit(0);
});

process.on('exit', (e) => {
    console.log(e, `,本次运行总时长：${transDiffTime(Date.now() - START_TIME)}`);
    process.exit(0);
});
