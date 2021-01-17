import proxy from './baseProxy.js';
const getBigComment = async function(params) {
    return await proxy.get('/aj/v6/comment/big', { params })
        .then(info => info.data)
        .catch(e => '');
};
export default getBigComment;
