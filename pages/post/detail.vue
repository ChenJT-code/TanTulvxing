<template>
  <div class="container">
    <el-row type="flex" justify="space-between">
      <div class="main">
        <el-breadcrumb separator="/">
          <el-breadcrumb-item :to="{ path: '/post' }">旅游攻略</el-breadcrumb-item>
          <el-breadcrumb-item>攻略详情</el-breadcrumb-item>
        </el-breadcrumb>
        <h1>{{travelInfo.title}}</h1>
        <div class="post-info">
          <span>攻略：{{travelInfo.updated_at|timeFormat()}}</span>
          <span>阅读：{{travelInfo.watch}}</span>
        </div>
        <div class="post-content" v-html="travelInfo.content"></div>
        <div class="post-ctrl">
          <el-row type="flex" justify="center">
            <div class="ctrl-item">
              <i class="iconfont iconpinglun"></i>
              <p>评论({{travelInfo.comments && travelInfo.comments.length? travelInfo.comments.length:0 }})</p>
            </div>
            <div class="ctrl-item">
              <i class="iconfont iconstar1" @click="collect"></i>
              <p>收藏</p>
            </div>
            <div class="ctrl-item">
              <i class="iconfont iconfenxiang"></i>
              <p>分享</p>
            </div>
            <div class="ctrl-item">
              <i class="iconfont iconding" @click="getLike"></i>
              <p>点赞({{travelInfo.like||0}})</p>
            </div>
          </el-row>
        </div>
        <div class="cmt-wrapper">
          <h4 class="cmt-title">评论</h4>
          <el-tag @close="handleClose" v-if="showTag" closable type="info">@{{username}}</el-tag>
          <div class="cmt-input">
            <el-input type="textarea" :rows="2" placeholder="请输入内容" v-model="content" ref="gain"></el-input>
          </div>
          <el-row class="cmt-input-ctrls" justify="space-between" type="flex">
            <div class="cmt-pics">
              <el-upload
                ref="my-upload"
                name="files"
                action="http://157.122.54.189:9095/upload"
                list-type="picture-card"
                :on-success="handlePictureSuccess"
                :on-remove="onRemove"
              >
                <i class="el-icon-plus"></i>
              </el-upload>
            </div>
            <div class="submit">
              <el-button type="primary" size="mini" @click="submitComment">提交</el-button>
            </div>
          </el-row>
          <div class="cmt-list">
            <div class="cmt-item" v-for="(item,index) in userComments" :key="index">
              <div class="cmt-info">
                <img src="http://157.122.54.189:9095/assets/images/avatar.jpg" alt />
                {{item.account.nickname}}
                <i>{{item.created_at|timeFormat()}}</i>
                <span>{{item.level}}</span>
              </div>
              <div class="cmt-content">
                <CommentItem v-if="item.parent" :data="item.parent" @replayComment="replayComment"></CommentItem>
                <div
                  class="cmt-new"
                  @mouseenter="showhuifu(index)"
                  @mouseleave="hiddenhuifu(index)"
                >
                  <p class="cmt-message">{{item.content}}</p>
                  <el-row type="flex" v-if="item.pics.length">
                    <div class="cmt-pic" v-for="(value,index) in item.pics" :key="index">
                      <!-- <img
                        :src="`http://157.122.54.189:9095${value.url}`"
                        alt
                        v-for="(value,index) in item.pics"
                        :key="index"
                      />-->

                      <el-image
                        style="width: 80px; height: 80px"
                        :src="`http://157.122.54.189:9095${value.url}`"
                        :preview-src-list="[`http://157.122.54.189:9095${value.url}`]"
                      ></el-image>
                    </div>
                  </el-row>
                  <div class="cmt-ctrl">
                    <a
                      href="JavaScript:;"
                      v-if="isShow===index"
                      @click="userComm(item.id,item.account.nickname)"
                    >回复</a>
                  </div>
                </div>
              </div>
              <div></div>
            </div>
          </div>
          <el-row type="flex" justify="center">
            <el-pagination
              @size-change="handleSizeChange"
              @current-change="handleCurrentChange"
              :current-page="pageIndex"
              :page-sizes="[2, 4, 6, 8]"
              :page-size="2"
              layout="total, sizes, prev, pager, next, jumper"
              :total="100"
            ></el-pagination>
          </el-row>
        </div>
      </div>

      <div class="aside">
        <h4 class="aside-title">相关攻略</h4>
        <div class="recommend-list">
          <nuxt-link
            :to="`/post/detail?id=${item.id}`"
            class="recommend-item"
            v-for="(item,index) in commentPost"
            :key="index"
          >
            <el-row class="post-imgText" type="flex">
              <el-row class="post-img" type="flex" align="middle">
                <img :src="item.images[0]?item.images[0]:''" alt />
              </el-row>
              <div class="post-text">
                <div>{{item.title}}</div>
                <p>{{item.created_at|timeFormat()}} 阅读 {{item.watch}}</p>
              </div>
            </el-row>
          </nuxt-link>
        </div>
      </div>
    </el-row>
  </div>
