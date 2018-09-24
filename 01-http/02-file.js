const http = require("http");
const fs = require("fs");

/**
 * 读写文件
 * fs.readFile(name, callback(err, data));
 * fs.writeFile(fileName, content, callback(err))
 */

let app = http.createServer((res, req) => {
    switch (res.url) {
        case "/read":
            fs.readFile('./www/02-file.txt', (err, data) => {
                if (err) {
                    console.log("error"); 
                } else {
                    req.write(data);
                }
                req.end();
            })
            break;
        case "/write":
            fs.writeFile('./www/02-file-write.txt', "hello", (err, data) => {
                if (err) {
                    console.log("error");
                }
                req.end();
            })
            break;
        default:
            req.write("404");
            req.end();
            break;
    }
})

app.listen(8888);
console.log("端口已在8888端口开启！！！");
