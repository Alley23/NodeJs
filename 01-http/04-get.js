/**
 * 数据请求
 * 方式： POST， GET、、、
 * 
 * 
 * url 、 querystring模块
 */
const http = require("http");
const urlLib = require("url");

let app = http.createServer((res, req) => {
    let obj = urlLib.parse(res.url, true);
    // 请求url
    let url = obj.pathname;
    // 查询参数
    let data = obj.query;
});

app.listen(8080);
console.log("open 8080!!!!");

