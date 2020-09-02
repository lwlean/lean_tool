#!node
const websearch = require('../util/websearch');

(() => {
    let question = process.argv[2];
    websearch('zhihu', question);
})();
