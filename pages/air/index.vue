<template>
  <!-- <section class="container"> -->
    <!-- <h2 class="air-title">
      <span class="iconfont iconfeiji"></span>
      <i>国内机票</i>
    </h2> -->

    <!-- 搜索广告栏 -->
    <!-- <el-row type="flex" justify="space-between"> -->
      <!-- 搜索表单 -->
      <div class="abc">
      <searchForm />
      </div>

      <!-- banner广告 -->
      <!-- <div class="sale-banner">
        <img src="http://157.122.54.189:9093/images/pic_sale.jpeg" />
      </div> -->
    <!-- </el-row> -->

    <!-- 广告 -->
    <!-- <el-row type="flex" class="statement">
      <el-col :span="8">
        <i class="iconfont iconweibiaoti-_huabanfuben" style="color:#409EFF;"></i>
        <span>100%航协认证</span>
      </el-col>
      <el-col :span="8">
        <i class="iconfont iconbaozheng" style="color:green;"></i>
        <span>出行保证</span>
      </el-col>
      <el-col :span="8">
        <i class="iconfont icondianhua" style="color:#409EFF;"></i>
        <span>7x24小时服务</span>
      </el-col>
    </el-row> -->

    <!-- <h2 class="air-sale-title">
      <span class="iconfont icontejiajipiao"></span>
      <i>特价机票</i>
    </h2> -->

    <!-- 特价机票 -->
    <!-- <div class="air-sale">
      <el-row type="flex" class="air-sale-pic" justify="space-between">
        <el-col :span="6" v-for="(item, index) in sales" :key="index">
          <nuxt-link
            :to="`/air/flights?departCity=${item.departCity}&departCode=${item.departCode}&destCity=${item.destCity}&destCode=${item.destCode}&departDate=${item.departDate}`"
          >
            <img :src="item.cover" />
            <el-row class="layer-bar" type="flex" justify="space-between">
              <span>{{item.departCity}}-{{item.destCity}}</span>
              <span>￥699</span>
            </el-row>
          </nuxt-link>
        </el-col>
      </el-row>
    </div> -->
  <!-- </section> -->
</template>

<script>
import searchForm from "@/components/air/searchForm";
export default {
  data(){
    return{
      sales:[]
    }
  },
  components: {
    searchForm
  },

  mounted() {
    this.$axios({
      url:'/airs/sale'
    }).then(res=>{
      // console.log(res);
      this.sales = res.data.data
    })
  },
};
</script>

<style scoped lang="less">

</style>