</template>

<script>
import moment from "moment";
import CommentItem from "@/components/post/commentItem";
export default {
  data() {
    return {
      // previewSrcList:[],
      start: 0, //评论开始数据
      limit: 2, //评论条数
      showTag: false, //是否显示回复标签
      username: "", //回复对象的昵称
      follow: "", //回复对象的id
      isShow: "", //回复按钮是否显示
      userComments: [], //用户评论数据
      textarea: "", //文本框内容
      commentPost: "", //推荐文章详情
      travelInfo: {}, //页面数据详情
      pics: [], //图片上传数组
      content: "", //文本框输入内容
      pageIndex: 1
    };
  },
  components: {
    CommentItem
  },
  methods: {
    //点击页码条数变化
    handleSizeChange(val) {
      this.limit = val;
      this.getPostComm();
      this.previewSrcList = [];
    },
    //点击页码数变化
    handleCurrentChange(val) {
      console.log(val);
      this.pageIndex = val;
      this.start = (val - 1) * this.limit;
      this.getPostComm();
      this.previewSrcList = [];
    },
    //点击移除回复人标签
    handleClose() {
      this.showTag = false;
    },
    //清除评论之后显示的图片
    clearFiles() {
      this.$refs["my-upload"].clearFiles();
    },
    //显示回复
    showhuifu(index) {
      this.isShow = index;
    },
    // 隐藏回复
    hiddenhuifu(index) {
      this.isShow = "";
    },
    //点赞功能
    getLike() {
      let token = this.$store.state.user.userInfo.token;
      this.$axios({
        url: "/posts/like",
        params: {
          id: this.travelInfo.id
        },
        headers: {
          Authorization: "Bearer " + token
        }
      }).then(res => {
        this.$message({
          type: "success",
          message: "点赞成功"
        });
      });
    },
    // 收藏功能
    collect() {
      let token = this.$store.state.user.userInfo.token;
      this.$axios({
        url: "/posts/star",
        params: {
          id: this.travelInfo.account.id
        },
        headers: {
          Authorization: "Bearer " + token
        }
      }).then(res => {
        this.$message({
          type: "success",
          message: "收藏成功"
        });
      });
    },
    //文件上传
    handlePictureSuccess(response) {
      this.$message.success("上传图片成功");
      this.pics.push(response[0]);
    },
    //文件删除的钩子
    onRemove(file, fileList) {
      //移除时候需要把之前的数组对应的图片删除
      for (var i = 0; i < this.pics.length; i++) {
        if (this.pics[i].id == file.response[0].id) {
          this.pics.splice(i, 1);
        }
      }
    },
    //获取文章用户评论
    getPostComm() {
      this.$axios({
        url: "/posts/comments",
        params: {
          post: this.$route.query.id,
          _start: this.start,
          _limit: this.limit
        }
      }).then(res => {
        this.userComments = res.data.data;

        // this.userComments.forEach(item=>{

        //       const itemPics=item.pics.map(value=>{
        //         return `http://157.122.54.189:9095${value.url}`
        //       })
        //       this.previewSrcList.push(itemPics)
        //     })
      });
    },
    //提交评论
    submitComment() {
      let token = this.$store.state.user.userInfo.token;
      this.$axios({
        url: "/comments",
        method: "POST",
        data: {
          post: this.$route.query.id,
          pics: this.pics,
          content: this.content,
          follow: this.follow
        },
        headers: {
          Authorization: "Bearer " + token,
          Accept: "application/json"
        }
      }).then(res => {
        this.$message.success("提交评论成功");
        this.content = "";
        this.clearFiles();
        this.showTag = false;
        this.follow = ""; //评论成功之后需要设置为空
        this.pics = []; //评论成功之后需要设置为空
        this.start = 0;
        this.previewSrcList = [];
        this.getPostComm();
      });
    },
    //用户回复用户评论
    userComm(id, username) {
      //点击回复光标显示在文本域中
      this.$refs.gain.focus();
      this.showTag = true;
      this.follow = id;
      this.username = username;
    },
    //子组件传递过来的数据
    replayComment(value) {
      this.$refs.gain.focus();
      this.showTag = true;
      this.follow = value.id;
      this.username = value.account.nickname;
    }
  },
  filters: {
    timeFormat(data, spe) {
      data = data ? new Date(data) : new Date();
      spe = spe || "-";
      var year = data.getFullYear();
      var month = data.getMonth() + 1;
      var day = data.getDate();
      var hour = data.getHours();
      var minutes =
        data.getMinutes() > 10 ? data.getMinutes() : "0" + data.getMinutes();
      return year + spe + month + spe + day + " " + hour + ":" + minutes;
    }
  },
  watch: {
    //监听路由变化
    $route() {
      this.$axios({
        url: "/posts",
        params: {
          id: this.$route.query.id
        }
      }).then(res => {
        this.travelInfo = res.data.data[0];
        this.showTag = false; //清空显示回复人
        this.textarea = ""; //清空文本域内容
        this.clearFiles(); //清空图片显示
        this.previewSrcList = [];
        //跳转路由时候显示第一条
        this.getPostComm();
        this.pageIndex = 1;
        console.log(this.pageIndex);
      });
    }
  },
  mounted() {
    //获取文章评论
    this.getPostComm();
    //获取文章详情
    this.$axios({
      url: "/posts",
      params: {
        id: this.$route.query.id
      }
    }).then(res => {
      this.travelInfo = res.data.data[0];
    });
    //获取推荐文章详情
    this.$axios({
      url: "/posts/recommend",
      params: {
        id: this.$route.query.id
      }
    }).then(res => {
      this.commentPost = res.data.data;
    });
  }
};
</script>

