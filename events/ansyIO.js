var fs = require('fs');
var getData = require('./getData');

// 非阻塞io
getData(function (data) {
  console.log('====================================');
  console.log(data.toString());
  console.log('====================================');
})


