#!node
const fs = require('fs');
const args = require('yargs').argv;
const colors = require('colors');


var dirArr = [];
var fileArr = [];

function list_dic() {
    var blackFile=  require('../config/BlackFile.json');
    const findName = args.f;
    var err_name = '';
    var blackFileArr = blackFile['black_file'];
    console.log('blackfile:' + blackFileArr);
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
            if ( d !== '' && blackFileArr.indexOf(d.trim()) > -1 ) {
                return;
            }
            err_name = d.trim();
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
        console.error('err name directory or file:' + err_name);
        console.error('catch err:', e);
        blackFileArr.push(err_name);
        var blackFile = {
            "black_file": blackFileArr
        }
        let jsonstr = JSON.stringify(blackFile);
        fs.writeFileSync(`${__dirname}/../config/BlackFile.json`, jsonstr, function(err) {
            if (err) {
                console.error(err);
            } else {
                console.log('写入黑名单成功：'+err_name);
            }
        });
    }
}

list_dic();
