<template>
  <div class="post-list">
    <div class="search-wrapper">
      <el-row class="search-bar">
        <el-input v-model="input" @change="sou" placeholder="请输入想去的地方，比如: '广州' " />
        <i @click="sou" class="el-icon-search icon" />
      </el-row>
      <el-row class="search-recommend">
        推荐：
        <nuxt-link :to="`/post?city=广州`">
          <span>广州</span>
        </nuxt-link>
        <nuxt-link :to="`/post?city=上海`">
          <span>上海</span>
        </nuxt-link>
        <nuxt-link :to="`/post?city=北京`">
          <span>北京</span>
        </nuxt-link>
      </el-row>
    </div>
    <el-row type="flex" justify="space-between" class="search-title" align="middle">
      <h4>推荐攻略</h4>
      <nuxt-link to="/post/create">
        <el-button type="primary" icon="el-icon-edit">
          写游记
        </el-button>
      </nuxt-link>
    </el-row>
    <!-- 上下布局 -->
    <div v-for="(item,index) in postlist " :key="index">
      <nuxt-link :to="`/post/detail?id=${item.id}`">
        <div v-if="item.images.length>2" class="post-item">
          <h4 class="post-title">
            <a href>{{ item.title }}</a>
          </h4>
          <p class="post-desc">
            {{ item.summary }}
          </p>
          <el-row type="flex" justify="space-between" align="middle" class="card-images">
            <a href>
              <img
                :src="item.images[0]"
                alt
              >
            </a>
            <a href>
              <img
                :src="item.images[1]"
                alt
              >
            </a>
            <a href>
              <img
                :src="item.images[2]"
                alt
              >
            </a>
          </el-row>
          <el-row type="flex" justify="space-between" class="post-info">
            <el-row type="flex" align="middle" class="post-info-left">
              <span>
                <i class="el-icon-location-outline" /> {{ item.cityName }}
              </span>
              <el-row type="flex" align="middle" class="post-user">
                by<a href>
                  <img :src="`http://157.122.54.189:9095${item.account.defaultAvatar}`">
                </a>
                <a href>{{ item.account.nickname }}</a>
              </el-row>
              <span>
                <i class="el-icon-view" /> {{ item.watch }}
              </span>
            </el-row>
            <span class="post-info-right">{{ item.like }} 赞</span>
          </el-row>
        </div>
      </nuxt-link>
    </div>
    <!-- 左右布局 -->
    <div
      v-for="(item,index) in postlist "
      :key="'lr'+index"
    >
      <nuxt-link :to="`/post/detail?id=${item.id}`">
        <el-row
          v-if="item.images.length<=2"
          type="flex"
          justify="space-between"
          align="middle"
          class="post-item"
        >
          <el-row align="middle" class="post-cover">
            <a href="">
              <img :src="item.images[0]" alt="">
            </a>
          </el-row>
          <div class="post-content">
            <h4 class="post-title">
              <a href="">{{ item.title }}</a>
            </h4>
            <p class="post-desc">
              <a href="">{{ item.summary }}</a>
            </p>
            <el-row type="flex" justify="space-between" class="post-info">
              <el-row type="flex" align="middle" class="post-info-left">
                <span>
                  <i class="el-icon-location-outline" /> {{ item.cityName }}
                </span>
                <el-row type="flex" align="middle" class="post-user">
                  by<a href>
                    <img :src="`http://157.122.54.189:9095${item.account.defaultAvatar}`">
                  </a>
                  <a href>{{ item.account.nickname }}</a>
                </el-row>
                <span>
                  <i class="el-icon-view" /> {{ item.watch }}
                </span>
              </el-row>
              <span class="post-info-right">{{ item.like }} 赞</span>
            </el-row>
          </div>
        </el-row>
      </nuxt-link>
    </div>
    <el-row type="flex" justify="center" style="margin-top:10px;">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :page-sizes="[3, 5, 10, 15]"
        :current-page="pageIndex"
        :page-size="pageSize"
        :total="postlists.length"
        layout="total, sizes, prev, pager, next, jumper"
      />
    </el-row>
  </div>
