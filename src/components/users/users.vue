<template>
  <div>
  <el-breadcrumb separator-class="el-icon-arrow-right">
  <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
  <el-breadcrumb-item>用户管理</el-breadcrumb-item>
  <el-breadcrumb-item>用户列表</el-breadcrumb-item>
</el-breadcrumb>
<el-card class="box-card">
<el-row :gutter="20">
  <el-col :span="8">
    <el-input placeholder="请输入内容">
    <el-button
    slot="append"
    icon="el-icon-search"
    ></el-button>
  </el-input>
  </el-col>
  <el-col :span="4">
    <el-button type="primary" @click="aDDdialogVisible=true">添加用户</el-button>
  </el-col>
</el-row>
<!-- 不连接后端的分页 -->
<el-table :data="userlist.slice((currentPage-1)*pageSize,currentPage*pageSize)"
 border stripe>
  <el-table-column type="index"></el-table-column>
  <el-table-column label="姓名" prop="username"></el-table-column>
  <el-table-column label="邮箱" prop="mail"></el-table-column>
  <el-table-column label="电话" prop="phone"></el-table-column>
  <el-table-column label="角色" prop="model"></el-table-column>
  <el-table-column label="状态">
  <template slot-scope="scope">
  <!-- {{scope.row}} @change="userstatechange(scope.row)"-->
  <el-switch
  v-model="scope.row.state_mg"
 >
  </el-switch>
  </template>
  </el-table-column>
  <el-table-column label="操作" width="210px">
    <template slot-scope="scope">
    <el-button type="primary" icon="el-icon-edit" size="mini" @click="showEditDialog(scope.row.id)"></el-button>
    <el-button type="danger" icon="el-icon-delete" size="mini" @click="removeUsers(scope.row.id)"></el-button>
    <el-tooltip  effect="dark" content="菜单" placement="top" :enterable='false'>
      <el-button type="warning" icon="el-icon-setting" size="mini"></el-button>
    </el-tooltip>
    </template>
    <el-tooltip class="item" effect="dark" content="Top Center 提示文字" placement="top">
      <el-button type="warning" icon="el-icon-setting" size="mini"></el-button>
    </el-tooltip>
  </el-table-column>
</el-table>
<el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="queryinfo.pagenum"
      :page-sizes="[1, 3, 8, 10]"
      :page-size="queryinfo.pagesize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total">
    </el-pagination>
</el-card>
<!-- 添加用户 -->
<el-dialog
  title="添加信息"
  :visible.sync="aDDdialogVisible"
  width="50%"
  @close="adddialogclosed"
  >
  <el-form :model="addform" :rules="affformrules" ref="addformref" label-width="70px" >
  <el-form-item label="用户名" prop="username">
    <el-input v-model="addform.username"></el-input>
  </el-form-item>
 <!-- <el-form-item label="密码" prop="addpassword">
    <el-input v-model="addform.addpassword"></el-input>
  </el-form-item> -->
  <el-form-item label="邮箱" prop="mail">
    <el-input v-model="addform.mail"></el-input>
  </el-form-item>
  <el-form-item label="手机号" prop="phone">
    <el-input v-model="addform.phone"></el-input>
  </el-form-item>
  </el-form>
  <span slot="footer" class="dialog-footer">
    <el-button @click="aDDdialogVisible = false">取 消</el-button>
    <el-button type="submit" @click="adduser(addform)">确 定</el-button>
  </span>
</el-dialog>
<!-- 修改用户 -->
<el-dialog
  title="修改用户"
  :visible.sync="editdialogVisible"
  width="50%"
 >
  <el-form :model="editform" :rules="editformrules" ref="editformref" label-width="70px" >
  <el-form-item label="用户名"  disabled>
  <el-input v-model="editform.username"></el-input>
  </el-form-item>
  <el-form-item label="邮箱" prop="mail">
  <el-input v-model="editform.mail"></el-input>
  </el-form-item>
  <el-form-item label="手机号" prop="phone">
  <el-input v-model="editform.phone"></el-input>
  </el-form-item>
  </el-form>
  <span slot="footer" class="dialog-footer">
    <el-button @click="editdialogVisible = false">取 消</el-button>
    <el-button type="primary" @click="edituserinfo">确 定</el-button>
  </span>
</el-dialog>
  </div>
</template>

