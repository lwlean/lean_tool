const { exec } = require('child_process');
const { profileEnd } = require('console');

const searchDic = {
    zhihu: 'https://www.zhihu.com/search?q=',
    baidu: 'https://www.baidu.com/s?wd=',
    weibo: 'https://s.weibo.com/weibo?q=',
    npmjs: 'https://www.npmjs.com/search?q=',
    github: 'https://www.github.com/search?q='
}

const search = (site, param) => {
    if (param === undefined || param === '' || param === null) return;
    if (process.platform !== 'win32') return;
    const url = searchDic[site];
    if (url === undefined || url === null) return;
    let cmd = isContainChromePath() ? 'chrome ' : 'start ';
    exec(cmd + url + param, (err, stdout, stderr) => {
        if (err) console.log(err);
        if (stderr) console.log(stderr);
        console.log(stdout);
    });
}

const isContainChromePath = () => {
    return process.env.Path.split(';').some((param, index, arr) => {
        return param.indexOf('Chrome') > -1
    })
}

module.exports = search;
