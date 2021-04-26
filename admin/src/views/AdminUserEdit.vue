<template>
  <div class="about">
   <h1>{{id ? '编辑' : '新建'}}管理员</h1>
    <el-form label-width="100px" @submit.native.prevent="save">
      <el-form-item label="用户名">
        <el-input v-model="model.username"></el-input>
      </el-form-item>
      <el-form-item label="密码">
        <el-input type="password" v-model="model.password"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" native-type="submit">保存</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script >
export default {
name:"AdminUserEdit",
  props:{
    id:{}
  },
  data(){
  return{
    model:{
      username:'',
      password:'',
    },
   }
  },
  methods:{
  async save(){

    // eslint-disable-next-line no-unused-vars
    let res
    if(this.id){
       res = await this.$http.put(`rest/admin_users/${this.id}`,this.model)       //有数据
    }else{
       res = await this.$http.post('rest/admin_users',this.model)                 //没有数据  新建
    }
    this.$router.push('/admin_users/list')
    this.$message({
      type:'success',
      message:'保存成功'
    })
  },
    async fetch(){
    const res =await this.$http.get(`rest/admin_users/${this.id}`)
      this.model = res.data
    },
  },
  created() {
     this.id && this.fetch()                                //编辑是获取原来内容
  }
}
</script>

<style lang="scss" scoped>

</style>