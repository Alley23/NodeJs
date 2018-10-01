const http = require('http');
const fs = require('fs');
const url = require('url');
const ejs = require('ejs');


let app = http.createServer((req, res) => {
  res.writeHead(200, {"Content-Type":"text/html; charset='utf-8'"});

  let pathname = url.parse(req.url).pathname;

  if (pathname === '/index') {
    ejs.renderFile('views/index.ejs', {}, (err, data) => {
      res.end(data)
    })
  } else if (pathname === '/login') {
    ejs.renderFile('views/login.ejs', {}, (err, data) => {
      res.end(data)
    })
  } else if (pathname === '/getData') { // get数据获取
    let queryData = url.parse(req.url, true).query;
    ejs.renderFile('views/showGetData.ejs', {result: queryData}, (err, data) => {
      res.end(data)
    })
  } else if (pathname === '/postData') { // post数据获取
    let postStr = '';
    req.on('data', (chuck) => {
      postStr += chuck;
    });
    req.on('end', (err, data) => {
      fs.appendFile('login.txt', postStr+'\n', (err, data) => {
        if (err) {
          console.log(err);
        }
        console.log('‘写入成功’');

      })
      ejs.renderFile('views/showPostData.ejs', { data: postStr}, (err, data) => {
        res.end(data)
      })
    })
  } else {
    res.end('404')
  }
})

app.listen(8000, () => {
  console.log('8000端口已启用。。。')
});