</template>

<script>
export default {
  data () {
    return {
      postlists: [],
      pageIndex: 1, // 当前页数
      pageSize: 3, // 显示条数
      input: ''
    }
  },
  computed: {
    postlist () {
      // 从第几条开始截取
      const start = (this.pageIndex - 1) * this.pageSize
      // 截取到第几条结束
      const end = start + this.pageSize
      return this.postlists.slice(start, end)
    }
  },
  watch: {
    $route () {
      this.$axios({
        url: 'posts',
        params: this.$route.query
      }).then((res) => {
        this.postlists = res.data.data
      })
    }
  },
  mounted () {
    this.getList()
  },
  methods: {
    // 封装获取列表
    getList () {
      this.$axios({
        url: 'posts'
      }).then((res) => {
        this.postlists = res.data.data
      })
    },
    // 切换条数时触发
    handleSizeChange (value) {
      this.pageSize = value
      this.pageIndex = 1
    },
    // 切换页数时触发
    handleCurrentChange (value) {
      this.pageIndex = value
    },
    // 搜索功能
    sou () {
      this.$axios({
        url: 'posts',
        params: {
          city: this.input
        }
      }).then((res) => {
        this.postlists = res.data.data
      })
    }
  }
}
</script>

<style lang='less' scoped>
.post-list {
  width: 700px;
  .search-wrapper {
    .search-bar {
      position: relative;
      border: 3px solid orange;
      /deep/.el-input {
        input {
          height: 34px;
          border: none;
          outline: none;
        }
      }
      .icon {
        cursor:pointer;
        position: absolute;
        right: 10px;
        top: 6px;
        font-size: 24px;
        color: orange;
        font-weight: 700;
      }
    }
    .search-recommend {
      font-size: 12px;
      color: #666;
      padding: 10px 0;
      span{
        cursor:pointer;
          &:hover{
              color: orange;
          }
      }
    }
  }
  .search-title {
    padding-bottom: 10px;
    border-bottom: 1px solid #eee;
    position: relative;
    h4 {
      font-size: 18px;
      color: orange;
      font-weight: 400;
      &:after {
        display: block;
        content: "";
        width: 72px;
        height: 2px;
        background: orange;
        position: absolute;
        bottom: 0;
        left: 0;
      }
    }
  }
  .post-item {
    width: 100%;
    padding: 20px 0;
    border-bottom: 1px solid #eee;
    .post-cover{
        width: 220px;
        height: 150px;
        overflow: hidden;
        flex-shrink: 0;
        margin-right: 10px;
        img{
            display: block;
            width: 100%;
            object-fit: cover
        }
    }
    .post-title {
      overflow: hidden;
      text-overflow: ellipsis;
      width: 470px;
      white-space: nowrap;
      margin-bottom: 15px;
      font-weight: 400;
      font-size: 18px;
      a{
        &:hover{
          color: orange
        }
      }
    }
    .post-desc {
      margin-bottom: 15px;
      line-height: 1.5;
      font-size: 14px;
      height: 64px;
      overflow: hidden;
      text-overflow: ellipsis;
      display: -webkit-box;
      -webkit-line-clamp: 3;
      color: #666;
    }
    .card-images {
      margin: 15px 0;
      img {
        width: 220px;
        height: 150px;
        display: block;
        object-fit: cover;
      }
    }
    .post-info {
      .post-info-left {
        font-size: 12px;
        color: #999;
        span {
          margin-right: 15px;
        }
        .post-user {
          margin-right: 15px;
          a {
              color: orange;
            img {
              display: block;
              width: 16px;
              height: 16px;
              border-radius: 100px;
              margin: 2px;
            }
          }
        }
      }
       .post-info-right{
           color: orange
       }
    }
  }
}
</style>
