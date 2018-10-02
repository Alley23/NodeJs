const express = require('express');

// 实例化express
const app = new express();

/*配置ejs模板引擎*/
app.set('view engine', 'ejs');

//设置模板的路径
app.set('views', __dirname + '/views');


// use中间件设置静态资源文件
app.use(express.static('public'));

// 配置虚拟目录: 目录会为static/去public文件找image/xx.png文件
// app.use('/static', express.static('public'));

/**------------------------------------------------ */
// 中间件就是匹配路由之前和匹配路由之后做的一系列操作
// 需求：每次访问路由打印时间日期


app.use((req, res, next) => {
    console.log(new Date()); // 每次访问都会输出时间
    next(); // 继续向下执行
})

//路由中间件:匹配/add路由的请求
app.use('/add', (req, res, next) => {
    console.log('----/add路由的请求-----'); // 每次访问都会输出时间
    next(); // 继续向下执行
})

/**------------------------------------------------ */

app.get('/', (req, res) => {
    res.render('index', {msg: "hello"})
})

app.get('/add', (req, res) => {
    res.send('add page');
})

app.listen(8000, () => {
    console.log('端口已运行在8000端口！！！');

})