<template>
  <div class="box">
    <div class="search-form">
      <!-- 头部tab切换 -->
      <el-row type="flex" class="search-tab">
        <span
          v-for="(item, index) in tabs"
          :key="index"
          @click="handleSearchTab(item, index)"
          :class="{active: index === currentTab}"
        >
          <i :class="item.icon"></i>
          {{item.name}}
        </span>
      </el-row>

      <el-form class="search-form-content" ref="form" label-width="80px">
        <el-form-item label="出发城市">
          <!-- fetch-suggestions 返回输入建议的方法 -->
          <!-- select 点击选中建议项时触发 -->
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
        <el-form-item label="到达城市">
          <el-autocomplete
            :fetch-suggestions="queryDestSearch"
            placeholder="请搜索到达城市"
            @select="handleDestSelect"
            class="el-autocomplete"
            v-model="form.destCity"
            :trigger-on-focus="false"
            :highlight-first-item="true"
          ></el-autocomplete>
        </el-form-item>
        <el-form-item label="出发时间">
          <!-- change 用户确认选择日期时触发 -->
          <el-date-picker
            type="date"
            placeholder="请选择日期"
            style="width: 100%;"
            v-model="form.departDate"
            @change="handleDate"
          ></el-date-picker>
        </el-form-item>
        <el-form-item label>
          <el-button
            style="width:100%;"
            type="primary"
            icon="el-icon-search"
            @click="handleSubmit"
          >搜索</el-button>
        </el-form-item>
        <div class="reverse">
          <span @click="handleReverse">换</span>
        </div>
      </el-form>
    </div>
  </div>
</template>

<script>
import moment from "moment";
export default {
  data() {
    return {
      tabs: [
        { icon: "iconfont icondancheng", name: "单程" },
        { icon: "iconfont iconshuangxiang", name: "往返" }
      ],
      currentTab: 0,
      form: {
        departCity: "",
        departCode: "",
        destCity: "",
        destCode: "",
        departDate: ""
      }
    };
  },
  methods: {
    // tab切换时触发
    handleSearchTab(item, index) {
      if (index === 1) {
        this.$confirm("该功能暂未开放,请购买单程票!", "提示", {
          confirmButtonText: "确定",
          showCancelButton: false,
          type: "warning"
        });
      }
    },

    // 出发城市输入框获得焦点时触发
    // value 是选中的值，cb是回调函数，接收要展示的列表
    async queryDepartSearch(value, cb) {
      let arr = await this.searchCityByValue(value);
      if (arr.length) {
        // this.form.departCity = arr[0].value
        this.form.departCode = arr[0].sort;
      }
      cb(arr);
    },

    // 目标城市输入框获得焦点时触发
    // value 是选中的值，cb是回调函数，接收要展示的列表
    async queryDestSearch(value, cb) {
      let arr = await this.searchCityByValue(value);
      if (arr.length) {
        // this.form.destCity = arr[0].value
        this.form.destCode = arr[0].sort;
      }
      cb(arr);
    },
    //封装一个查找城市的函数
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
            value: value.name.replace("市", "")
          };
        });
        let citysList = citys.filter(item => item.sort);
        return citysList;
      });
    },

    // 出发城市下拉选择时触发
    handleDepartSelect(item) {
      // console.log(item);
      this.form.departCode = item.sort;
    },

    // 目标城市下拉选择时触发
    handleDestSelect(item) {
      this.form.destCode = item.sort;
    },

    // 确认选择日期时触发
    handleDate(value) {
      this.form.departDate = moment(value).format("YYYY-MM-DD");
    },

    // 触发和目标城市切换时触发
    handleReverse() {
      let { departCity, departCode, destCity, destCode } = this.form;
      this.form.departCity = destCity;
      this.form.destCity = departCity;
      this.form.destCode = departCode;
      this.form.departCode = destCode;
    },

    // 提交表单是触发
    async handleSubmit() {
      let rules = {
        departCity: {
          value: this.form.departCity,
          message: "请输入出发城市",
          cityFalse: "暂不支持此城市"
        },
        destCity: {
          value: this.form.destCity,
          message: "请输入到达城市",
          cityFalse: "暂不支持此城市"
        },
        departDate: {
          value: this.form.departDate,
          message: "请选择要出发的时间"
        }
      };
      //定义一个变量，当有任意一项没有值得时候，使其的值为false
      let flag = true;
      Object.keys(rules).forEach(value => {
        //当flag为false时，直接跳出
        if (!flag) return;
        let item = rules[value];
        if (!item.value) {
          flag = false;
          this.$confirm(item.message, "提示", {
            confirmButtonText: "确定",
            showCancelButton: false,
            type: "warning"
          });
        }
      });
      if (!flag) return;
      this.$router.push({
        path: "air/flights",
        query: this.form
      });
      this.$store.commit("history/pushHistory", this.form);
    }
  },
  mounted() {}
};
</script>

<style scoped lang="less">
.box {
  height: 500px;
  background: url("../../assets/images/机票背景.jpg") center center no-repeat;
  display: flex;
  justify-content: center;
  .search-form {
    border: 1px #ddd solid;
    border-top: none;
    width: 600px;
    height: 350px;
    box-sizing: border-box;
    background-color: #f4f4f4;
    margin-top: 70px;
  }

  .search-tab {
    span {
      display: block;
      flex: 1;
      text-align: center;
      height: 48px;
      line-height: 42px;
      box-sizing: border-box;
      border-top: 3px #eee solid;
      background: #eee;
      cursor: pointer;
    }

    .active {
      // border-top-color: orange;
      background: #fff;
    }

    i {
      margin-right: 5px;
      font-size: 18px;

      &:first-child {
        font-size: 16px;
      }
    }
  }

  .search-form-content {
    padding: 15px 50px 15px 15px;
    position: relative;
    .el-from-item {
      color: black;
      .el-autocomplete {
        width: 453px !important;
      }
    }
  }
  .el-autocomplete {
    width: 453px !important;
  }
  .el-button {
    background-color: #2064c8 !important;
    border-color: #2064c8 !important;
  }
  // .el-input {
  //   width: 453px;
  // }
  .reverse {
    position: absolute;
    top: 35px;
    right: 15px;

    &:after,
    &:before {
      display: block;
      content: "";
      position: absolute;
      left: -35px;
      width: 25px;
      height: 1px;
      background: #ccc;
    }

    &:after {
      top: 0;
    }

    &:before {
      top: 60px;
    }

    span {
      display: block;
      position: absolute;
      top: 20px;
      right: 0;
      font-size: 12px;
      background: #999;
      color: #fff;
      width: 20px;
      height: 20px;
      line-height: 18px;
      text-align: center;
      border-radius: 2px;
      cursor: pointer;

      &:after,
      &:before {
        display: block;
        content: "";
        position: absolute;
        left: 10px;
        width: 1px;
        height: 20px;
        background: #ccc;
      }

      &:after {
        top: -20px;
      }

      &:before {
        top: 20px;
      }
    }
  }
}
</style>
