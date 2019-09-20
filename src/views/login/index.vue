<template>
  <div class="login">
   <el-card class="login-card">
        <div class="big"><img src="../../assets/03.jpg" alt=""></div>
      <el-form ref="myFrom" :model="loginFrom" :rules="rules" style="margin:5px 0" >
   <el-form-item prop="mobile">
      <el-input v-model="loginFrom.mobile" placeholder="请输手机号"></el-input>
   </el-form-item>
   <el-form-item prop="code">

      <el-input  v-model="loginFrom.code" placeholder="请输入验证码" style="width:60%"></el-input>
       <el-button  round style="float:right">发送验证码</el-button>
   </el-form-item>
    <el-form-item style="margin-bottom:25px;" prop="agree">
    <el-checkbox v-model="loginFrom.agree">我已阅读并同意用户协议和隐私条款</el-checkbox>
   </el-form-item>

   <el-button style="width:45%">注册</el-button>
  <el-button type="primary" style="width:45%;float:right" @click="login">登录</el-button>

      </el-form>
     </el-card>

  </div>
</template>

<script>
export default {
  data () {
    let validator = function (rule, value, callBack) {
      value ? callBack() : callBack('请你认真阅读我们的协议')
    }
    return {
      loginFrom: {
        mobile: '',
        code: '',
        agree: false
      },
      rules: {
        mobile: [{ required: true, message: '请您输入手机号' }, { pattern: /^1[3456789]\d{9}$/, message: '请您输入合法手机号' }],
        code: [{ required: true, message: '请您输入验证码' }, { pattern: /^\d{6}$/, message: '请您输入验证码' }],
        agree: [{ validator }]
      }
    }
  },
  methods: {
    login () {
      this.$refs.myFrom.validate((isOk) => {
        if (isOk) {
          this.$http({
            url: '/authorizations',
            data: this.loginFrom,
            method: 'post'
          }).then(result => {
            console.log(result)
            window.localStorage.setItem('user-token', result.data.data.token)
            this.$router.push('./home')
          }).catch(() => {
            this.$message({
              message: '手机号或验证码错误',
              type: 'warning'
            })
          })
        }
      })
    }
  }
}
</script>

<style lang="less">
.login{
  background-image: url("../../assets/01.jpg");
  height:100vh;
  background-size: cover;
  display: flex;
  justify-content: center;
  align-items: center;
  .login-card{
    width:440px;
    height:520px;
    img{
          width: 100%;
    }
  }
}
</style>
