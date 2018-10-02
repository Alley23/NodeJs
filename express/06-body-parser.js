const express = require('express');

const bodyParser = require('body-parser');
// 实例化express
const app = new express();

/*配置ejs模板引擎*/
app.set('view engine', 'ejs');

//设置模板的路径
app.set('views', __dirname + '/views');


// use中间件设置静态资源文件
app.use(express.static('public'));

/**--------------------------------------------------- */

// 配置body-parser中间件
app.use(bodyParser.urlencoded({extended: false}));

app.use(bodyParser.json());


app.get('/login', (req, res) => {
    res.render('login')
})

app.post('/postForm', (req, res) => {
    console.log(req.body); // 获取POST提交的数据
    res.render('index', {msg: 'hello'});
})


/**--------------------------------------------------- */

app.get('/', (req, res) => {
    res.send('hello')
})

app.listen(8000, () => {
    console.log('端口已运行在8000端口！！！');

})