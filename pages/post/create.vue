<template>
  <div class="container">
    <el-row type="flex" justify="space-between">
      <div class="main">
        <h2 class="h">发表新攻略</h2>
        <p class="create-desc">分享你的个人游记，让更多人看到哦！</p>
      </div>
    </el-row>
    <el-input
      placeholder="请输入标题"
      v-model="form.input"
      style="margin-top:15px; width:750px; margin-bottom:20px; height:40px;"
    ></el-input>

 <form >
      <VueEditor :config="config" class="config" ref="vueEditor" />
 </form>

    <el-form ref="form" :model="form" style="padding-top:20px;">
      <el-form-item label="选择城市">
        <el-autocomplete
          :fetch-suggestions="queryDepartSearch"
          placeholder="请搜索出发城市"
          @select="handleDepartSelect"
          class="el-autocomplete"
          v-model="form.departCity"
          :trigger-on-focus="false"
          :highlight-first-item="true"
        ></el-autocomplete>
      </el-form-item>
    </el-form>
    <div class="foot">
      <el-button type="primary" style="font-size:12px;  padding:9px 15px" @click="fabu">发布</el-button>
      <span style="font-size:14px; padding-left:10px;">
        或者
        <el-link type="warning" style="font-size:14px;" class="caogao">保存到草稿</el-link>
      </span>
    </div>
    <div class="box">
      <h4
        style="font-weight:400;   color:#666; font-size:16px;  line-height:25px; padding-bottom:10px;"
      >草稿箱 (5)</h4>
      <i class="el-icon-edit"></i>
      <p class="time">2019-12-11</p>
    </div>
  </div>
</template>

<script>
import "quill/dist/quill.snow.css";
let VueEditor;
if (process.browser) {
  VueEditor = require("vue-word-editor").default;
}
export default {
  components: {
    VueEditor
  },
  data() {
    return {
      form: {
        input:'',
        departCity: "",
        departCode: "",
        content:''
      },
      config: {
        // 上传图片的配置
        uploadImage: {
          // 处理文件上传的服务器地址
          url: "http://157.122.54.189:9095/upload",
          // 后台需要的参数名称
          name: "files",
          // res是结果，insert方法会把内容注入到编辑器中，res.data.url是资源地址
          uploadSuccess(res, insert) {
            console.log(res); 
            insert("http://157.122.54.189:9095" + res.data.url);
          }
        },
        // 上传视频的配置
        uploadVideo: {
          url: "http://157.122.54.189:9095/upload",
          name: "files",
          uploadSuccess(res, insert) {
            console.log(res);
            insert("http://157.122.54.189:9095" + res.data.url);
          }
        }
      },
      tont:{
      }
    };
  },
  //发布
  methods: {
    fabu() {
      this.$axios({
        methods: "post",
        url: "/posts",
        headers: {
          Authorization: "Bearer " + this.$store.state.user.userInfo.token
        },
        data:this.tont
      }).then(res=>{
        this.form=res.data
      })
      ;
    },
    //搜索城市
    async queryDepartSearch(value, cb) {
      let arr = await this.searchCityByValue(value);
      if (arr.length) {
        this.form.departCode = arr[0].sort;
      }
      cb(arr);
    },
    searchCityByValue(keyWord) {
      return this.$axios({
        url: "/airs/city",
        params: {
          name: keyWord
        }
      }).then(res => {
        const { data } = res.data;
        let citys = data.map(value => {
          return {
            ...value,
            value: value.name.replace("", "")
          };
        });
        let citysList = citys.fi
        lter(item => item.sort);
        return citysList;
      });
    },
    handleDepartSelect(item) {
      this.form.departCode = item.sort;
    },
    gettoken() {
      this.$axios({
        url: "/upload",
        method: "post",
        headers: {
          Authorization: "Bearer " + this.$store.state.user.userInfo.token
        }
      }).then(res => {
        console.log(res)
      });
    }
  }
};
</script>
 
<style lang="less" scoped>
.container {
  position: relative;
  width: 1000px;
  margin: 20px auto;
  .h {
    font-weight: 400;
    font-size: 22px;
    margin-bottom: 10px;  
  }
  .create-desc {
    font-size: 12px;
    color: #999;
  }
  .config {
    width: 750px;
    height: 399px;
    padding-bottom: 45px;
  }
  .caogao {
    position: absolute;
    left: 107px;
    bottom: 8px;
  }
  .box {
    border: 1px solid #999;
    width: 200px;
    padding: 10px;
    position: absolute;
    top: 0;
    right: 0;
    .el-icon-edit:hover {
      color: orange;
      cursor: pointer;
    }
    .time {
      color: #999;
      font-size: 14px;
    }
  }
}
</style>