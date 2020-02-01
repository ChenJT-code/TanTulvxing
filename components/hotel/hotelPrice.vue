<template>
  <div class="hotelPrice">
    <!-- 酒店价格来源-->
    <div class="hotelSource">
      <el-table :data="data.products" style="width: 100%;cursor: pointer;">
        <el-table-column label="价格来源" width="420">
          <template slot-scope="scope">{{scope.row.name}}</template>
        </el-table-column>
        <el-table-column label="低价房型" width="420">
          <template slot-scope="scope">{{scope.row.bestType}}</template>
        </el-table-column>
        <el-table-column label="最近价格/每晚" width="160">
          <template slot-scope="scope">
            <div class="price_in hotel">
              <span>￥{{scope.row.price}}</span>
              <span>起</span>
              <i class="el-icon-arrow-right"></i>
            </div>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
export default {
  props: ["data"]
};
</script>

<style scoped lang="less">
.hotelPrice {
  .hotelSource {
    .price_in {
      color: #f90;
      font-size: 18px;
      span {
        margin-left: 2px;
        &:nth-child(2) {
          color: rgb(19, 8, 8);
          font-size: 14px;
        }
      }
    }
  }
}
</style>
