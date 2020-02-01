<template>
  <!-- 酒店详情 -->
  <div class="hotelDetails">
    <!-- 酒店介绍 -->
    <div class="hotelIntroduction">
      <HotelIntroduction :data="data" />
    </div>
    <!-- 酒店价格来源 -->
    <div class="hotelPrice">
      <HotelPrice :data="data" />
    </div>
    <div class="map">
      <Map :data="data"></Map>
    </div>
    <!-- 酒店基本信息 -->
    <div class="hotelInfo">
      <el-row class="basicInfo Infos">
        <el-col :span="4" class="title">基本信息</el-col>
        <el-col :span="20" class="right">
          <el-row>
            <el-col :span="6">入住时间:14:00之后</el-col>
            <el-col :span="6">离店时间:12:00之前</el-col>
            <el-col :span="6" v-if="data.creation_time=='null'">2013年开业 /2017年装修</el-col>
            <el-col :span="6" v-else>{{ data.creation_time }} /{{ data.renovat_time }}</el-col>
            <el-col :span="6">酒店规模:{{data.roomCount}}间客房</el-col>
          </el-row>
        </el-col>
      </el-row>
      <el-row class="measure Infos">
        <el-col :span="4" class="title">主要措施</el-col>
        <el-col :span="20" class="right">
          <el-row v-if="data.hotelassets.length">
            <span v-for="(item,index) in data.hotelassets" :key="index">{{item.name}}</span>
          </el-row>
          <el-row v-else>-</el-row>
        </el-col>
      </el-row>
      <el-row class="parkServe Infos">
        <el-col :span="4" class="title">停车服务</el-col>
        <el-col :span="20" class="right">
          <el-row v-if="data.parking">{{data.parking}}</el-row>
          <el-row v-else>-</el-row>
        </el-col>
      </el-row>
      <el-row class="brandInfo Infos">
        <el-col :span="4" class="title">品牌信息</el-col>
        <el-col :span="20" class="right">
          <el-row v-if="data.hotelbrand">{{data.hotelbrand.name}}</el-row>
          <el-row v-else>-</el-row>
        </el-col>
      </el-row>
    </div>
    <!-- 酒店服务信息 -->
    <div class="hotelService">
      <!-- 评论数 -->
      <div class="hotelReviews">{{data.all_remarks}}条真实用户评论</div>
      <div class="infoReviews">
        <el-row>
          <el-col :span="4">
            <div class="grid-content bg-purple">
              <p>总评数：{{data.all_remarks}}</p>
              <p>好评数：{{data.good_remarks}}</p>
              <p>差评数：{{data.bad_remarks}}</p>
            </div>
          </el-col>
          <el-col :span="6">
            <!-- infoStar评分 -->
            <div class="grid-content bg-purple-light infoStar">
              <el-rate
                class="stars"
                v-model="value"
                disabled
                show-score
                text-color="#ff9900"
                score-template="{value}"
              ></el-rate>
              <div class="recommend">推荐</div>
            </div>
          </el-col>
          <!-- 进度条 -->
          <el-col :span="14">
            <!-- 评分 -->
            <el-col :span="5">
              <div class="score">
                <el-progress
                  type="circle"
                  :percentage="data.scores.environment*10 || 70"
                  status="warning"
                  :width="80"
                  :stroke-width="2"
                  :show-text="false"
                ></el-progress>
                <div class="text">
                  <p>环境</p>
                  <p>{{data.scores.environment||7}}</p>
                </div>
              </div>
            </el-col>
            <el-col :span="5">
              <div class="score">
                <el-progress
                  type="circle"
                  :percentage="data.scores.product*10 || 70"
                  status="warning"
                  :width="80"
                  :stroke-width="2"
                  :show-text="false"
                ></el-progress>
                <div class="text">
                  <p>产品</p>
                  <p>{{data.scores.product||7}}</p>
                </div>
              </div>
            </el-col>
            <el-col :span="5">
              <div class="score">
                <el-progress
                  type="circle"
                  :percentage="data.scores.service*10 || 70"
                  status="warning"
                  :width="80"
                  :stroke-width="2"
                  :show-text="false"
                ></el-progress>
                <div class="text">
                  <p>服务</p>
                  <p>{{data.scores.service||7}}</p>
                </div>
              </div>
            </el-col>
          </el-col>
        </el-row>
      </div>
    </div>
  </div>
</template>

<script>
import HotelIntroduction from "@/components/hotel/hotelIntroduction.vue"; //酒店介绍子组件
import HotelPrice from "@/components/hotel/hotelPrice.vue"; //酒店价格来源
import Map from "@/components/hotel/map.vue";
export default {
  components: {
    HotelIntroduction,
    HotelPrice,
    Map
  },
  data() {
    return {
      value: 0, //传入的评分值
      data: {
        scores: {},
        hotelassets: []
      }
    };
  },
  mounted() {
    this.$axios({
      url: "hotels",
      params: {
        id: this.$route.query.id
      }
    }).then(res => {
      this.data = res.data.data[0];
      this.value = this.data.stars;
    });
  }
};
</script>

<style lang="less" scoped>
.hotelDetails {
  width: 1000px;
  margin: 0 auto;
  .hotelPrice {
    margin-bottom: 30px;
  }
  .hotelInfo {
    cursor: pointer;
    margin-top: 40px;
    color: #666;
    font-size: 14px;
    .el-row {
      margin-bottom: 20px;
    }
    .measure {
      span {
        margin-right: 5px;
        background: #eee;
        padding: 5px 10px;
        border-radius: 5px;
      }
    }
    .Infos {
      border-bottom: 1px solid #eee;
      .title {
        color: #000;
      }
    }
  }
  .hotelService {
    margin: 30px 0;
    font-weight: bold;
    .hotelReviews {
      margin-bottom: 20px;
    }
    .infoReviews {
      font-weight: normal;
    }
    //用户infoStar评分
    .infoStar {
      position: relative;
      margin-top: 20px;
      /deep/.el-rate__icon {
        font-size: 23px !important;
        margin-right: -1px !important;
      } //推荐
      .recommend {
        position: absolute;
        top: -21px;
        left: 20px;
        width: 70px;
        height: 70px;
        line-height: 70px;
        border-radius: 50%;
        border: 2px solid #ffaa33;
        opacity: 0.35; //透明度
        text-align: center;
        font-size: 25px;
        color: #ffaa33;
        transform: rotate(-30deg); //逆时针旋转30度
      }
    }
    //环境评分
    .score {
      position: relative;
      .text {
        position: absolute;
        top: 17px;
        left: 20px;
        display: block;
        p {
          color: #f90;
          text-align: center;
          font-size: 18px;
        }
      }
    }
  }
}
</style>