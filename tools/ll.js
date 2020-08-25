#!node
const fs = require('fs');
const args = require('yargs').argv;
const colors = require('colors');

var dirArr = [];
var fileArr = [];

function list_dic() {
    const findName = args.f;
    try {
        // 增加读取参数
        var currentDic = './';
        console.log('type\t\ttime\t\t\t\tsize\t\t\tname'['green']);
        fs.readdirSync(currentDic, 'utf8', function(err, dirs) {
            if (err) {
                console.log(err);
                return null;
            }
            return dirs;
        }).forEach(d => {
            if (findName !== undefined && d.trim().indexOf(findName) < 0) {
                return;
            }
            let path = currentDic + '/' + d;
            let stat = fs.statSync(path, (err, stat) => {
                if (err) {
                    console.log('err path:' + path);
                    return;
                }
                return stat
            });

            let atime = stat.atime.toLocaleString('zh-CN');
            let size=  (stat.size / 1024).toFixed(2) + 'k';
            let dType = stat.isDirectory() ? 'd----'['magenta'] : 'f----'['yellow'];
            let rst = `${dType}\t\t${atime}\t\t${size}`;
            if (size.length < 8) rst += `\t`;
            rst += `\t\t${d.trim()}`;
            
            if (stat.isDirectory()) {
                dirArr.push(rst);
            } else {
                fileArr.push(rst);
            }
        });

        dirArr.forEach(dirLine => {
            console.log(dirLine);
        })

        fileArr.forEach(fileLine => {
            console.log(fileLine);
        });

        dirArr.length = fileArr.length = 0; // 清空数组
    } catch(e) {
        console.error('catch err:', e);
    }
}

function getFileStats(path) {
    try {
         
    } catch (e) {
        console.err('catch err path:', path);
        return null;
    }
}

list_dic();
