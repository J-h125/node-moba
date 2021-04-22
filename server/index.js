const express = require('express')
const app = express()

app.use(require('cors')())     //使用跨域模块
app.use(express.json())        //中间件
app.use('/uploads',express.static(__dirname+'/uploads'))   //托管静态文件

require('./plugins/db')(app)                 //数据库    传入app  导出函数
require('./routes/admin/index')(app)        //路由

app.listen(3000,()=>{
    console.log('正在监听 http://localhost:3000')
})