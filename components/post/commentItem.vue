<template>
  <div class="cmt-item-child">
    <mycomment v-if="data.parent" :data="data.parent" @replayComment="sendComm(data.parent)"></mycomment>
    <div class="cmt-info">
      {{data.account.nickname}}
      <i>{{data.created_at|timeFormat()}}</i>
      <span>{{data.level}}</span>
    </div>
    <div class="cmt-content">
      <div class="cmt-new">
        <p class="cmt-message">{{data.content}}</p>
        <el-row type="flex" v-if="data.pics.length">
          <div class="cmt-pic" v-for="(value,index) in data.pics" :key="index">
            <!-- <img :src="`http://157.122.54.189:9095${value.url}`" alt="" v-for="(value,index) in data.pics" :key="index" > -->
            <el-image
              style="width: 80px; height: 80px"
              :src="`http://157.122.54.189:9095${value.url}`"
              :preview-src-list="[`http://157.122.54.189:9095${value.url}`]"
            ></el-image>
          </div>
        </el-row>
        <div class="cmt-ctrl">
          <a href="JavaScript:;" @click="sendComm(data)">回复</a>
        </div>
      </div>
    </div>
    <div></div>
  </div>
</template>

<script>
export default {
  name: "mycomment",
  props: ["data"],
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
  methods: {
    sendComm(data) {
      this.$emit("replayComment", data);
    }
  }
};
</script>

<style lang="less" scoped>
.cmt-item-child {
  border: 1px solid #ddd;
  padding: 2px;
  background: #f9f9f9;

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
    .cmt-ctrl {
      visibility: hidden;
    }
    &:hover {
      .cmt-ctrl {
        visibility: visible;
      }
    }
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
        }
      }
    }
  }
  :last-child {
    border-bottom: none;
  }
}
</style>