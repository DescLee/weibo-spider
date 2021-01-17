export default function({ id = 0, ...restParam} ) {
    let param = {
        ajwvr: 6,
        id,
        from: 'singleWeiBo',
        __rnd: Date.now(),
    };

    if (restParam['root_comment_max_id'] > 0) {
        param = {
            ...param,
            ...restParam
        }
    }
    return param;
}
