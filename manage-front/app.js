const express = require('express');

const session = require('express-session');  // 保存用户信息

const md5 = require('md5-node');

const app = express();

const MongoClient = require('mongodb').MongoClient;

const dbUrl = 'mongodb://localhost:27017';

const dbName = 'product';

const bodyParser = require('body-parser');



/**
 * 登录状态判断
 * 
 * 判断逻辑：
 * 首先判断是否为登录或者登录提交路由，不是则判断是否存在session
 */
app.use((req, res, next) => {
    if (req.url == '/login' || req.url == '/logins') {
        next();
    } else {       
        if (session.userInfo && session.userInfo.username != '') {
            next();
        } else {
            res.redirect('/login');
        }
    }
})

app.use(session(
    {
        secret: 'keyboard cat',
        name: 'session_id',
        resave: false,
        saveUninitialized: true,
        cookie: {
            maxAge: 60000, // 过期时间
        },
        rolling: true,
    }
))

app.use(bodyParser.urlencoded({ extended: false }))

app.use(bodyParser.json())

// 设置使用ejs模板引擎
app.set('view engine', 'ejs');
// 配置静态资源文件
app.use(express.static('public'));

app.get('/', (req, res) => {
    res.send('index');
})

// 登陆页面渲染
app.get('/login', (req, res) => {
    res.render('login');
})

// 获取登录提交数据
app.post('/logins', (req, res) => {
    const bodyData = req.body;
    bodyData.password = md5(bodyData.password); // 对用户输入密码加密
    console.log(req.body) // 获取提交数据
    // 1. 获取数据
    // 2. 连接数据库查询数据库
    MongoClient.connect(dbUrl, { useNewUrlParser: true }, (err, client) => {
        console.log("Connected successfully to server");

        const db = client.db(dbName);
        const collection = db.collection('user');
        findDocuments(collection, bodyData, (data) => {
            // 保存用户信息
            session.userInfo = data[0];
            // ejs设置全局数据
            app.locals.userInfo = data[0];
            if (data.length > 0) {
                res.redirect('/list')
            }
        })
        client.close();
    });
})

// 退出登录
app.get('/loginOut', (req, res) => {
    req.session.destroy((err) => {
        if (err) {
            console.log(err);
        } else {
            res.redirect('/login')
        }
    })
})


// 列表
app.get('/list', (req, res) => {
    MongoClient.connect(dbUrl, {}, (err, client) => {
        console.log("Connected successfully to server");

        const db = client.db(dbName);
        const collection = db.collection('list');
        findDocuments(collection, {}, (data) => {
            console.log(data)
            res.render('list', {list: data});
        })
        client.close();
        
    });
    // res.render('list');
})

// 新增
app.get('/add', (req, res) => {
    res.send('add');
})

// 编辑
app.get('/edit', (req, res) => {
    res.send('edit');
})

// 删除
app.get('/delete', (req, res) => {
    res.send('delete');
})


app.listen(8000, () => {
    console.log('已运行在8000端口');
});

// supervisor

// 查询函数
const findDocuments = function (collection, fileData, callback) {
    collection.find(fileData).toArray(function (err, docs) {
        callback(docs);
    });
}