<template>
  <div class="login">
    <div class="loginBox">
      <div class="titleTab">
        <span :class="{current:!changeTab}" @click="changeTab = !changeTab">登录</span>
        <span :class="{current:changeTab}" @click="changeTab = !changeTab">注册</span>
      </div>
      <loginForm v-if='changeTab'/>
      <registerForm v-if="!changeTab"/>
    </div>
  </div>
</template>

<script>
import loginForm from "@/components/user/loginForm.vue";
import registerForm from '@/components/user/registerForm.vue'
export default {
  data() {
    return {
      //切换登录与注册
      changeTab: true
    };
  },
  components: {
    loginForm,
    registerForm
  }
};
</script>

<style lang='less' scoped>
.login {
  height: 700px;
  background: url("http://157.122.54.189:9095/assets/images/th01.jfif") center
    center no-repeat;
  background-size: contain contain;
  display: flex;
  justify-content: center;
  align-items: center;
  .loginBox {
    width: 400px;
    background-color: #fff;
    .titleTab {
      display: flex;
      height: 45px;
      span {
        text-align: center;
        flex: 1;
        color: #ffa500;
        font-weight: 700;
        height: 100%;
        border-top: 2px solid #ffa500;
        display: flex;
        align-items: center;
        justify-content: center;
      }
      .current {
        background-color: #eee;
        color: #666666;
        border-top: none !important;
      }
    }
  }
}
</style>