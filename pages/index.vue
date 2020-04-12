<template>
  <div class="index">
    <template>
      <div class="container">
        <!-- 幻灯片 -->
        <el-carousel :interval="2000" arrow="always">
          <!-- <el-carousel-item v-for="(value, index) in banners" :key="index"> -->
          <el-carousel-item v-for="(item, index) in banners" :key="index">
            <!-- <div
              class="banner-image"
              :style="`
                background:url(${$axios.defaults.baseURL+value.url}) center center no-repeat;
                background-size:contain contain;
                `"
            ></div>-->
            <div
              class="banner-image"
              :style="`
                background:url(${item.url}) center center no-repeat;
                background-size:contain contain;
                `"
            ></div>
          </el-carousel-item>
        </el-carousel>
        <!-- 搜索框 -->
        <div class="banner-content">
          <div class="search-bar">
            <!-- tab栏 -->
            <!-- <el-row type="flex" class="search-tab"> -->
            <div class="daohang">
              <span
                v-for="(item, index) in options"
                :key="index"
                :class="{active: index === currentOption}"
                @click="handleChangeTab(index)"
              >
                <i>{{item.name}}</i>
              </span>
            </div>
            <!-- <span
                v-for="(item, index) in options"
                :key="index"
                :class="{active: index === currentOption}"
                @click="handleChangeTab(index)"
              >
                <i>{{item.name}}</i>
            </span>-->
            <!-- </el-row> -->

            <!-- 输入框 -->
            <!-- <el-ro w type="flex" align="middle" class="search-input">
              <input :placeholder="options[currentOption].placeholder" />
              <i class="el-icon-search" @click="goToSearch"></i>
            </el-ro>-->
            <div class="ssk">
              <input :placeholder="options[currentOption].placeholder" />
              <span @click="goToSearch" class="ss">
                <img src="../assets/images/搜索.png" alt />
              </span>
            </div>
          </div>
        </div>
      </div>
    </template>
  </div>
</template>

<script>
export default {
  data() {
    return {
      // 轮播图数据
      // banners: [],
      banners: [
        {
          url: require("../assets/images/风景2.jpg")
        },
        {
          url: require("../assets/images/风景1.jpg")
        },
        {
          url: require("../assets/images/风景3.jpg")
        },
        {
          url: require("../assets/images/风景4.jpg")
        },
        {
          url: require("../assets/images/风景5.jpg")
        }
      ],
      options: [
        // 搜索框tab选项
        {
          name: "攻略",
          placeholder: "　搜索攻略"
        },
        {
          name: "酒店",
          placeholder: "　搜索酒店"
        },
        {
          name: "机票",
          placeholder: "　搜索机票"
        }
      ],
      currentOption: 0 // 当前选中的选项
    };
  },
  // mounted() {
  //   this.$axios({
  //     url: "/scenics/banners"
  //   }).then(res => {
  //     this.banners = res.data.data;
  //   });
  // },
  methods: {
    //tab栏切换高亮显示
    handleChangeTab(index) {
      this.currentOption = index;
      if (index == 2) {
        this.$router.push("/air");
      }
    },
    // 搜索
    goToSearch() {
      if (this.currentOption == 0) {
        this.$router.push("/post");
      } else if (this.currentOption == 1) {
        this.$router.push("/hotel");
      }
    }
  }
};
</script>


<style scoped lang="less">
.container {
  min-width: 1000px;
  margin: 0 auto;
  position: relative;

  /deep/ .el-carousel__container {
    height: 600px;
  }

  .banner-image {
    width: 100%;
    height: 100%;
  }

  .banner-content {
    z-index: 9;
    width: 1000px;
    position: absolute;
    left: 60%;
    top: -19%;
    margin-left: -500px;
    border-top: 1px transparent solid;

    .search-bar {
      // width: 552px;
      // margin: 0 auto;
      .daohang {
        span {
          padding: 0 10px;
        }
      }
      .ssk {
        input {
          height: 25px;
          width: 300px;
          border: 2px solid #2064c8;
          border-radius: 30px;
        }
        .ss {
          position: absolute;
          left: 270px;
          top: 25px;
        }
      }
    }

    // .search-tab {
    //   .active {
    //     i {
    //       color: #333;
    //     }
    //     &::after {
    //       background: #eee;
    //     }
    //   }

    //   span {
    //     width: 82px;
    //     height: 36px;
    //     display: block;
    //     position: relative;
    //     margin-right: 8px;
    //     cursor: pointer;

    //     i {
    //       position: absolute;
    //       z-index: 2;
    //       display: block;
    //       width: 100%;
    //       height: 100%;
    //       line-height: 30px;
    //       text-align: center;
    //       color: #fff;
    //     }

    //     &:after {
    //       position: absolute;
    //       left: 0;
    //       top: 0;
    //       display: block;
    //       content: "";
    //       width: 100%;
    //       height: 100%;
    //       border: 1px rgba(255, 255, 255, 0.2) solid;
    //       border-bottom: none;
    //       transform: scale(1.1, 1.3) perspective(0.7em) rotateX(2.2deg);
    //       transform-origin: bottom left;
    //       background: rgba(0, 0, 0, 0.5);
    //       border-radius: 1px 2px 0 0;
    //       box-sizing: border-box;
    //     }
    //   }
    // }

    // .search-input {
    //   width: 550px;
    //   height: 46px;
    //   background: #fff;
    //   border-radius: 0 4px 4px 4px;
    //   border: 1px rgba(255, 255, 255, 0.2) solid;
    //   border-top: none;
    //   box-sizing: unset;

    //   input {
    //     flex: 1;
    //     height: 20px;
    //     padding: 13px 15px;
    //     outline: none;
    //     border: 0;
    //     font-size: 16px;
    //   }

    //   .el-icon-search {
    //     cursor: pointer;
    //     font-size: 22px;
    //     padding: 0 10px;
    //     font-weight: bold;
    //   }
    // }
  }
}
</style>

