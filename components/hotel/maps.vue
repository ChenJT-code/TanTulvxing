<template>
  <div class="maps">
    <div class="content">
      <div class="area">
        <div class="areaLeft">区域：</div>
        <div class="areaRight">
          <div class="links" :class="{higths:higth}">
            <a href="javascript:;" style="background-color: #eee;color:#999;padding:0px 1px;border-radius:3px;">全部</a>
             <el-link href="#" v-for="(item, index) in attractions[0].scenics" :key="index" style="margin-bottom:3px;">{{item.name}}</el-link>
            <!-- <a href="javascript:;" v-for="(item, index) in attractions[0].scenics" :key="index">{{item.name}}</a>  -->
          </div>
          <div class="hid">
            <i data-v-d0475a26 class="el-icon-d-arrow-right" v-if="!higth"></i>
            <i data-v-d0475a26 class="el-icon-d-arrow-right" v-else style="transform: rotate(270deg);"></i>
            <a href="javascript:;" @click="hiddenChange">等43个区域</a>
          </div>
        </div>
      </div>
      <div class="strategy">
        <div class="strLeft">攻略：</div>
        <div class="strRight">
          <span>北京，你想要的都能在这找到。博古通今，兼容并蓄，天下一城，如是帝都。 景点以故宫为中心向四处辐射；地铁便宜通畅，而且覆盖绝大多数景点。 由于早上有天安门升旗仪式，所以大多数人选择在天安门附近住宿。</span>
        </div>
      </div>
      <div class="avPrice">
        <div class="avLeft">
          <span>
            均价
            <el-tooltip
              class="item"
              effect="dark"
              content="等级均价由平日价格计算得出，节假日价格会有上浮。"
              placement="top"
              :visible-arrow='false'
            >
              <i class="el-icon-question"></i>
            </el-tooltip>：
          </span>
        </div>
        <div class="avRigth">
          <div class="crown1" v-show="threeStarAVG">
            <el-tooltip
              class="item"
              effect="dark"
              content="等级评定是针对房价，设施和服务等各方面水平的综合评估。"
              placement="bottom"
              :visible-arrow='false'
            >
            <span>
              <i class="iconfont iconhuangguan"></i>
              <i class="iconfont iconhuangguan"></i>
              <i class="iconfont iconhuangguan"></i>
            </span>
            </el-tooltip>
            <span>￥{{threeStarAVG}}</span>
          </div>
          <div class="crown2" v-show="fourStarAVG">
            <el-tooltip
              class="item"
              effect="dark"
              content="等级评定是针对房价，设施和服务等各方面水平的综合评估。"
              placement="bottom"
              :visible-arrow='false'
            >
            <span>
              <i class="iconfont iconhuangguan"></i>
              <i class="iconfont iconhuangguan"></i>
              <i class="iconfont iconhuangguan"></i>
              <i class="iconfont iconhuangguan"></i>
            </span>
            </el-tooltip>
            <span>￥{{fourStarAVG}}</span>
          </div>
          <div class="crown3" v-show="fiveStarAVG">
            <el-tooltip
              class="item"
              effect="dark"
              content="等级评定是针对房价，设施和服务等各方面水平的综合评估。"
              placement="bottom"
              :visible-arrow='false'
            >
            <span>
              <i class="iconfont iconhuangguan"></i>
              <i class="iconfont iconhuangguan"></i>
              <i class="iconfont iconhuangguan"></i>
              <i class="iconfont iconhuangguan"></i>
              <i class="iconfont iconhuangguan"></i>
            </span>
            </el-tooltip>
            <span>￥{{fiveStarAVG}}</span>
          </div>
        </div>
      </div>
    </div>
    <div class="map"></div>
  </div>
</template>

<script>
export default {
  props:['attractions','allHotelData'],
  data() {
    return {
      higth: false,
      threeStarAVG:'',
      fourStarAVG:'',
      fiveStarAVG:'',
      // attractions:[]
    };
  },
  methods: {
    hiddenChange() {
      this.higth = !this.higth
    }
  },
  watch: {
    allHotelData(){
      var threeStar = 0
      var threeNum = 0
      var fourStar = 0
      var fourNum = 0
      var fiveStar = 0
      var fiveNum = 0
      this.allHotelData.data.forEach((item,index)=>{
        if(item.stars<4&&item.stars>=3){
          threeStar += item.price
          threeNum++
        }
        if(item.stars<5&&item.stars>=4){
          fourStar += item.price
          fourNum++
        }
        if(item.stars>=5){
          fiveStar += item.price
          fiveNum++
        }
      })
      this.threeStarAVG = Math.floor(threeStar/threeNum)
      this.fourStarAVG = Math.floor(fourStar/fourNum)
      this.fiveStarAVG = Math.floor(fiveStar/fiveNum)
    }
  },
};
</script>

<style lang='less' scoped>
.maps {
  width: 1000px;
  margin: 0 auto;
  .content {
    font-size: 14px;
    color: #666;
    width: 550px;
    height: 260px;
    .area {
      margin-bottom: 20px;
      display: flex;
      .areaLeft {
        width: 50px !important;
      }
      .areaRight {
        // height: 38px;
        flex: 1;
        .links {
          height: 45px;
          overflow: hidden;
          a {
            display: inline-block;
            margin: 0 6px;
          }
        }
        .higths {
          height: 140px;
        }
      }
      .hid {
        .el-icon-d-arrow-right {
          transform: rotate(-270deg);
          color: orange;
        }
      }
    }
    .strategy {
      display: flex;
      .strRight {
        flex: 1;
      }
      .strLeft {
        width: 50px;
      }
    }
  }
  .avPrice {
    display: flex;
    margin-top: 20px;
    //   width: 110px;
    .avLeft {
      margin-right: 10px;
      span {
        .el-icon-question {
          color: #999;
        }
      }
    }
    .avRigth {
      display: flex;
      flex: 1;
      font-size: 12px;
      .crown1,
      .crown2,
      .crown3 {
        margin-right: 15px;
        i {
          color: orange;
        }
      }
    }
  }
}
</style>