<template>
  <div class="tabsbox">
    <!-- tab切换 -->
    <div class="tab">
      <li
        ref="domList"
        v-for="(item,index) in cityData"
        :key="index"
        @mouseover="overtabsList(item,index)"
        @mouseout="outtabsList(index)"
        :class="[(rightnone===index) ? 'rightnones' : 'rightshows']"
      >
        <span>{{ item.type }}</span>
        <i class="el-icon-arrow-right icon" />
      </li>
    </div>
    <!-- 显示tab切换 -->
    <div
      @mouseover="tabshow=true;
      rightnone=indexs"
      @mouseout="tabshow=false;
      rightnone=''"
      v-show="tabshow"
      class="tabshow"
    >
      <ul>
        <li v-for="(item,index) in tabshowData.children" :key="index">
          <i>{{ index }}</i>
          <strong>{{ item.city }}</strong>
          <span>
            <nuxt-link :to="`/post?city=${item.city}`">
              {{ item.desc }}
            </nuxt-link>
          </span>
        </li>
      </ul>
    </div>
    <!-- 推荐城市 -->
    <div class="recommend">
      <h4>推荐城市</h4>
      <img
        src="https://p3-q.mafengwo.net/s13/M00/41/C4/wKgEaVyaOs2AA9IKAAj8Lg2YzaU64.jpeg?imageMogr2%2Fthumbnail%2F1360x%2Fstrip%2Fquality%2F90"
        alt
      >
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      cityData: [],
      //   是否显示
      tabshow: false,
      // 显示的子元素
      tabshowData: [],
      // 显示的索引值
      rightnone: '',
      rightnones: '',
      indexs: ''
    }
  },
  mounted () {
    // 获取城市列表
    this.$axios({
      url: '/posts/cities'
    }).then((res) => {
      this.cityData = res.data.data
    })
  },
  methods: {
    overtabsList (item, index) {
      this.tabshowData = item
      this.tabshow = true
      this.rightnone = index
      this.indexs = index
    },
    outtabsList (index) {
      this.tabshow = false
      this.rightnone = ''
    }
  }
}
</script>

<style scoped lang="less" >
// tab栏
.tabsbox {
  width: 260px;
  .tab {
    width: 260px;
    border: 1px solid #ddd;
    border-right: none;
    border-bottom: none;
    box-shadow: 0 0 1px #f5f5f5;
    > li {
      background: #fff;
      display: flex;
      justify-content: space-between;
      height: 40px;
      line-height: 40px;
      border-bottom: 1px solid #ddd;
      border-right: 1px solid #ddd;
      padding: 0 20px;
      font-size: 14px;
      position: relative;
      z-index: 3;
      .icon {
        position: relative;
        top: 10px;
        right: -8px;
        font-size: 20px;
        color: #999;
      }
    }
    .rightnones {
      color: orange;
      border-right: 1px solid #fff;
      i {
        color: orange;
      }
    }
    .rightshows {
      border-right: 1px solid #ddd;
    }
  }
  // 显示的tab栏
  .tabshow {
    position: absolute;
    z-index: 2;
    left: 260px;
    top: 0px;
    width: 350px;
    padding: 10px 20px;
    box-sizing: border-box;
    background: #fff;
    border: 1px solid #ddd;
    li {
      font-size: 14px;
      line-height: 1.5;
      > i {
        color: orange;
        font-size: 24px;
        font-style: italic;
      }
      > strong {
        margin: 0 10px;
        color: orange;
        font-weight: 400;
      }
      > span {
        color: #999;
        cursor:pointer;
          &:hover {
            text-decoration: underline;
        }
      }
    }
  }
  .recommend {
    margin-top: 20px;
    > h4 {
      font-weight: 400;
      padding-bottom: 10px;
      border-bottom: 1px solid #ddd;
      margin-bottom: 10px;
    }
    > img {
      width: 100%;
      display: block;
    }
  }
}
</style>
