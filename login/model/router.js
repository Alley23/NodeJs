const fs = require('fs');
const ejs = require('ejs');
const url = require('url');

const routers = {
  home: (req, res) => {
    res.end('home');
  },
  login: (req, res) => {
    ejs.renderFile('views/login.ejs', {}, (err, data) => {
      res.end(data)
    })
  },
  register: (req, res) => {
    res.end('register');
  },
  getData: (req, res) => {
    let queryData = url.parse(req.url, true).query;
    ejs.renderFile('views/showGetData.ejs', { result: queryData }, (err, data) => {
      res.end(data)
    })
  },
  postData: (req, res) => {
    let postStr = '';
    req.on('data', (chuck) => {
      postStr += chuck;
    });
    req.on('end', (err, data) => {
      fs.appendFile('login.txt', postStr + '\n', (err, data) => {
        if (err) {
          console.log(err);
        }
        console.log('‘写入成功’');

      })
      ejs.renderFile('views/showPostData.ejs', { data: postStr }, (err, data) => {
        res.end(data)
      })
    })
  }
}


module.exports = routers;