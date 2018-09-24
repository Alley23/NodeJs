const http = require("http");
const fs = require("fs");

let app = http.createServer((res, req) => {
    let file_path = "./www" + res.url;
    fs.readFile(file_path, (err, data) => {
        if (err) {
            req.write("404!")
        } else {
            req.write(data);
        }
        req.end();
    })
});

app.listen(8080);
console.log("port open 8080!!");
