<template>
  <div class="hotel main">
    <!-- 面包屑导航 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/hotel' }">酒店</el-breadcrumb-item>
      <el-breadcrumb-item>南京市酒店预订</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 酒店查询 -->
    <el-form @keyup.enter="lookPrice">
      <el-form-item>
        <!-- 目的地 -->
        <el-autocomplete
          v-model="City"
          :fetch-suggestions="querySearchCitys"
          placeholder="目的地"
          @select="chooseCity"
          :trigger-on-focus="false"
        ></el-autocomplete>
        <!-- 入住时间和离开时间 -->
        <el-date-picker
          v-model="time"
          type="daterange"
          :clearable="false"
          range-separator="至"
          start-placeholder="入住时间"
          end-placeholder="离店时间"
          @change="chooseData"
        ></el-date-picker>
        <!-- 入住人员 -->
        <div @click="peopleshow=!peopleshow" style="display:inline-block">
          <el-input
            placeholder="人数未定"
            suffix-icon="el-input__icon iconfont iconuser"
            v-model="manyPeople"
            style="width:215px; position: relative;"
            :readonly="true"
          ></el-input>
        </div>
        <el-card class="box-card choosePeople" v-show="peopleshow">
          <el-row class="choose">
            <el-col :span="8">每间</el-col>
            <el-col :span="8" style="padding:0px 5px" class="peopleChoose">
              <el-select v-model="bigPeople" placeholder size="mini">
                <el-option
                  v-for="item in [1,2,3,4,5]"
                  :key="item"
                  :label="item"
                  :value="item"
                >{{item}}</el-option>
              </el-select>
              <span>成人</span>
            </el-col>
            <el-col :span="8" style="padding:0px 5px" class="peopleChoose">
              <el-select v-model="children" placeholder size="mini">
                <el-option
                  v-for="item in [0,1,2,3]"
                  :key="item"
                  :label="item"
                  :value="item"
                >{{item}}</el-option>
              </el-select>
              <span>儿童</span>
            </el-col>
          </el-row>
          <el-button type="primary" class="chooseBtn" size="mini" @click="choosePeople">确认</el-button>
        </el-card>
        <el-button type="primary" @click="lookPrice">查询酒店</el-button>
      </el-form-item>
    </el-form>
    <!-- 酒店详情和地图 -->
    <div class="hotelDetail">
      <el-row>
        <el-col :span="14">
          <Maps :attractions="attractions" :allHotelData="allHotelData"></Maps>
        </el-col>
        <el-col :span="10">
          <Amap :mapData="hotelList" v-if="mapShow"></Amap>
        </el-col>
      </el-row>
    </div>
    <!-- 酒店筛选 -->
    <screening :hotelData="hotelData" @sendLevel="getLevel"></screening>
    <!-- 酒店列表 -->
    <div v-show="showABC">
      <div v-if="allHotelData.data.length">
        <Show v-for="(item,index) in hotelList" :key="index" :data="item"></Show>
      </div>
      <div v-else style="text-align: center;">
        <h2>暂无酒店数据</h2>
      </div>
      <!-- 分页器 -->
      <el-pagination
        layout="prev, pager, next"
        :total="allHotelData.total"
        prev-text="< 上一页"
        next-text="下一页 >"
        @current-change="changePage"
      ></el-pagination>
    </div>
  </div>
</template>

