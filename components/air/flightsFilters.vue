<template>
  <div class="filters">
    <el-row type="flex" class="filters-top" justify="space-between" align="middle">
      <el-col :span="8">
        单程：
        广州 - 上海
        /
        2019-06-17
      </el-col>
      <el-col :span="4">
        <el-select size="mini" v-model="airport" placeholder="起飞机场" @change="setFlightsData">
          <el-option
            :label="item"
            :value="item"
            v-for="(item,index) in flightsData.options.airport"
            :key="index"
          ></el-option>
        </el-select>
      </el-col>
      <el-col :span="4">
        <el-select size="mini" v-model="flightTimes" placeholder="起飞时间" @change="setFlightsData">
          <el-option
            :label="`${item.from}:00 - ${item.to}:00`"
            :value="`${item.from},${item.to}`"
            v-for="(item,index) in flightsData.options.flightTimes"
            :key="index"
          ></el-option>
        </el-select>
      </el-col>
      <el-col :span="4">
        <el-select size="mini" v-model="company" placeholder="航空公司" @change="setFlightsData">
          <el-option
            :label="item"
            :value="item"
            v-for="(item,index) in flightsData.options.company"
            :key="index"
          ></el-option>
        </el-select>
      </el-col>
      <el-col :span="4">
        <el-select size="mini" v-model="airSize" placeholder="机型" @change="setFlightsData">
          <el-option
            :label="item.size"
            :value="item.en"
            v-for="(item,index) in airSizeList"
            :key="index"
          ></el-option>
        </el-select>
      </el-col>
    </el-row>
    <div class="filter-cancel">
      筛选：
      <el-button type="primary" round plain size="mini" @click="handleFiltersCancel">撤销</el-button>
    </div>
  </div>
</template>

<script>
export default {
  props: ["flightsData"],
  data() {
    return {
      airport: "", // 机场
      flightTimes: "", // 出发时间
      company: "", // 航空公司
      airSize: "", // 机型大小
      airSizeList: [
        { size: "大", en: "L" },
        { size: "中", en: "M" },
        { size: "小", en: "S" }
      ]
    };
  },
  methods: {
    setFlightsData() {
      var newFlightsData = this.flightsData.flights;
      if (this.airport) {
        newFlightsData = this.handleAirport(newFlightsData);
      }
      if (this.company) {
        newFlightsData = this.handleCompany(newFlightsData);
      }
      if (this.flightTimes) {
        newFlightsData = this.handleFlightTimes(newFlightsData);
      }
      if (this.airSize) {
        newFlightsData = this.handleAirSize(newFlightsData);
      }
      this.$emit('setFlightsData',newFlightsData)
    },
    // 选择机场时候触发
    handleAirport(newFlightsData) {
      var newFlightsData = newFlightsData.filter(
        item => item.org_airport_name == this.airport
      );
      return newFlightsData;
    },

    // 选择出发时间时候触发
    handleFlightTimes(newFlightsData) {
        let start = +this.flightTimes.split(',')[0]
        let end = +this.flightTimes.split(',')[1]
        // console.log(start);
        // console.log(end);
        var newFlightsData  = newFlightsData.filter(item=>{
            return +item.dep_time.split(':')[0]>=start && +item.dep_time.split(':')[0]<end
        })
        return newFlightsData
    },

    // 选择航空公司时候触发
    handleCompany(newFlightsData) {
      var newFlightsData = newFlightsData.filter(
        item => item.airline_name == this.company
      );
      return newFlightsData;
    },

    // 选择机型时候触发
    handleAirSize(newFlightsData) {
      var newFlightsData = newFlightsData.filter(
        item => item.plane_size == this.airSize
      );
      return newFlightsData;
    },

    // 撤销条件时候触发
    handleFiltersCancel() {
     this.airport= ""; // 机场
     this.flightTimes= ""; // 出发时间
     this.company= ""; // 航空公司
     this.airSize= ""; // 机型大小
     this.setFlightsData()
    }
  }
};
</script>

<style scoped lang="less">
.filters {
  margin-bottom: 20px;
}

.filters-top {
  > div {
    /deep/ .el-select {
      margin-left: 10px;
    }
  }
}

.filter-cancel {
  margin-top: 10px;
}
</style>