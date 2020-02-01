<template>
  <div class="screening">
    <div class="hotelPrice">
      <div class="top">
        <span>价格</span>
        <span>0-{{hotelInfo.priceNum}}</span>
      </div>
      <el-slider v-model="hotelInfo.priceNum" :max="4000" @change='changePrice'></el-slider>
    </div>
    <div class="hotelType">
      <div class="item">
        <p>住宿等级</p>
        <el-dropdown @command="chooseHotellevel">
          <span class="el-dropdown-link">
            {{hotelInfo.levelName}}
            <i class="el-icon-arrow-down el-icon--right"></i>
          </span>
          <el-dropdown-menu slot="dropdown" style="width:175px">
            <el-dropdown-item
              v-for="(value,index) in hotelData.levels"
              :key="index"
              :command="index"
            >
              <i class="iconfont iconcircle" v-if="!value.show"></i>
              <i class="iconfont iconright-1" v-else></i>
              {{value.name}}
            </el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </div>
      <div class="item">
        <p>住宿类型</p>
        <el-dropdown @command="chooseHoteltype">
          <span class="el-dropdown-link downMenu">
            {{hotelInfo.typeName}}
            <i class="el-icon-arrow-down el-icon--right"></i>
          </span>
          <el-dropdown-menu slot="dropdown" style="width:175px">
            <el-dropdown-item
              v-for="(value,index) in hotelData.types"
              :key="index"
              :command="index"
            >
              <i class="iconfont iconcircle" v-if="!value.show"></i>
              <i class="iconfont iconright-1" v-else></i>
              {{value.name}}
            </el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </div>
      <div class="item">
        <p>酒店设施</p>
        <el-dropdown @command="chooseHotelasset">
          <span class="el-dropdown-link">
            {{hotelInfo.assetName}}
            <i class="el-icon-arrow-down el-icon--right"></i>
          </span>
          <el-dropdown-menu slot="dropdown" style="width:175px">
            <el-dropdown-item
              v-for="(value,index) in hotelData.assets"
              :key="index"
              :command="index"
            >
              <i class="iconfont iconcircle" v-if="!value.show"></i>
              <i class="iconfont iconright-1" v-else></i>
              {{value.name}}
            </el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </div>
      <div class="item">
        <p>酒店品牌</p>
        <el-dropdown @command="chooseHotelbrand">
          <span class="el-dropdown-link">
            {{hotelInfo.brandName}}
            <i class="el-icon-arrow-down el-icon--right"></i>
          </span>
          <el-dropdown-menu slot="dropdown" style="max-height:230px; overflow: auto;width:175px">
            <el-dropdown-item
              v-for="(value,index) in hotelData.brands"
              :key="index"
              :command="index"
            >
              <i class="iconfont iconcircle" v-if="!value.show"></i>
              <i class="iconfont iconright-1" v-else></i>
              {{value.name}}
            </el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ["hotelData"],
  data() {
    return {
      hotelInfo: {
        priceNum: 4000,
        levelName: "不限",
        typeName: "不限",
        assetName: "不限",
        brandName: "不限"
      },
      level: [],
      type: [],
      asset: [],
      brand: [],
      price:4000,
      obj:{}
      //筛选条件
      // conditions: [{level: []},{type: []},{asset: []},{brand: []}]
    };
  },
  watch: {
    // conditions() {
    //   console.log(this.conditions);
    //   // this.$emit("sendLevel", level);
    // }
    level() {
      this.obj = {
        level: this.level,
        type: this.type,
        asset: this.asset,
        brand: this.brand,
        price: this.price
      };
      this.$emit("sendLevel", this.obj);
    },
    type() {
      this.obj = {
        level: this.level,
        type: this.type,
        asset: this.asset,
        brand: this.brand,
        price: this.price
      };
      this.$emit("sendLevel", this.obj);
    },
    asset() {
      this.obj = {
        level: this.level,
        type: this.type,
        asset: this.asset,
        brand: this.brand,
        price: this.price
      };
      this.$emit("sendLevel", this.obj);
    },
    brand() {
      this.obj = {
        level: this.level,
        type: this.type,
        asset: this.asset,
        brand: this.brand,
        price: this.price
      };
      this.$emit("sendLevel", this.obj);
    },
    price() {
      this.obj = {
        level: this.level,
        type: this.type,
        asset: this.asset,
        brand: this.brand,
        price: this.price
      };
      this.$emit("sendLevel", this.obj);
    }
  },
  methods: {
    //改变价格
    changePrice(value){
      if(value<50){
        this.$message.info('这已经是我们的最低价格了。。。')
        this.price = 50
        this.hotelInfo.priceNum = 50
      }else{
        this.price = value
      }
    },
    //选择酒店等级
    chooseHotellevel(id) {
      // console.log(id);
      // console.log(this.hotelData);
      this.hotelInfo.levelName = this.hotelChoose(
        this.hotelData.levels,
        id,
        this.hotelInfo.levelName
      );

      this.level = [];
      this.hotelData.levels.forEach((item, index) => {
        if (item.show) {
          this.level.push(item.id);
        }
      });
    },
    //选择酒店类型
    chooseHoteltype(id) {
      this.hotelInfo.typeName = this.hotelChoose(
        this.hotelData.types,
        id,
        this.hotelInfo.typeName
      );
      this.type = [];
      this.hotelData.types.forEach((item, index) => {
        if (item.show) {
          this.type.push(item.id);
        }
      });
    },
    //选择酒店设施
    chooseHotelasset(id) {
      this.hotelInfo.assetName = this.hotelChoose(
        this.hotelData.assets,
        id,
        this.hotelInfo.assetName
      );
      this.asset = [];
      this.hotelData.assets.forEach((item, index) => {
        if (item.show) {
          this.asset.push(item.id);
        }
      });
    },
    //选择酒店品牌
    chooseHotelbrand(id) {
      this.hotelInfo.brandName = this.hotelChoose(
        this.hotelData.brands,
        id,
        this.hotelInfo.brandName
      );
      this.brand = [];
      this.hotelData.brands.forEach((item, index) => {
        if (item.show) {
          this.brand.push(item.id);
        }
      });
    },
    //酒店选择函数封装
    hotelChoose(chooseItem, id, changeName) {
      chooseItem[id].show == true
        ? (chooseItem[id].show = false)
        : (chooseItem[id].show = true);
      // console.log(chooseItem[id].show);
      let arr = [];
      chooseItem.forEach((item, index) => {
        if (item.show) {
          arr.push(item.name);
        }
        if (arr.length >= 2) {
          changeName = `已选${arr.length}项`;
        } else if (arr.length == 0) {
          changeName = "不限";
        } else {
          changeName = arr[0];
        }
      });
      return changeName;
      this.$forceUpdate();
    }
  }
};
</script>

<style lang='less' scoped>
.screening {
  height: 75px;
  border: 1px solid #ddd;
  margin: 20px 0;
  padding: 3px 0;
  box-sizing: border-box;
  font-size: 13px;
  color: #666;
  .hotelPrice {
    .top {
      display: flex;
      justify-content: space-between;
    }
    width: 240px;
    padding: 8px 20px;
    box-sizing: border-box;
    border-right: 1px solid #ddd;
    height: 100%;
    float: left;
  }
  .hotelType {
    width: 100%;
    height: 100%;
    .item {
      float: left;
      width: 189px;
      padding: 8px 20px;
      box-sizing: border-box;
      border-right: 1px solid #ddd;
      height: 100%;
      .el-dropdown-link{
        cursor: pointer;
      }
      p {
        // display: inline-block;
        margin-bottom: 10px;
      }
      &:last-child {
        border-right: none;
      }
    }
  }
  .el-dropdown {
    width: 100%;
  }
  .el-dropdown-link {
    display: flex;
    justify-content: space-between;
  }
}
</style>