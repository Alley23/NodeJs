const http = require('http');
/**
 * 创建server
 * 
 * req(请求)   reaquest   输入
 * res(响应)   response   输出
 */ 
var server = http.createServer((req, res) => {
    switch (req.url) {
        case "/index":
            res.write("index")
            break;
        case "/new":
            res.write("new")
            break;
        default:
            res.write("404 no-url")
            break;
    }
    res.end(); // 结束请求
});

// 监听端口
server.listen(8888);
console.log("已开启8888端口！！！");
