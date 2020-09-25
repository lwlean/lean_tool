#!node
const websearch = require('../util/websearch');

(() => {
    let arg1 = process.argv[1];
    console.log('arg1:', arg1);
    let question = process.argv[2];
    websearch('weibo', question);
})();
