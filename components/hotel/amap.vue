<template>
  <div id="map"></div>
</template>

<script>
export default {
  props: ["mapData"],
  // data() {
  //   return {
  //     jingdu: "",
  //     weidu: ""
  //   };
  // },
  // watch: {
  //   mapData() {
  //     if (this.mapData.length) {
  //       console.log(this.mapData);
  //       this.jingdu = this.mapData[0].location.longitude;
  //       this.weidu = this.mapData[0].location.latitude;
  //     }
  //   }
  // },
  mounted() {
    var t = this;
    setTimeout(() => {
      if (t.mapData.length) {
        // console.log(t.mapData.length);
        window.onLoad = function() {
          // console.log(t.mapData[0].location.longitude);
          var map = new AMap.Map("map", {
            zoom: 11, //级别
            center: [t.mapData[0].location.longitude, t.mapData[0].location.latitude] //中心点坐标
          });
          var dataArr = [];
          var num = 0;
          t.mapData.forEach((item, index) => {
            var str = new AMap.Marker({
              position: [item.location.longitude, item.location.latitude], //位置
              title: item.name,
              // content:"<div style='width:100px;height:100px;line-height:100px;text-align:center;border-radius:50%;color:#fff;background:red;'>999</div>"
              content: `<div style='display: inline-block; width: 22px;height: 36px;background-image: url(https://webapi.amap.com/theme/v1.3/markers/b/mark_b.png);background-size: 22px 36px;text-align: center;line-height: 24px;color: #fff;'>${index +
                1}</div>`
            });
            dataArr.push(str);
          });
          // console.log(this.hotelList);
          // map.add(marker); //添加到地图
          var markerList = dataArr;
          map.add(markerList);
        };
        var url =
          "https://webapi.amap.com/maps?v=1.4.15&key=e3ae28bb775bae4d5bd77df892f19726&callback=onLoad";
        var jsapi = document.createElement("script");
        jsapi.charset = "utf-8";
        jsapi.src = url;
        document.head.appendChild(jsapi);
      }
    }, 2000);
  }
};
</script>

<style lang='less' scoped>
</style>