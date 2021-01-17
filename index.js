import proxy from './proxy/baseProxy.js';
proxy.get('/aj/v6/comment/big').then(data => {
    console.log('123', data);
})
