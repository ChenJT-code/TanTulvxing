<template>
  <div class="register">
    <el-form :model="form" :rules="rules" ref="ruleForm" class="demo-ruleForm">
      <!-- 用户名或手机号 -->
      <el-form-item prop="username">
        <el-input v-model="form.username" placeholder="用户名/手机号"></el-input>
      </el-form-item>
      <!-- 验证码 -->
      <div class="yanzheng">
        <el-form-item prop="captcha">
          <el-input v-model="form.captcha" placeholder="验证码"></el-input>
          <el-button @click="sendYanZheng">发送验证码</el-button>
        </el-form-item>
      </div>
      <!-- 昵称 -->
      <el-form-item prop="nickname">
        <el-input v-model="form.nickname" placeholder="昵称"></el-input>
      </el-form-item>
      <!-- 密码 -->
      <el-form-item prop="password">
        <el-input v-model="form.password" placeholder="密码" type="password"></el-input>
      </el-form-item>
      <!-- 确认密码 -->
      <el-form-item prop="checkPassword">
        <el-input v-model="form.checkPassword" placeholder="确认密码" type="password"></el-input>
      </el-form-item>
      <!-- 提交按钮 -->
      <el-form-item>
        <el-button type="primary" @click="submitForm">注册</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  data() {
    var validatePass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请确认密码"));
      } else if (this.form.checkPassword !== this.form.password) {
        callback(new Error("两次输入的密码不一致"));
      } else {
        callback();
      }
    };
    return {
      form: {
        username: "",
        nickname: "",
        captcha: "",
        password: "",
        checkPassword: ""
      },
      rules: {
        username: [
          { required: true, message: "请输入用户名/手机号", trigger: "blur" }
        ],
        password: [{ required: true, message: "请输入密码", trigger: "blur" }],
        captcha: [{ required: true, message: "请输入验证码", trigger: "blur" }],
        nickname: [{ required: true, message: "请输入昵称", trigger: "blur" }],
        checkPassword: [{ required: true, validator: validatePass }]
      }
    };
  },
  methods: {
    //获取验证码
    sendYanZheng() {
      //判断手机号不能问空
      if (!this.form.username) {
        this.$confirm("手机号码不能为空", "提示", {
          confirmButtonText: "确定",
          showCancelButton: false,
          type: "warning"
        });
        return;
      }
      //判断手机号的长度只能是11位
      if (this.form.username.length !== 11) {
        this.$confirm("手机号码格式错误", "提示", {
          confirmButtonText: "确定",
          showCancelButton: false,
          type: "warning"
        });
        return;
      }
      this.$axios({
        url: "/captchas",
        method: "post",
        data: { tel: this.form.username }
      }).then(res => {
        // console.log(res);
        this.$confirm(`模拟验证码:${res.data.code}`, "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        });
      });
    },
    //注册用户
    submitForm() {
      this.$refs.ruleForm.validate(valid => {
        if (valid) {
          const { checkPassword, ...props } = this.form;
          this.$axios({
            method: "post",
            url: "/accounts/register",
            data: props
          }).then(res => {
            console.log(res);
            this.$message.success("用户注册成功，后台正在处理");
            setTimeout(() => {
              window.location.reload("/user/login");
            }, 2000);
          });
        }
      });
    }
  }
};
</script>

<style lang='less' scoped>
.register {
  padding: 25px 25px 0px;
  .el-button--primary {
    width: 100%;
  }
  .yanzheng {
    position: relative;
    .el-button {
      position: absolute;
      top: 0px;
      right: 0px;
      background-color: #f5f7fa;
      width: 110px;
    }
  }
}
</style>