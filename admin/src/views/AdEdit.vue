<template>
  <div class="about">
   <h1>{{id ? '编辑' : '新建'}}广告位</h1>
    <el-form label-width="100px" @submit.native.prevent="save">
      <el-form-item label="广告位名称">
        <el-input v-model="model.name"></el-input>
      </el-form-item>
      <el-form-item label="添加广告位">
        <el-button @click="model.items.push({})" size="small"><i class="el-icon-plus"></i> 添加广告位</el-button>
        <el-row type="flex" style="flex-wrap: wrap">
          <el-col :md="12 " v-for="(item,index) in model.items" :key="index">
            <el-form-item label="链接地址">
              <el-input v-model="item.url"></el-input>
            </el-form-item>
            <el-form-item label="图片" style="margin-top: 1rem">
              <el-upload
                  class="avatar-uploader"
                  :action="$http.defaults.baseURL+'/upload'"
                  :show-file-list="false"
                  :on-success="res=>item.image = res.url">
                <img v-if="item.image" :src="item.image" class="avatar">
                <i v-else class="el-icon-plus avatar-uploader-icon"></i>
              </el-upload>
            </el-form-item>
            <el-form-item>
              <el-button size="small" type="danger" @click="model.items.splice(index,1)">删除</el-button>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" native-type="submit">保存</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script >
export default {
name: "AdEdit",
  props:{
    id:{}
  },
  data(){
  return{
    model:{
      items:[]
    },
    parents:[]
   }
  },
  methods:{
  async save(){

    // eslint-disable-next-line no-unused-vars
    let res
    if(this.id){
       res = await this.$http.put(`rest/ads/${this.id}`,this.model)       //有数据
    }else{
       res = await this.$http.post('rest/ads',this.model)                 //没有数据  新建
    }
    this.$router.push('/ads/list')
    this.$message({
      type:'success',
      message:'保存成功'
    })
  },
    async fetch(){
    const res =await this.$http.get(`rest/ads/${this.id}`)
      //this.model = res.data
      this.model = Object.assign({},this.model,res.data)
    },

  },
  created() {
     this.id && this.fetch()                                //编辑是获取原来内容
  }
}
</script>

<style lang="scss" scoped>

</style>