#!node
const fs = require('fs')

function list_dic() {
    // 增加读取参数
    var currentDic = './';
    console.log(`type\t\ttime\t\t\t\tsize\t\t\tname`);
    fs.readdirSync(currentDic, 'utf8', function(err, dirs) {
        if (err) {
            console.log(err);
            return null;
        }
        return dirs;
    }).forEach(d => {
        let path = currentDic + '/' + d;
        let stat = fs.statSync(path, (stat) => { return stat}); 
        let atime = stat.atime.toLocaleString('zh-CN');
        let size=  (stat.size / 1024).toFixed(2) + 'k';
        let dType = stat.isDirectory() ? 'd----' : 'f----';
        let rst = `${dType}\t\t${atime}\t\t${size}`;
        if (size.length < 8) rst += `\t`;
        rst += `\t\t${d.trim()}`;
        console.log(rst);
    });
}

list_dic();
