

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
    router.get('/categories/:id',async (req,res)=>{
        const model = await req.Model.findById(req.params.id)
        res.send(model)                       //获取要编辑的名称
    })

    app.use('/admin/api/rest/:resource',async (req,res,next)=>{
        const modelName = require('inflection').classify(req.params.resource)
        req.Model = require(`../../model/${modelName}`)
       next()
    },router)
}