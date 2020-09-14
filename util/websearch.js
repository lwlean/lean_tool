const { exec } = require('child_process');

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
    let url = searchDic[site];
    if (url === undefined || url === null) return;
    exec('chrome ' + url + param, (err, stdout, stderr) => {
        if (err) {
            console.log(err);
        }
        console.log(stdout);
    });
} 

module.exports = search;
