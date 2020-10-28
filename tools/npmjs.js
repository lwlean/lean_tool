#!node
const websearch = require('../util/websearch');

(() => {
    let arg1 = process.argv[1];
    console.log('arg1:', arg1);
    const param = process.argv[2];
    console.log(param);
    websearch('npmjs', param);    
})();