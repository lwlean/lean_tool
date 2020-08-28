#!node
const fs = require('fs');
const child_process = require('child_process');
const { stdout } = require('process');

const device_drive_index = ['c:', 'd:', 'e:', 'f:', 'g:', 'h:', 'i:', 'C:', 'D:', 'E:', 'F:', 'G:', 'H:', 'I:']

const cd = () => {
    let param = process.argv[2];
    let secCommonLine = '';
     
    if (param.indexOf(';') >= 0) {
        let cmds = param.split('\;');
        param = cmds[0];
        if (cmds.length > 1) {
            secCommonLine = cmds[1];
        }
    }

    if (param.indexOf('\:') >= 0){
        let driveIndex = param.split('\:')[0] + ':'
        console.log('driveIndex:'+driveIndex);
        if (device_drive_index.indexOf(driveIndex) >= 0) {
            // param is full path
            process.chdir(param);
            if (param === device_drive_index) param += "\\";
            ExecSecCommond(secCommonLine);
            return;
        }
    }
    

    let current_path = process.cwd() + "\\" + param;
    process.chdir(current_path); // 跳转到当前文件
    ExecSecCommond(secCommonLine);
    console.log('cd exec success!');
}

const ExecSecCommond = (secCommonLine) => {
    if (secCommonLine !== '' && secCommonLine !== undefined) {
        child_process.exec(secCommonLine, (err, stdout, stderr) => {
            if (err) {
                console.log(err);
                return;
            }
            console.log(stdout);
        });
        
    }
}

cd();