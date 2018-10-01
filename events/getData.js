var fs = require('fs');

function getData(callback) {
  fs.readFile('text.txt', function (err, data) {
    if (err) {
      console.log(err);
      return false;
    }
    callback(data) 
  })
}
module.exports = getData;


