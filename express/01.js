const express = require('express');

// 实例化express
const app = new express();


app.get('/', (req, res) => {
    res.send('hello express!')
})

app.listen(8000, () => {
    console.log('端口已运行在8000端口！！！');
    
})