
/**
 * 事件驱动
 */
var fs = require('fs');

const EventEmitter = require('events');

class MyEmitter extends EventEmitter { }

const myEmitter = new MyEmitter();

function getText() {
  fs.readFile('text.txt', function(err, data) {
    if (err) {
      console.log(err);
      return false;
    }
    console.log(data);
    myEmitter.emit('get-data', data);
  })
}

getText();

// 监听广播数据
myEmitter.on('get-data', function (data) {
  console.log(`监听到的数据：${data}`);
})

