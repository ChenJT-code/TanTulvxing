<template>
  <div class="hotelIntroducton">
    <!-- 酒店介绍 -->
    <el-row>
      <!-- 酒店title部分 -->
      <div class="hotel_title">
        <el-col :span="24">
          <!-- 面包屑导航 -->
          <div class="grid-content breadcrumb">
            <span v-for="(item,index) in bread" :key="index">
              <span>
                <a href="/hotel">{{item}}</a>
              </span>
              <i class="el-icon-arrow-right" v-if="bread.length!=index+1"></i>
            </span>
          </div>
          <!-- 酒店信息 -->
          <div class="hotel_information">
            <div class="hotel_name">
              <h2>
                {{data.name}}
                <span class="star" v-if="data.hotellevel">
                  <i
                    style="color: #f90"
                    class="iconfont iconhuangguan"
                    v-for="one in data.hotellevel.level"
                    :key="one"
                  ></i>
                </span>
              </h2>
            </div>
            <div class="hotel_py_name">
              <span>{{data.alias}}</span>
            </div>
            <div class="hotel_address">
              <i class="iconfont iconlocation"></i>
              <span>{{data.address}}</span>
            </div>
          </div>
        </el-col>
      </div>

      <!-- 酒店图片展示部分 -->
      <div class="hotel_image">
        <el-col :span="16">
          <img :src="startImg" ref="bigImg" alt class="image_left" />
        </el-col>
        <el-col :span="8">
          <div class="image_right">
            <div
              class="image_min"
              v-for="(item,index) in imgList"
              :key="index"
              @click="handleclick(index)"
            >
              <a href="javascript:void(0)">
                <img :src="item" />
              </a>
            </div>
          </div>
        </el-col>
      </div>
    </el-row>
  </div>
</template>

<script>
export default {
  data() {
    return {
      bread: "",
      startImg: "",
      imgList: [
        "http://image.qmango.com/hotelimg/dl1210/76236/100.jpeg",
        "http://image.wangchao.net.cn/lvyou/1244379864111.jpg",
        "http://www.xiujukoo.com/upimg/allimg/170615/0206500.jpg",
        "http://www.xiujukoo.com/upimg/allimg/160323/0319301.jpg",
        "http://img.zx123.cn/Resources/zx123cn/uploadfile/2016/0811/32263c1e92f31c96fba96fa3745316a3.jpg",
        "http://image.qmango.com/hotelimg/dl1210/119297/793.jpeg"
      ]
    };
  },
  props: ["data"],
  watch: {
    data() {
      this.bread = this.data.breadcrumb.split(">");
    }
  },
  mounted() {
    this.startImg = this.imgList[0];
  },
  methods: {
    handleclick(index) {
      this.startImg = this.imgList[index];
    }
  }
};
</script>

<style lang="less" scoped>
.hotelDetails {
  width: 1000px;
  margin: 0 auto;
  .el-row {
    margin: 20px 0px;
  }
  //面包屑
  .breadcrumb {
    span {
      font-weight: bold;
      cursor: pointer;
      &:last-child {
        font-weight: normal;
        color: #666;
      }
      a:hover {
        color: rgb(39, 39, 202);
      }
    }
  }
  //酒店信息
  .hotel_information {
    margin: 15px 0;
    font-size: 14px;
    color: #666;
    .hotel_name {
      h2 {
        font-weight: 450;
        color: #333;
        font-size: 24px;
        .star {
          color: #f90;
        }
      }
    }
  }
  //酒店图片展示部分
  .hotel_image {
    .image_left {
      margin: 25px 0 !important;
      width: 640px;
      height: 360px;
      display: block;
      // background: rgb(150, 70, 70);
    }
    .image_right {
      margin: 25px 0 !important;
      width: 340px;
      height: 360px;
      // background: green;
      display: flex;
      flex-wrap: wrap;
      .image_min {
        padding-bottom: 15px;
        &:nth-child(2n-1) {
          margin-right: 15px;
        }
        a {
          width: 160px;
          height: 110px;
          display: block;
          img {
            width: 100%;
            height: 100%;
          }
        }
      }
    }
  }
}
</style>