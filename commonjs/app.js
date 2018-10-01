var http = require('http');

var config01 = require('./config01.js');
console.log(config01.str, '-------');


var config02 = require('./config02.js');
console.log(config02.add(1, 2), '-------');


// test文件在目录下找不到会在node_modules文件下查找test.js文件
var test = require('test.js');
console.log(test, '-------');

// 会从package.js文件找main入口文件
var nav = require('nav');
console.log(nav.nav)


var app = http.createServer(function (req, res) {
  res.writeHead(200, {"Content-type":"text/html;charset=utf-8"});

  res.write("hello!!");

  res.end()
})

app.listen('8000', () => {
  console.log("已运行在8000端口");
})

/**
 * exports module.expoerts 暴露接口
 * 
 * require 引用
 */