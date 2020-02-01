<template>
  <section class="contianer">
    <el-row type="flex" justify="space-between">
      <!-- 顶部过滤列表 -->
      <div class="flights-content">
        <!-- 过滤条件 -->
        <flightsFilters :flightsData="newFlightsInfo" @setFlightsData="setFlightsData"></flightsFilters>

        <!-- 航班头部布局 -->
        <flightsHeadList></flightsHeadList>

        <!-- 航班信息 -->
        <div>
          <flightsItem v-for="(value,index) in dataList" :key="index" :data="value" />
          <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page.sync="pageIndex"
            :page-sizes="[5, 10, 20, 30]"
            :page-size="pageSize"
            layout="sizes, prev, pager, next"
            :total="flightsInfo.flights.length"
          ></el-pagination>
        </div>
      </div>

      <!-- 侧边栏 -->
      <div class="aside">
        <!-- 侧边栏组件 -->
        <flightsAside />
      </div>
    </el-row>
  </section>
</template>

<script>
import moment from "moment";
import flightsHeadList from "@/components/air/flightsHeadList.vue";
import flightsItem from "@/components/air/flightsItem.vue";
import flightsFilters from "@/components/air/flightsFilters.vue";
import flightsAside from "@/components/air/flightsAside.vue";
export default {
  data() {
    return {
      newFlightsInfo: {
        flights: [],
        info: {},
        options: {}
      },
      flightsInfo: {
        flights: [],
        info: {},
        options: {}
      },
      dataList: [],
      pageIndex: 1,
      pageSize: 5
    };
  },
  components: {
    flightsHeadList,
    flightsItem,
    flightsFilters,
    flightsAside
  },
  watch: {
    $route() {
      this.loadData()
    }
  },
  methods: {
    loadData() {
      this.$axios({
        url: "/airs",
        params: this.$route.query
      }).then(res => {
        // console.log(res);
        this.flightsInfo = res.data;
        this.getFlightsData();
        this.newFlightsInfo = { ...this.flightsInfo };
        // this.dataList = this.flightsInfo.flights;
      });
    },
    setFlightsData(data) {
      this.flightsInfo.flights = data;
      this.pageIndex = 1;
      this.getFlightsData();
    },
    //根据条件获取机票数据
    getFlightsData() {
      let start = (this.pageIndex - 1) * this.pageSize;
      let end = start + this.pageSize;
      this.dataList = this.flightsInfo.flights.slice(start, end);
    },
    //改变一页显示的机票的条数
    handleSizeChange(val) {
      this.pageSize = val;
      this.getFlightsData();
    },
    //页码发生改变触发的事件
    handleCurrentChange(val) {
      this.pageIndex = val;
      this.getFlightsData();
    }
  },
  mounted() {
    this.loadData()
  }
};
</script>

<style scoped lang="less">
.contianer {
  width: 1000px;
  margin: 20px auto;
}

.flights-content {
  width: 745px;
  font-size: 14px;
}
.el-pagination {
  display: inline;
}
.aside {
  width: 240px;
}
</style>