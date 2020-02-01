<template>
  <div style="display:flex">
    <div id="map"></div>
    <div class="rightInfo">
      <el-tabs v-model="activeName" @tab-click="handleClick">
        <el-tab-pane label="风景" name="first">
          <div style="height:300px;overflow-y:scroll">
            <p
              v-for="(item,index) in pois"
              :key="index"
              @mouseenter="handleEnter(item)"
              style="margin-bottom:20px;"
            >
              <span>{{item.name}}</span>
              <span style="margin-right:20px;">{{distance(item)}}公里</span>
            </p>
          </div>
        </el-tab-pane>
        <el-tab-pane label="交通" name="second">
          <div style="height:300px;overflow-y:scroll">
            <p
              v-for="(item,index) in traffic"
              :key="index"
              @mouseenter="handleEnter(item)"
              style="margin-bottom:20px;"
            >
              <span>{{item.name}}</span>
              <span style="margin-right:20px;">{{distance(item)}}公里</span>
            </p>
          </div>
        </el-tab-pane>
      </el-tabs>
    </div>
    <div id="panel"></div>
  </div>
</template>

<script>
import { log } from "util";
export default {
  props: ["data"],
  data() {
    return {
      activeName: "first",
      pois: [],
      scenic: [], //景点
      traffic: [], //交通
      map: {}
    };
  },
  watch: {
    "data.location"() {
      this.getMapPol();
    }
  },
  mounted() {
    if (this.data.location) {
      this.getMapPol();
    }
  },
  methods: {
    distance(item) {
      if (this.map.B) {
        var p1 = [this.data.location.longitude, this.data.location.latitude];
        var p2 = item.location.split(",");
        // 返回 p1 到 p2 间的地面距离，单位：米
        return (AMap.GeometryUtil.distance(p1, p2) / 1000).toFixed(2);
      }
      return 0;
    },
    //鼠标移入选项时触发
    handleEnter(item) {
      var locationArr = item.location.split(",");
      this.map.setZoomAndCenter(15, locationArr);

      var infoWindow = new AMap.InfoWindow({
        offset: new AMap.Pixel(0, -30),
        content: `<div style="display: inline-block;
                           padding: 0 5px;
                           height: 20px;
                           line-height: 20px;
                           background: #fff;
                           font-size: 12px;
                           text-align: center;
                       ">
                      ${item.name}</div>` //传入 dom 对象，或者 html 字符串
      });

      // 打开信息窗体
      infoWindow.open(this.map, [
        item.location.split(",")[0],
        item.location.split(",")[1]
      ]);
    },
    // 点击tab栏时触发
    handleClick(value) {
      if (value.index == 0) {
        this.pois = this.scenic;
        this.mapLoading();
      }
      if (value.index == 1) {
        if (!this.traffic.length) {
          this.$axios({
            url: "https://restapi.amap.com/v3/place/text",
            params: {
              key: "c694f364786f32ed69d2b50b6f7343c7",
              city: this.data.real_city,
              location: `${this.data.location.longitude},${this.data.location.latitude}`,
              types: "交通设施服务",
              output: "json",
              page: 1,
              offset: 10
            }
          }).then(res => {
            this.traffic = res.data.pois;
            this.pois = this.traffic;
            this.mapLoading();
          });
        } else {
          this.pois = this.traffic;
          this.mapLoading();
        }
      }
    },
    // 发起请求获取附近景点
    getMapPol() {
      this.$axios({
        url: "https://restapi.amap.com/v3/place/text",
        params: {
          key: "c694f364786f32ed69d2b50b6f7343c7",
          city: this.data.real_city,
          // city: "南京市",
          // location: [this.data.location.longitude, this.data.location.latitude],
          location: `${this.data.location.longitude},${this.data.location.latitude}`,
          types: "风景名胜",
          output: "json",
          page: 1,
          offset: 10
        }
      }).then(res => {
        this.scenic = res.data.pois;
        this.pois = this.scenic;
        this.mapLoading();
      });
    },
    //地图配置
    mapLoading() {
      var t = this;
      window.onLoad = function() {
        var center = [t.data.location.longitude, t.data.location.latitude];
        t.map = new AMap.Map("map", {
          zoom: 15, //级别
          // 东经北纬
          center: center //[113.32459, 23.10668], //中心点坐标
          //viewMode: "3D" //使用3D视图
        });
        // 点标记
        function mapDots(serial, coordinate, name, index) {
          var marker = new AMap.Marker({
            content: `<div style="display: inline-block;width: 22px;height: 36px;background-image: url(https://webapi.amap.com/theme/v1.3/markers/b/mark_b.png);background-size: 22px 36px;text-align: center;line-height: 24px;color: #fff;">${serial}</div>`, // 自定义点标记覆盖物内容
            position: coordinate, //[113.32459, 23.10668], // 基点位置
            //offset: new AMap.Pixel(-10, -10), // 相对于基点的偏移位置
            title: name
          });
          t.map.add(marker); //添加到地图
          marker.on("mouseover", function() {
            t.map.setZoomAndCenter(15, coordinate);
            // 鼠标移入打开信息窗体
            var infoWindow = new AMap.InfoWindow({
              offset: new AMap.Pixel(0, -30),
              content: `<div style="display: inline-block;
                           padding: 0 5px;
                           height: 20px;
                           line-height: 20px;
                           background: #fff;
                           font-size: 12px;
                           text-align: center;
                       ">
                      ${name}</div>` //传入 dom 对象，或者 html 字符串
            });
            // 打开信息窗体
            infoWindow.open(t.map, coordinate);
          });
        }
        // 中心点标记
        mapDots(
          "★",
          [t.data.location.longitude, t.data.location.latitude],
          t.data.name
        );
        // 附近风景点标记;
        t.pois.forEach((item, index) => {
          mapDots(
            index + 1,
            [+item.location.split(",")[0], +item.location.split(",")[1]],
            item.name,
            index
          );
        });

        AMap.plugin("AMap.ToolBar", function() {
          //异步加载插件
          var toolbar = new AMap.ToolBar();
          t.map.addControl(toolbar);
        });
      };
      var url =
        "https://webapi.amap.com/maps?v=1.4.15&key=ccd10c501bd6a0ca679f86302d98bb85&callback=onLoad";

      var jsapi = document.createElement("script");

      jsapi.charset = "utf-8";
      jsapi.src = url;
      document.head.appendChild(jsapi);
    }
  }
};
</script>

<style lang="less" scoped>
#map {
  width: 650px;
  height: 360px;
  margin-right: 20px;
}
.marker {
  display: inline-block;
  width: 22px;
  height: 36px;
  background-image: url(https://webapi.amap.com/theme/v1.3/markers/b/mark_b.png);
  background-size: 22px 36px;
  text-align: center;
  line-height: 24px;
  color: #fff;
}
.rightInfo {
  width: 330px;
  height: 360px;
  color: #303133;
  p {
    color: #666;
    font-size: 14px;
    display: flex;
    padding-left: 10px;
    justify-content: space-between;
    cursor: pointer;
  }
}
</style>