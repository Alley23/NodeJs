const fs = require('fs');
const data = require('./data.json');

module.exports = {
    // 数据持久
    store() {
        fs.writeFileSync(__dirname + '/data.json', JSON.stringify(data))
    },
    // 获取数据
    get(index) {
        return data[index]; 
    },
    // 获取全部数据
    list() {
        return data;
    },
    // 添加数据
    add(params) {
        data.push(params);
        this.store();
    },
    // 删除数据
    del(index) {
        data.splice(index, 1);
        this.store();
    },
    // 更新数据
    update(index, params) {
        data.splice(index, 1, params);
        this.store();
    }
}