<script>
import Vue from 'vue'
export default {
  data () {
    // 验证邮箱和手机号即自定义规则
    var checkEmail = (rule, value, cb) => {
      // 验证邮箱的正则表达式
      const regEmail = /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(\.[a-zA-Z0-9_-])+/
      if (regEmail.test(value)) {
        // 合法的邮箱
        return cb()
      }
      cb(new Error('请输入合法的邮箱'))
    }
    var checkMobile = (rule, value, cb) => {
      // 验证手机号的正则表达式
      const regMobile = /^(0|86|17951)?(13[0-9]|15[012356789]|17[678]|18[0-9]|14[57])[0-9]{8}$/
      if (regMobile.test(value)) {
        return cb()
      }
      cb(new Error('请输入合法的手机号'))
    }
    return {
      queryinfo: {
        query: '',
        // 当前的页数
        pagenum: 1,
        // 当前每页显示多少条数据
        pagesize: 2
      },
      userlist: [
        {
          id: 100,
          username: 'peter',
          mail: '291153919@qq.com',
          phone: '123213',
          model: 'student',
          state_mg: true
        },
        {
          id: 200,
          username: 'durant',
          mail: '2911@qq.com',
          phone: '1233',
          model: 'student',
          state_mg: false
        },
        {
          id: 300,
          username: 'westbrook',
          mail: '2911@qq.com',
          phone: '1233',
          model: 'student',
          state_mg: false
        },
        {
          id: 400,
          username: 'kobe',
          mail: '2911@qq.com',
          phone: '1233',
          model: 'student',
          state_mg: false
        }
      ],
      editdialogVisible: false,
      aDDdialogVisible: false,
      currentPage: 1,
      total: 4,
      pageSize: 2,
      // 验证表单添加
      addform: {

        username: '',
        // addpassword: '',
        mail: '',
        phone: ''

      },
      editform: {
        username: '',
        email: '',
        phone: ''
      },
      editformrules: {
        mail: [
          {required: true, message: '请输入邮箱', trigger: 'blur'},
          {validator: checkEmail,
            message: '请输入正确的邮箱地址',
            trigger: 'blur'
          }
        ],
        phone: [
          {required: true, message: '请输入手机号', trigger: 'blur'},
          {
            validator: checkMobile,
            message: '请输入正确的手机号码',
            trigger: 'blur'
          }
        ]
      },
      affformrules: {
        username: [
          {required: true, message: '请输入用户名', trigger: 'blur'},
          {min: 3, max: 10, message: '长度在3到10之间', trigger: 'blur'}
        ],
        // addpassword: [
        //   {required: true, message: '请输入密码', trigger: 'blur'},
        //   {min: 3, max: 10, message: '长度在3到10之间', trigger: 'blur'}
        // ],
        mail: [
          {required: true, message: '请输入邮箱', trigger: 'blur'},
          {validator: checkEmail,
            message: '请输入正确的邮箱地址',
            trigger: 'blur'
          }
        ],
        phone: [
          {required: true, message: '请输入手机号', trigger: 'blur'},
          {
            validator: checkMobile,
            message: '请输入正确的手机号码',
            trigger: 'blur'
          }
        ]
      }
    }
  },
  created () {
    // this.getuserlist()
  },
  methods: {
    // async getuserlist() {
    //   // eslint-disable-next-line standard/object-curly-even-spacing
    //   const { data: res} = await this.$http.get('users', {params: this.queryinfo})
    //   this.userlist = res.data.userlist
    //   this.total = res.data.total
    //   console.log(res)
    // }
    // 监听pagesize改变的事件
    handleSizeChange(newSize) {
      console.log(newSize)
      // this.queryinfo.pagesize = newSize
      // this.getuserlist()
      this.currentPage = 1
      this.pageSize = newSize
    },
    // 监听pagenum改变的事件
    handleCurrentChange(newpage) {
      console.log(newpage)
      // this.queryinfo.pagenum = newpage
      // this.getuserlist()
      this.currentPage = newpage
    },
    // 更新用户状态
    // async userstatechange(userinfo) {
    //   console.log(userinfo)
    //   // eslint-disable-next-line no-unused-vars
    //   const {data: res} = await this.$http.put('users/${userinfo.id}/state/${userinfo.state_mg}')
    // }
    // 监听关闭事件
    adddialogclosed() {
      this.$refs.addformref.resetFields()
    },
    // 点击添加新用户
    adduser(addform) {
      // console.log(this.addform)
      this.$refs.addformref.validate(valid => {
        // eslint-disable-next-line no-useless-return
        console.log(valid)
        console.log(addform)
        if (!valid) return
        // 发起添加用户的网络请求
        // const {data: res} = this.$http.post('users', this.addform)
        // if (res.meta.status !== 201) {
        //   this.$message.error('')
        // }
        // this.$message.success('')
        // this.userlist.push(this.addform)
        var addLen = this.userlist.length
        Vue.set(this.userlist, addLen, {userlist: addform, id: 0})
        //  Vue.set(this.userlist, this.userlist.length, {username: addform.username, mail: addform.mail, phone: addform.phone})
        this.aDDdialogVisible = false
        // eslint-disable-next-line no-unused-expressions
      })
    },
    // bainjiyonghuxinxi
    showEditDialog(id) {
      // 动态修改用户信息
      // const {data: res} = await this.$http.get('user/' + id)
      // if (res.meta.status !== 200) {
      //   return this.$message.error('查询用户信息失败')
      // }
      // this.editform = res.data
      // eslint-disable-next-line no-undef
      this.editdialogVisible = true
      this.editform = this.userlist.data[0]
      // eslint-disable-next-line no-undef
      console.log(editform)
    },
    edituserinfo() {
      // this.$refs.addformref.validate(valid => {
      //   console.log(valid)
      //   // eslint-disable-next-line no-useless-return
      //   if (!valid) return
      //   const {data:res} = await this.$http.put('users/'+this.editform.id,{mail:this.editform.mail,phone:this.editform.phone)
      //   if (res.meta.status !== 201){
      //      this.$message.error('')
      //   }
      //  关闭对话框
      //  this.editdialogVisible = false
      //  刷新数据列表
      // this.userlist()
      // 提示修改成功
      // this.$message.success('更新成功')
      // })
    },
    removeUsers(id) {
      const res = this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).catch(err => err)
      console.log(res)
    }
  }

}
</script>
<style>
</style>
