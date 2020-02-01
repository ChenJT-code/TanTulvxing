<template>
  <div class="infoHotelShow">
    <!-- 酒店图片 -->
    <div class="hotelImage">
      <a :href="`/hotel/hotelDetails?id=${data.id}`">
        <img :src="data.photos" alt />
      </a>
    </div>
    <!-- 图片右边部分 -->
    <div class="infoShow">
      <!-- 中间展示信息部分 -->
      <div class="textShow">
        <!-- 酒店名称 -->
        <a :href="`/hotel/hotelDetails?id=${data.id}`">
          <h4>{{data.name}}</h4>
        </a>
        <!-- 英语名称星级类型 -->
        <div class="hotelDescribe">
          <!-- 英文名称 -->
          <span
            class="englishName"
          >{{data.alias}}</span>  
                    <!-- 星星等级 -->
          <span class="starGrade" v-if="data.hotellevel">
            <i style="color: #f90" class="iconfont iconhuangguan" v-for="one in data.hotellevel.level" 
            :key="one">
            </i>
          </span>
          <!-- 酒店类型 -->
          <span class="hotelType">{{data.hoteltype.name}}</span>
        </div>
        <!-- 客户评价信息  评价星星游记 -->
        <div class="evaluateInfo">
          <!-- 评价星星 -->
          <div class="evaluateStar">
            <el-rate
              v-model="data.stars"
              disabled
              show-score
              text-color="#ff9900"
              :score-template="data.stars+'分'"
            ></el-rate>
          </div>
          <!-- 用户评价 -->
          <div class="userEvaluate">
            <span style="color: #f90;">{{data.all_remarks}}</span>
            <span>条评价</span>
          </div>
          <!-- 游记 -->
          <div class="travelNotes">
            <span style="color: #f90;">{{data.common_remarks}}</span>
            <span>篇游记</span>
          </div>
        </div>
        <!-- 酒店位置 -->
        <div class="hotelLocation">
          <i class="iconfont iconlocation"></i>
          <span>位于: {{data.address}}</span>
        </div>
      </div>

      <!-- 右边链接跳转部分 品牌价格 -->
      <div class="brandPriceShow">
        <a href="#" class="brandPrice" v-for="(item,index) in data.products" :key="index">
          <span class="brandname">{{item.name}}</span>
          <div class="priceBrand">
            <span style="color:#f90">￥{{item.price}}起</span>
            <i class="el-icon-arrow-right"></i>
          </div>
        </a>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props:['data'],
  data() {
    return {
			value: 3.5
    };
  }
};
</script>

<style scoped lang="less">
.infoHotelShow {
  // 版心1000px；
  // 后期引入可删除
  width: 1000px !important;
  margin: 0 auto 10px;

  display: flex;
  padding: 25px 0;
	height: 215px;
	border-bottom: 1px solid #eee;

  // 酒店图片
  .hotelImage {
    flex: 1;
    img {
      width: 98%;
      height: 98%;
    }
  }
  // 图片右边部分
  .infoShow {
    display: flex;
    flex: 2;
    // 中间展示信息部分
    .textShow {
      flex: 2;
      // 酒店名称
      padding-left: 12px;
      h4 {
        font-size: 24px;
        font-weight: 400;
      }
      // 英语名称星级类型
      .hotelDescribe {
        font-size: 16px;
				color: #999;
      }
      // 客户评价信息
      .evaluateInfo {
        display: flex;
        padding: 8px 0;
        // 评价星星
        .evaluateStar {
					// width: 50%;
					flex: 2;
        }
        // 用户评价
        .userEvaluate {
          flex: 1;
          // width: 25%;
        }
        // 游记
        .travelNotes {
          flex: 1;
          // width: 25%;
        }
      }
      // 酒店位置
      .hotelLocation {
        color: #666;
        font-size: 14px;
      }
    }
    // 左边链接跳转部分
    .brandPriceShow {
      flex: 1;
      // background-color: #ff0;
      .brandPrice {
        display: flex;
        padding: 15px 0;
        border-bottom: 1px solid #ebebf5;
        &:hover {
          background-color: #f5f7fa;
        }
        .brandname {
          flex: 1;
          padding: 0 10px;
          font-size: 14px;
          color: #606266;
        }
        .priceBrand {
          font-size: 16px;
          flex: 1;
        }
      }
    }
  }
}
</style>