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

/**----------------------记录浏览记录----------------------------- */

app.use(cookieParser());

app.get('/city', (req, res) => {
    // 获取浏览记录
    let city = req.query.city;
    let citys = req.cookies.city;
    if (citys) {
        let isAdd = true;
        citys.map((item) => {
            if (item == city) {
                isAdd = false 
            }
        })
        if (isAdd) {
            citys.push(city);      
        }
        
    } else {
        citys = [];
        citys.push(city);
    }
    // 设置cookie
    res.cookie('city', citys);
    res.send('你当前浏览的城市：'+city)
})


/**--------------------------------------------------- */

app.get('/', (req, res) => {
    
    res.send('浏览过的城市：'+req.cookies.city)
})

app.listen(8000, () => {
    console.log('端口已运行在8000端口！！！');

})