const express = require('express');

const bodyParser = require('body-parser');

const session = require('express-session');

// 实例化express
const app = new express();

/*配置ejs模板引擎*/
app.set('view engine', 'ejs');

//设置模板的路径
app.set('views', __dirname + '/views');


// use中间件设置静态资源文件
app.use(express.static('public'));

/**--------------------------------------------------- */

/**
 * 只要浏览器关闭，session就销毁了
 * 
 * 参数配置：
 * secret：加密字符串
 * name: 生成session名称。默认connect.sid
 * resave: 强制保存session，即使没有变化
 * saveUninitialized: 强制将未初始化的session保存
 * cookie
 * rolling //每次请求强制设置session，默认是false
 */

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


app.get('/', (req, res) => {
    let name = req.session.name;
    if (name) {
        res.send(`欢迎${name}回来`);
    } else {
        res.send('未登录');
    }
})

app.get('/login', (req, res) => {
    req.session.name = 'likai';
    res.send('欢迎登陆')
})
/**--------------------------------------------------- */



app.listen(8000, () => {
    console.log('端口已运行在8000端口！！！');

})