<style lang="less" scoped>
.container {
  width: 1000px;
  margin: 0 auto;
  padding-top: 20px;
  .main {
    max-width: 700px !important;
    width: 700px;
    h1 {
      padding: 20px 0;
      border-bottom: 1px solid #dddddd;
    }
    .post-info {
      padding: 20px;
      color: #999;
      text-align: right;
      > span {
        margin-left: 20px;
      }
    }
    .post-content {
      line-height: 1.5;
      /deep/ img {
        max-width: 700px;
        display: block;
        margin: 10px 0;
      }
    }
    .post-ctrl {
      padding: 50px 0 30px;
      .ctrl-item {
        margin: 0 20px;
        font-size: 20px;
        text-align: center;
        cursor: pointer;
        i {
          display: block;
          font-size: 28px;
          color: orange;
        }
        p {
          margin-top: 5px;
          font-size: 14px;
          color: #999;
        }
      }
    }
    .cmt-wrapper {
      margin-bottom: 20px;
      .cmt-title {
        font-weight: 400;
        font-size: 18px;
        margin-bottom: 20px;
      }
      .el-tag {
        margin-bottom: 10px;
      }
      .cmt-input {
        margin-bottom: 10px;
      }
      .cmt-input-ctrls {
        margin-bottom: 30px;
        .cmt-pics {
          /deep/.el-upload {
            width: 100px;
            height: 100px;
            line-height: 100px;
          }
          /deep/.el-upload-list__item {
            width: 100px;
            height: 100px;
          }
        }
      }
      .cmt-list {
        border: 1px solid #ddd;
        .cmt-item {
          border-bottom: 1px dashed #ddd;
          padding: 20px 20px 5px;
          // .cmt-ctrl {
          //   visibility: hidden;
          // }
          // &:hover {
          //   .cmt-ctrl {
          //     visibility: visible;
          //   }
          // }

          .cmt-info {
            margin-bottom: 10px;
            font-size: 12px;
            color: #666;
            > span {
              float: right;
            }
            > img {
              width: 16px;
              height: 16px;
              border-radius: 50%;
              vertical-align: top;
            }
          }
          .cmt-content {
            padding-left: 30px;
            .cmt-new {
              .cmt-message {
                margin-top: 10px;
              }
              .el-row {
                .cmt-pic {
                  width: 80px;
                  height: 80px;
                  border-radius: 6px;
                  overflow: hidden;
                  margin-right: 5px;
                  margin-top: 10px;
                  padding: 5px;
                  border: 1px dashed #ddd;
                  > img {
                    width: 100%;
                    height: 100%;
                    display: block;
                    object-fit: cover;
                    cursor: pointer;
                  }
                }
              }
              .cmt-ctrl {
                height: 20px;
                line-height: 20px;
                font-size: 12px;
                color: #1e50a2;
                text-align: right;

                > a {
                  text-decoration: none;
                  color: inherit;
                  //  display: none;
                }
              }
            }
          }
          :last-child {
            border-bottom: none;
          }
        }
      }
    }
  }
  .aside {
    width: 280px;
    .aside-title {
      font-weight: 400;
      font-size: 18px;
      padding-bottom: 10px;
      border-bottom: 1px solid #ddd;
    }
    .recommend-item {
      display: block;
      padding: 20px 0;
      border-bottom: 1px solid #ddd;
      .post-img {
        width: 100px;
        height: 80px;
        background-color: #ddd;
        overflow: hidden;
        margin-right: 10px;
        img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }
      }
      .post-text {
        position: relative;
        flex: 1;
        > div {
          line-height: 1.4em;
          height: 2.8em;
          overflow: hidden;
          position: absolute;
          left: 0;
          top: 0;
          width: 100px;
        }
        > p {
          position: absolute;
          bottom: 0;
          left: 0;
          font-size: 12px;
          color: #999;
        }
      }
    }
  }
}
</style>