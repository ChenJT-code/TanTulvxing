<template>
  <div class="container">
    <el-row type="flex" justify="space-between">
      <!-- 订单表单 -->
      <div class="main">
        <orderForm :data="orderData" @sendAllPrice="getPrice"></orderForm>
      </div>

      <!-- 侧边栏 -->
      <div class="aside">
        <orderAside :data="orderData" :sendPrice='allPrice'/>
      </div>
    </el-row>
  </div>
</template>

<script>
import orderForm from "@/components/air/orderForm.vue";
import orderAside from "@/components/air/orderAside.vue";
export default {
  data() {
    return {
      orderData: {
        seat_infos: {}
      },
      allPrice:{},
    };
  },
  components: {
    orderForm,
    orderAside
  },
  methods: {
    getPrice(data) {
    //   console.log(data);
      this.allPrice = data
    }
  },
  mounted() {
    const { query } = this.$route;
    this.$axios({
      url: `/airs/${query.id}`,
      params: {
        seat_xid: query.seat_xid
      }
    }).then(res => {
      console.log(res);
      this.orderData = res.data;
    });
  }
};
</script>

<style lang="less" scoped>
.container {
  width: 1000px;
  margin: 20px auto;
}

/*aside*/
.aside {
  width: 350px;
  height: fit-content;
  border: 1px #ddd solid;
}
</style>