const express = require('express');

const bodyParser = require('body-parser');

const cookieParser = require('cookie-parser')

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
  * 1. 保存的时候加密
  * 2. 利用cookie-paeser里面提供的参数signed: true表示加密
  * 
  */

// ① 加密内容
app.use(cookieParser('jnfsngdnNBJFkndnv43m5njnsv92fkwnfcsv、。，。，；是的冯绍峰第三方的'));

app.get('/set', (req, res) => {
    // 设置cookie
    res.cookie('name', 'likai', { maxAge: 10000, signed: true }); // ② 设置加密
    res.send('设置cookie成功')
})

app.get('/get', (req, res) => {
    
    console.log(req.cookies);
    const getCookies = cookieParser.signedCookie; // ③ 取值
    res.send(`这是cookie的值：${getCookies.name}`);
})


/**--------------------------------------------------- */

app.get('/', (req, res) => {
    res.send('hello')
})

app.listen(8000, () => {
    console.log('端口已运行在8000端口！！！');

})