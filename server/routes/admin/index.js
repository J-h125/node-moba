
module.exports = app =>{
    const express = require('express')
    const jwt = require('jsonwebtoken')
    const AdminUser = require('../../model/AdminUser')
    const asset = require('http-assert')
    const router = express.Router({
        mergeParams:true                   //合并参数
    })
    //登录验证中间件
    const authMiddleware =  async (req,res,next)=>{
        let token
        if(req.headers.authorization){                        //非空验证    不加报jwt malformed错误
            token = String(req.headers.authorization).split(' ').pop()
        }
        asset(token,401,'请先登录')
        const {id} = jwt.verify(token,app.get('secret'))
        asset(id,401,'请先登录')
        req.user = await AdminUser.findById(id)
        asset(req.user,401,'请先登录')
        await next()                //router中间件
    }
    //资源获取 中间件
    const resouceMiddleware = async (req,res,next)=>{                      //复用  中间件
        const modelName = require('inflection').classify(req.params.resource)
        req.Model = require(`../../model/${modelName}`)
        next()
    }
    app.use('/admin/api/rest/:resource',authMiddleware,resouceMiddleware, router)
    //const Category = require('../../model/category')
    //新建接口
    router.post('/',async (req,res)=>{
        const model = await req.Model.create(req.body)
        res.send(model)
    })
    //编辑更新接口
    router.put('/:id',
        async (req,res)=>{
        const model = await req.Model.findByIdAndUpdate(req.params.id,req.body)
        res.send(model)
    })
    //删除接口
    router.delete('/:id',
        async (req,res)=>{
        await req.Model.findByIdAndDelete(req.params.id,req.body)
        res.send({
            success:true
        })
    })
    //获取列表接口
    router.get('/',
    async (req,res)=>{
        const queryOptions = {}
        if(req.Model.modelName === 'Category'){
            queryOptions.populate = 'parent'
        }
        const model = await req.Model.find().setOptions(queryOptions).limit(10)
        res.send(model)
    })
    //获取要编辑的内容
    router.get('/:id',
        async (req,res)=>{
        const model = await req.Model.findById(req.params.id)
        res.send(model)
    })



    const multer = require('multer')
    const upload = multer({dest:__dirname+'/../../uploads'})

    app.post('/admin/api/upload',authMiddleware,upload.single('file'),async (req,res)=>{   //上传时登录校验
        const file = req.file
        file.url = `http://localhost:3000/uploads/${file.filename}`
        res.send(file)
    })
    app.post('/admin/api/login',async (req,res)=>{
      const {username,password} = req.body
        //1.根据用户名找用户

        const user = await AdminUser.findOne({username:username}).select('+password')
        asset(user,422,'用户不存在')
        // if(!user){
        //     res.status(422).send({
        //         message:'用户不存在'
        //     })
        // }
        //2.校验密码
       const isValid =  require('bcrypt').compareSync(password,user.password)
        asset(isValid,422,'密码错误')
        // if(!isValid){
        //     res.status(422).send({
        //         message:'密码错误'
        //     })
        // }
        //3.返回token

        const token = jwt.sign({id:user._id,},
            app.get('secret')          //获取设置的secret   一个参数表示获取配置   多个表示获取路由
        )
        res.send({token})
    })
    //错误处理函数
    app.use(async (err,req,res,next)=>{
        res.status(err.statusCode || 500).send({
            message:err.message
        })
    })
}