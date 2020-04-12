<template>
   <div class="inp">
        <el-form :model="userForm" :rules="rules" ref="ruleForm" class="demo-ruleForm">
          <el-form-item prop="username">
            <el-input v-model="userForm.username" placeholder="请输入用户名"></el-input>
          </el-form-item>
          <el-form-item prop="password">
            <el-input v-model="userForm.password" placeholder="请输入密码"></el-input>
          </el-form-item>
          <span class="losePassword">忘记密码</span>
          <el-form-item>
            <el-button type="primary" @click="handleLogin">登录</el-button>
          </el-form-item>
        </el-form>
      </div>
</template>

<script>

export default {
 data() {
    return {
      userForm: {
        username: "13075130000",
        password: "123456"
      },
      rules: {
        username: [
          { required: true, message: "请输入用户名", trigger: "blur" }
        ],
        password: [{ required: true, message: "请输入密码", trigger: "blur" }]
      }
    };
  },
  methods:{
    //登录
    handleLogin(){
      this.$refs.ruleForm.validate((valid)=>{
        if(valid){
          this.$store.dispatch('user/login',this.userForm).then(res=>{
            // console.log(res);
            this.$message.success('登录成功,正在跳转'),
            setTimeout(()=>{
              this.$store.commit('user/setUserInfo',res)
              this.$router.replace('/')
            },2000)
          })
        }else{
          this.$message.error('用户名和密码为必填项')
          return false
        }
      })
    }
  }
}
</script>

<style lang='less' scoped>

  .inp {
    padding: 30px 25px 0px;
    .el-button--primary {
      width: 100%;
      background-color: #d8900a;
      border-color:#d8900a;
    }
    .losePassword {
      display: block;
      text-align: right;
      font-size: 12px;
      color: #409eff;
      margin-bottom: 10px;
    }
  }

</style>