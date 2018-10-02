const express = require('express');

// 实例化express
const app = new express();

/**------------------------------------------------ */

/*配置ejs模板引擎*/
app.set('view engine', 'ejs');

//设置模板的路径
app.set('views', __dirname + '/views');


app.get('/', (req, res) => {
    res.render('index', {msg: "hello"})
})


/**------------------------------------------------ */



app.listen(8000, () => {
    console.log('端口已运行在8000端口！！！');

})