export default function(diffTimeMs) {
    const diffTimeM = diffTimeMs / 1000;
    return `${Math.floor(diffTimeM / 3600)}小时${Math.floor(diffTimeM / 60)}分${diffTimeM % 60}秒`;
}
