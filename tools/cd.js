#!node
const { exec } = require('child_process');
const args = require('yargs').argv;

function cd() {
    let arg = process.argv[2];
    console.log(arg);
    exec(`cd ${arg}`, { cwd : './' }, (err, stdout, stderr) => {
        if (err) {
            console.log(err);
            return;
        }
        exec(`ll`, (err, stdout, stderr) => {
            if (err) {
                console.log(err);
                return;
            }
            console.log(stdout)
        });
    });
}

cd();