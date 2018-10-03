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
 * cookie 保存在浏览器本地，过期时间关闭浏览器还是存在的
 * 
 * dimain: '.aa.com'            // www.aa.com  aaa.aa.com
 * expires: new Date() + 60000  // 设置cookie过期时间
 * maxAge: 60000                // 设置cookie过期时间
 * cecure: true | fasle         // 为true时在HTTP中是不能访问的，在HTTPS中是可以访问的
 * path: '/aa'                  // 表示cookie在哪个路径下是有效的
 * httpOnly: true               // 微软对cookie做的扩展，如果设置了此属性将取法读取到cookie信息，防止XSS攻击
 * signed:true                  // 是否对cookie签名，需要用res.signedCookies访问
 */

app.use(cookieParser());

app.get('/set', (req, res) => {
    // 设置cookie
    res.cookie('name', 'likai', { maxAge: 10000 });
    res.send('设置cookie成功')
})

app.get('/get', (req, res) => {
    
    console.log(req.cookies);
    const getCookies = req.cookies;
    res.send(`这是cookie的值：${getCookies.name}`);
})


/**--------------------------------------------------- */

app.get('/', (req, res) => {
    res.send('hello')
})

app.listen(8000, () => {
    console.log('端口已运行在8000端口！！！');

})