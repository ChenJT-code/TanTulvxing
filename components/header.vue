<template>
  <header class="header">
    <div class="top">
      <span>旅行，让生活更有趣</span>
      <div class="kefu">
        <a>趣生活商城</a>
        <a>在线客服</a>
        <a>帮助中心</a>
        <a>Language</a>
      </div>
      <div class="dingdan">
        <a>消息</a>
        <a>积分商城</a>
        <a>查看订单</a>
      </div>
    </div>
    <div class="xinzeng">
      <div class="logo">
        <img src="../assets/images/logo.png" alt />
      </div>
      <div class="phone">
        <div class="xcx">
          <img src="../assets/images/小程序 (1).png" alt />
          <span>小程序</span>
        </div>
        <div class="sjb">
          <img src="../assets/images/手机.png" alt />
          <span>手机版</span>
        </div>
        <div class="kfdh">
          <img src="../assets/images/电话.png" alt />
          <span>客服电话</span>
        </div>
      </div>
    </div>
    <el-row type="flex" justify="space-between" class="main">
      <!-- logo -->
      <!-- <div class="logo">
        <nuxt-link to="/">
          <img src="../assets/images/logo.png" alt />
        </nuxt-link>
      </div>-->

      <!-- 菜单栏 -->
      <el-row type="flex" class="navs">
        <nuxt-link to="/">首页</nuxt-link>
        <nuxt-link to="/post">旅游攻略</nuxt-link>
        <nuxt-link to="/hotel">订酒店</nuxt-link>
        <nuxt-link to="/air">机票</nuxt-link>
      </el-row>

      <!-- 登录/用户信息 -->
      <el-row type="flex" align="middle">
        <!-- 如果用户存在则展示用户信息，用户数据来自store -->
        <el-dropdown v-if="$store.state.user.userInfo.token">
          <el-row type="flex" align="middle" class="el-dropdown-link">
            <nuxt-link to="#">
              <!-- <img :src="$axios.defaults.baseURL+$store.state.user.userInfo.user.defaultAvatar" /> -->
              <img src="../assets/images/头像.jpg" />
              {{$store.state.user.userInfo.user.nickname}}
            </nuxt-link>
            <i class="el-icon-caret-bottom el-icon--right"></i>
          </el-row>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item>
              <nuxt-link to="#">个人中心</nuxt-link>
            </el-dropdown-item>
            <el-dropdown-item>
              <div @click="handleLogout">退出</div>
            </el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>

        <!-- 不存在用户信息展示登录注册链接 -->
        <nuxt-link to="/user/login" class="account-link" v-else>登录 / 注册</nuxt-link>
      </el-row>
    </el-row>
  </header>
</template>
<script>
export default {
  methods: {
    // 用户退出
    handleLogout() {
      console.log(12);
      this.$store.commit("user/removeUserInfo");
      localStorage.removeItem("mykey");
    }
  }
};
</script>
<style scoped lang="less">
.header {
  height: 156px;
  line-height: px;
  background: #2064c8;
  border-bottom: 1px #ddd solid;
  box-shadow: 0 3px 0 #f5f5f5;
  box-sizing: border-box;
  color: #fff;
  margin: 0px;
  padding: 0px;
  .top {
    height: 36px;
    background-color: #f4f4f4;
    color: #666;
    font-size: 12px;
    line-height: 36px;
    padding-left: 105px;
    display: flex;
    align-items: center;
    .kefu {
      margin-left: 100px;
      a {
        padding: 0 10px;
      }
      a:nth-child(-n + 3) {
        border-right: 1px solid #666;
      }
    }
    .dingdan {
      margin-left: 425px;
      a {
        padding: 0 10px;
      }
      a:nth-child(-n + 2) {
        border-right: 1px solid #666;
      }
    }
  }
  .xinzeng {
    height: 80px;
    line-height: 60px;
    background-color: #fff;
    display: flex;
    .logo {
      width: 200px;
      padding-top: 8px;
      margin-left: 75px;

      img {
        display: block;
        width: 100%;
      }
    }
    .phone {
      display: flex;
      align-items: center;
      margin-left:660px;
      .xcx {
        display: flex;
        align-items: center;
        color: #008000;
        margin-right: 10px;
        img {
          margin-right: 5px;
        }
      }
      .sjb {
        display: flex;
        align-items: center;
        color: red;
        margin-right: 10px;
        img {
          margin-right: 5px;
        }
      }
      .kfdh {
        display: flex;
        align-items: center;
        color: blue;
        margin-right: 10px;
        img {
          margin-right: 5px;
        }
      }
    }
  }
  .main {
    width: 1000px;
    margin: 0 auto;
    height: 39px;
  }

  // .logo {
  //   width: 156px;
  //   padding-top: 8px;

  //   img {
  //     display: block;
  //     width: 100%;
  //   }
  // }

  .navs {
    margin: 0 -70px;
    flex: 1;

    a {
      font-size: 14px;
      display: block;
      padding: 0 20px;
      height: 39px;
      box-sizing: border-box;
      line-height: 39px;
      color: #fff;
      border-right: 1px solid #fff;

      &:hover,
      &:focus,
      &:active {
        // border-bottom: 5px #003679 solid;
        color: #409eff;
      }
    }

    /deep/ .nuxt-link-exact-active {
      background: #003679;
      color: #fff !important;
    }
  }

  .message {
    height: 36px;
    line-height: 1;
    cursor: pointer;
    .el-icon-bell {
      margin-right: 2px;
      font-size: 18px;
    }
  }

  .el-dropdown-link {
    margin-right: -70px;
    img {
      width: 25px !important;
      height: 25px !important;
    }

    color: #fff;

    &:hover {
      img {
        border-color: #409eff;
      }
    }

    a {
      display: block;
    }

    img {
      width: 32px;
      height: 32px;
      vertical-align: middle;
      // border: 2px #fff solid;
      border-radius: 50px;
    }
  }

  .account-link {
    font-size: 14px;
    margin-left: 10px;
    color: #fff;

    &:hover {
      color: #409eff;
      text-decoration: underline;
    }
  }
}
</style>