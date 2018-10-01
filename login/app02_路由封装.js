const http = require('http');
const url = require('url');

const routers = require('./model/router');


let app = http.createServer((req, res) => {
  res.writeHead(200, {"Content-Type":"text/html; charset='utf-8'"});

  let pathname = url.parse(req.url).pathname.replace('/', '');

  if (pathname !== 'favicon.ico') {
    try{
      routers[pathname](req, res);
    } catch (err) {
      routers['home'](req, res);
    }
  }
  
})

app.listen(8000, () => {
  console.log('8000端口已启用。。。')
});