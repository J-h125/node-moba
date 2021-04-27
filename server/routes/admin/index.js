

module.exports = app =>{
    const express = require('express')
    const router = express.Router({
        mergeParams:true                   //合并参数
    })
    //const Category = require('../../model/category')

    router.post('/',async (req,res)=>{

        const model = await req.Model.create(req.body)
        res.send(model)                       //新建接口
    })
    router.put('/:id',async (req,res)=>{
        const model = await req.Model.findByIdAndUpdate(req.params.id,req.body)
        res.send(model)                       //编辑更新接口
    })
    router.delete('/:id',async (req,res)=>{
        await req.Model.findByIdAndDelete(req.params.id,req.body)
        res.send({
            success:true
        })                                  //删除
    })
    router.get('/',async (req,res)=>{
        const queryOptions = {}
        if(req.Model.modelName === 'Category'){
            queryOptions.populate = 'parent'
        }
        const model = await req.Model.find().setOptions(queryOptions).limit(10)
        res.send(model)                       //获取列表接口
    })
    router.get('/:id',async (req,res)=>{
        const model = await req.Model.findById(req.params.id)
        res.send(model)                       //获取要编辑的内容
    })

    app.use('/admin/api/rest/:resource',async (req,res,next)=>{                      //复用
        const modelName = require('inflection').classify(req.params.resource)
        req.Model = require(`../../model/${modelName}`)
       next()
    },router)

    const multer = require('multer')
    const upload = multer({dest:__dirname+'/../../uploads'})

    app.post('/admin/api/upload',upload.single('file'),async (req,res)=>{
        const file = req.file
        file.url = `http://localhost:3000/uploads/${file.filename}`
        res.send(file)
    })
    app.post('/admin/api/login',async (req,res)=>{
      const {username,password} = req.body
        //1.根据用户名找用户
        const AdminUser = require('../../model/AdminUser')
        const user = await AdminUser.findOne({username:username}).select('+password')
        if(!user){
            res.status(422).send({
                message:'用户不存在'
            })
        }
        //2.校验密码
       const isValid =  require('bcrypt').compareSync(password,user.password)
        if(!isValid){
            res.status(422).send({
                message:'密码错误'
            })
        }
        //3.返回token
        const jwt = require('jsonwebtoken')
        const token = jwt.sign({id:user._id,},
            app.get('secret')          //获取设置的secret   一个参数表示获取配置   多个表示获取路由
        )
        res.send({token})
    })
}