<script>
import moment from "moment";
import screening from "@/components/hotel/screening.vue";
import Amap from "@/components/hotel/amap.vue";
import Show from "@/components/hotel/show.vue";
import Maps from "@/components/hotel/maps.vue";
export default {
  data() {
    return {
      mapShow: true,
      xxxxx: false,
      showABC: false,
      hotelData: {}, //酒店分类数据
      peopleshow: false, //显示与隐藏选择人数框
      City: "南京",
      time: "",
      bigPeople: "",
      children: "",
      manyPeople:'',
      searchHotel: {
        city: "74", //目的地地址
        enterTime: "", //选择住店时间
        leftTime: "", //和离店时间
        _limit: 55,
        _start: 1
      },
      hotelList: [{ location: {} }], //查看价格之后的结果
      // 分页需要的数据
      changeHotelList: {
        _limit: 55,
        _start: 1,
        city: 74
      },
      attractions: [
        {
          scenics: []
        }
      ],
      //全部酒店数据
      allHotelData: {
        data: []
      },
      obj: {}
    };
  },
  methods: {
    //确认入住人数
    choosePeople() {
      this.peopleshow = !this.peopleshow;
      // console.log(this.bigPeople);
      // console.log(this.children);
      var str = "";
      if (this.bigPeople > 0) {
        str += this.bigPeople + "成人 ";
      }
      if (this.children > 0) {
        str += this.children + "儿童";
      }
      this.manyPeople = str;
    },
    //筛选酒店
    getLevel(data) {
      this.obj = data;
      var str = `/hotels?city=${this.searchHotel.city}&_limit=55`;
      str += "&price_lt=" + this.obj.price;
      if (this.obj.level.length) {
        this.obj.level.forEach((item, index) => {
          str += "&hotellevel_in=" + item;
        });
      }
      if (this.obj.type.length) {
        this.obj.type.forEach((item, index) => {
          str += "&hoteltype_in=" + item;
        });
      }
      if (this.obj.asset.length) {
        this.obj.asset.forEach((item, index) => {
          str += "&hotelasset_in=" + item;
        });
      }
      if (this.obj.brand.length) {
        this.obj.brand.forEach((item, index) => {
          str += "&hotelbrand_in=" + item;
        });
      }
      this.$axios({
        url: str
      }).then(res => {
        // console.log(res);
        this.allHotelData = res.data;
        if(!this.allHotelData.data.length<=0){
          this.hotelList = this.allHotelData.data.slice(0, 10);
        }
      });
      if(this.allHotelData.data.length<=0){
      }else{
        this.refreshMap();
      }
    },
    //实时刷新地图
    refreshMap() {
      this.mapShow = false;
      this.$nextTick(() => {
        this.mapShow = true;
      });
    },
    //当页码发生改变
    changePage(value) {
      var start = (value - 1) * 10;
      var end = value * 10;
      this.hotelList = this.allHotelData.data.slice(start, end);
      // console.log(this.hotelList);
      this.refreshMap();
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
    //返回输入建议的方法
    async querySearchCitys(value, cd) {
      let arr = await this.searchCityByValue(value);
      // console.log(arr);
      if (arr.length > 0) {
        this.searchHotel.city = arr[0].id;
      }
      cd(arr);
    },
    //选中日期
    chooseData(value) {
      this.searchHotel.enterTime = moment(value[0]).format("YYYY-MM-DD");
      this.searchHotel.leftTime = moment(value[1]).format("YYYY-MM-DD");
    },
    //选择城市
    chooseCity(item) {
      this.searchHotel.city = item.id;
    },
    //查看价格
    lookPrice() {
      // console.log(this.searchHotel);
      this.$axios({
        url: "/hotels",
        params: this.searchHotel
      }).then(res => {
        this.allHotelData = res.data;
        if(!this.allHotelData.data.length<=0){
          this.hotelList = this.allHotelData.data.slice(0, 10);
          this.refreshMap();
        }else{
          this.hotelList=[]
        }
      });
    },
    //获取酒店数据
    getHotelData() {
      this.$axios({
        url: "/hotels",
        params: this.changeHotelList
      }).then(res => {
        this.showABC = true;
        // console.log(res);
        this.allHotelData = res.data;
        // console.log(this.allHotelData);
        if(!this.allHotelData.data.length<=0){
          this.hotelList = this.allHotelData.data.slice(0, 10);
        }else{
          this.hotelList=[]
        }
      });
    }
  },
  components: {
    screening,
    Amap,
    Show,
    Maps
  },
  mounted() {
    this.$axios({
      url: "/cities",
      params: { name: "南京" }
    }).then(res => {
      // console.log(res);
      this.attractions = res.data.data;
    });
    this.$axios({
      url: "/hotels/options"
    }).then(res => {
      // console.log(res);
      this.hotelData = res.data.data;
    });
    this.getHotelData();
  }
};
</script>



<style lang='less' scoped>
.main {
  width: 1000px;
  margin: 0px auto;
  .el-breadcrumb {
    padding: 20px 0px;
    /deep/.el-breadcrumb__inner {
      color: #666;
      font-weight: 400;
    }
  }
  .el-autocomplete {
    margin-right: 11px;
  }
  .choosePeople {
    width: 320px;
    height: 120px;
    background-color: #fff;
    position: absolute;
    right: 107px;
    top: 50px;
    z-index: 999;
    .choose {
      padding-bottom: 15px;
      border-bottom: 1px solid #ccc;
    }
    .chooseBtn {
      float: right;
      margin-top: 10px;
    }
  }
  .el-button {
    margin-left: 10px;
    background-color: #2064c8;
  }
  /deep/.el-card__body {
    padding: 10px;
  }
  /deep/.el-pagination {
    text-align: right;
    margin: 15px 0px 30px 0px;
    button {
      padding: 0px;
      span {
        display: inline-block;
        width: 88px;
        height: 28px;
        line-height: 28px;
        text-align: center;
        border: 1px solid #dcdfe6;
        border-radius: 3px;
      }
    }
    .el-pager {
      li {
        min-width: 20.5px;
        font-size: 14px;
        font-weight: 400;
      }
    }
  }
  #map {
    width: 420px;
    height: 260px;
  }
  .peopleChoose {
    position: relative;
    span {
      cursor: pointer;
      position: absolute;
      top: 0px;
      right: 40px;
      font-size: 10px;
    }
  }
}
</style>