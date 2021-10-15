<template>
  <div id="app2">
  <el-breadcrumb separator-class="el-icon-arrow-right">
  <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
  <el-breadcrumb-item>权限管理</el-breadcrumb-item>
  <el-breadcrumb-item>权限列表</el-breadcrumb-item>
</el-breadcrumb>
<el-card class="box-card">
  <el-table :data="rightlist"
 border stripe>
  <el-table-column type="index"></el-table-column>
  <el-table-column label="权限名称" prop="rightname"></el-table-column>
  <el-table-column label="路径" prop="ways"></el-table-column>
  <el-table-column label="权限等级" prop="level">
    <template slot-scope="scope">
     <el-tag v-if="scope.row.level===1">一级</el-tag>
     <el-tag type="success" v-else-if="scope.row.level===2">二级</el-tag>
     <el-tag type="warning" v-else>三级</el-tag>
    </template>
    </el-table-column></el-table>
</el-card>
</div>
</template>

<script>
// import Vue from 'vue'
export default {
  data () {
    return {
      rightlist: [
        {
          id: 1,
          rightname: '商品管理',
          ways: 'goods',
          level: 1
        },
        {
          id: 2,
          rightname: '货物管理',
          ways: 'goo',
          level: 2
        },
        {
          id: 3,
          rightname: '任务管理',
          ways: 'go',
          level: 3
        },
        {
          id: 4,
          rightname: '人物管理',
          ways: 'g',
          level: 2
        },
        {
          id: 5,
          rightname: '商品管理',
          ways: 'goodsss',
          level: 1
        }
      ]
    }
  },
  created() {
    this.getrightlist()
  },
  methods: {
    // 获取权限列表
    // eslint-disable-next-line vue/no-dupe-keys
  //   async getrightlist() {
  //     const {data: res} = await this.$http.get('right/list')
  //     if (res.meta.status !== 200) {
  //       return this.$message.error('huoqushibai')
  //     }
  //     this.rightlist=res.data
  // }
  }
}
</script>
<style>
</style>
