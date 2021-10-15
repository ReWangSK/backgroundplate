<template>
  <div class="login_bg">
    <!-- dengluhe -->
    <div class="login_box">
      <!-- touxiangming -->
      <div class="login_tx">
        <img src="../assets/css/tx.jpg">
      </div>
      <!-- yanzhengdenglu -->
      <el-form ref="formloginref" :model="loginform" label-width="0px" class="login_go" :rules="loginrules">
        <!-- 账户 -->
      <el-form-item prop="formName">
    <el-input v-model="loginform.formName"></el-input>
  </el-form-item>
  <!-- 密码 -->
      <el-form-item prop="formpassword">
    <el-input  v-model="loginform.formpassword" type="password"></el-input>
  </el-form-item>
  <el-form-item  class="btns">
   <el-button type="primary" @click="login_in">登录</el-button>
    </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      loginform: {
        formName: 'aaaaaaaa',
        formpassword: '11111111'
      },
      loginrules: {
        formName: [
          { required: true, message: '请输入昵称', trigger: 'blur' },
          { min: 8, max: 15, message: '长度在 8 到 15 个字符', trigger: 'blur' }
        ],
        formpassword: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { min: 8, max: 15, message: '长度在 8 到 15 个字符', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    login_in () {
      this.$refs.formloginref.validate(async valid => {
        if (!valid) return this.$message.error('登陆失败')
        // const { data: res } = await this.$http.post('login', this.loginform)
        // if (res.meta.status !== 400) return this.$message.error('登陆失败')
        // this.$message.success('登陆成功')
        // window.sessionStorage.setItem('token', res.data.token)
        this.$router.push('/home')
      })
    }
  }
}

</script>
<style scoped>
 .login_go{
   position: absolute;
   top: 30%;
   width: 100%;
   padding: 20px;
   box-sizing: border-box;
}
.btns{
  width: 100%;
  display: flex;
  justify-content: center;
}
 .login_bg{
   background-color:darkcyan;
   height: 100%;
}
.login_box{
  background-color:blanchedalmond;
  height: 400px;
  width: 600px;
  position: absolute;
  right: 50%;
  top: 50%;
  transform: translate(50%,-50%);
}
.login_tx{
  height: 130px;
  width: 130px;
  border-radius: 50%;
  border:1px solid whitesmoke;
  padding: 10px;
  box-shadow: 0 0 10px darkgoldenrod;
  background-color: ghostwhite;
  position: absolute;
  left: 50%;
  top: -10%;
  transform: translate(-50%,-10%);
}
img{
  height: 100%;
  width: 100%;
  border-radius: 50%;
  background-color: teal;
}
</style>
