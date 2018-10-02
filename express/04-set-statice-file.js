const express = require('express');

// 实例化express
const app = new express();

/*配置ejs模板引擎*/
app.set('view engine', 'ejs');

//设置模板的路径
app.set('views', __dirname + '/views');


/**------------------------------------------------ */


// use中间件设置静态资源文件
app.use(express.static('public'));

// 配置虚拟目录: 目录会为static/去public文件找image/xx.png文件
// app.use('/static', express.static('public'));


/**------------------------------------------------ */

app.get('/', (req, res) => {
    res.render('index', {msg: "hello"})
})

app.listen(8000, () => {
    console.log('端口已运行在8000端口！！！');

})