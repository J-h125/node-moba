<template>
<div>
  <h1>分类列表</h1>
        <el-table :data="tableData">
          <el-table-column prop="_id" label="ID" width="220" ></el-table-column>
          <el-table-column prop="name" label="物品名称" ></el-table-column>
          <el-table-column prop="icon" label="图标" >
            <template slot-scope="scope" >
              <img :src="scope.row.icon" alt="" style="height: 3rem">
            </template>
          </el-table-column>
          <el-table-column fixed="right" label="操作" width="180">
            <template slot-scope="scope">
              <el-button type="text" size="small" @click="$router.push(`/items/edit/${scope.row._id}`)">编辑</el-button>
              <el-button type="text" size="small" @click="remove(scope.row)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
</div>
</template>

<script >
export default {
name: "Item List",
  data(){
  return {
    tableData:[]
  }
  },
  methods:{
  async fetch(){
    const res =await this.$http.get('rest/items')
    this.tableData = res.data

  },
    async remove(row){
      this.$confirm(`是否确定删除分类 "${row.name}"`, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async () => {
        await this.$http.delete(`rest/items/${row._id}`)
        this.$message({
          type: 'success',
          message: '删除成功!'
        });
        this.fetch()   //删除后 重新获取数据
      }).catch(()=>{
        this.$message({
          type:'info',
          message:'已取消'
        })
      })

    }
  },
  created() {
    this.fetch()
  }
}
</script>

<style lang="scss" scoped>

</style>