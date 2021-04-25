<template>
  <div class="about">
   <h1>{{id ? '编辑' : '新建'}}文章</h1>
    <el-form label-width="100px" @submit.native.prevent="save">
      <el-form-item label="所属分类">
        <el-select v-model="model.categories" multiple placeholder="请选择">
          <el-option v-for="item in categories" :key="item._id" :label="item.name" :value="item.title" ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="标题">
        <el-input v-model="model.title"></el-input>
      </el-form-item>
      <el-form-item label="详情">
        <vue-editor useCustomImageHandler @image-added="handleImageAdded" v-model="model.body"></vue-editor>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" native-type="submit">保存</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script >
import { VueEditor } from "vue2-editor";
export default {
name: "ArticleEdit",
  components: {
    VueEditor
  },
  props:{
    id:{}
  },
  data(){
  return{
    model:{
      name:''
    },
    categories:[]
   }
  },
  methods:{
   async  handleImageAdded(file, Editor, cursorLocation, resetUploader) {
      // An example of using FormData
      // NOTE: Your key could be different such as:
      // formData.append('file', file)

      const formData = new FormData();
      formData.append("file", file);

     const res = await this.$http.post('upload', formData);
     Editor.insertEmbed(cursorLocation, "image", res.data.url);
     resetUploader();

    },
  async save(){

    // eslint-disable-next-line no-unused-vars
    let res
    if(this.id){
       res = await this.$http.put(`rest/articles/${this.id}`,this.model)       //有数据
    }else{
       res = await this.$http.post('rest/articles',this.model)                 //没有数据  新建
    }
    this.$router.push('/articles/list')
    this.$message({
      type:'success',
      message:'保存成功'
    })
  },
    async fetch(){
    const res =await this.$http.get(`rest/articles/${this.id}`)
      console.log(res)
      this.model = res.data
    },
    async fetchCategories(){
     const res = await this.$http.get('rest/articles')

      this.categories = res.data
    }
  },
  created() {
    this.fetchCategories()
     this.id && this.fetch()                                //编辑是获取原来内容
  }
}
</script>

<style lang="scss" scoped>

</style>