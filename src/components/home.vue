<template>
    <el-container class="home_container">
    <el-header>
      <div class="header_div">
        <img src="../assets/css/logos.png" alt="" class="header_logo">
        <span class="header_name">市七制度后台管理系统</span>
      </div>
      <!-- <el-button type="info" @click="changesecret" class="change_secret">修改密码</el-button> -->
      <el-button type="info" @click="layout">退出</el-button>
    </el-header>
    <el-container>
    <el-aside width="isCollapse?'64px':'200px'">
      <div class="toggle_button" @click="toggle_Collapse">|||</div>
      <el-menu
      :default-active="$route.id"
      background-color="#545c64"
      text-color="#fff"
      active-text-color="#ffd04b"
      :collapse=" isCollapse"
      :collapse-transition="false"
      router
      >
      <el-menu-item :index="item.path" v-for="item in menuList" :key="item.path" >
      <!-- <el-submenu :index="item.id+''" v-for="item in menuList" :key="item.id"> -->
        <template slot="title">
          <i class="el-icon-location"></i>
          <span>{{item.authname}}</span>
          <!-- <span>{{item.authneme}}</span> -->
        </template>
      </el-menu-item>
    </el-menu>

    </el-aside>
    <el-main>
      <router-view></router-view>
    </el-main>
  </el-container>
</el-container>
</template>
<script>
export default {
  data () {
    return {
      menuList: [
        { id: 1,
          path: '/users',
          authname: '制度总览'
        },
        { id: 2,
          path: '/total',
          authname: '制度分类管理'},
        { id: 3,
          path: '/name',
          authname: '制度版本变更'},
        { id: 4,
          path: '/date',
          authname: '用户管理'}
      ],
      isCollapse: false
    }
  },
  created() {
  },
  components: {
  },
  methods: {
    layout () {
      window.sessionStorage.clear()
      this.$router.push('/Login')
    },
    toggle_Collapse() {
      // eslint-disable-next-line no-undef
      this.isCollapse = !this.isCollapse
    }
    // async getmenuList() {
    //   const { data: res } = await this.$http.get('menu')
    //   if (res.meta.status !== 200) return this.$message.error('获取失败')
    //   this.menuList = res.data
    //   console.log(res)
    // }
  }
}
</script>
<style scoped>
.toggle_button{
  background-color:cyan ;
  font-size: 10px;
  line-height: 24px;
  color: aliceblue;
  text-align: center;
  letter-spacing: 0.2em;
  cursor:pointer
}
.el-header{
  background-color: cadetblue;
  display: flex;
  justify-content: space-between;
  padding-left: 0;
  align-items: center;
  color: aliceblue;
  font-size: 20px;
}
.header_logo{
  position: absolute;
  width: 50px;
  height: 50px;
  margin-left: 15px;
}
.header_div{
  display: flex;
  align-items: center;
}
.header_name{
  margin-left: 85px;
}
.el-aside{
  background-color:#545c64;
}
.home_container{
  height: 100%;
}
</style>
