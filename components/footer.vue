<template>
  <div class="footer-wrapper">
    <div class="footer">
      <el-row class="info-list">
        <el-col :span="5" :offset="1">
          <h5>旅游资讯</h5>
          <p>宾馆索引&nbsp;&nbsp;&nbsp;攻略索引</p>
          <p>机票索引&nbsp;&nbsp;&nbsp;网站导航</p>
          <p>旅游索引&nbsp;&nbsp;&nbsp;火车票索引</p>
          <p>游轮索引&nbsp;&nbsp;&nbsp;企业差旅索引</p>
          <p>用车索引</p>
        </el-col>
        <el-col :span="5">
          <h5>加盟合作</h5>
          <p>分销联盟&nbsp;&nbsp;&nbsp;友情链接</p>
          <p>广告业务&nbsp;&nbsp;&nbsp;企业礼品卡采购</p>
          <p>保险代理&nbsp;&nbsp;&nbsp;代理合作</p>
          <p>酒店加盟&nbsp;&nbsp;&nbsp;目的地及景区合作</p>
          <p>智慧旅游&nbsp;&nbsp;&nbsp;更多加盟合作</p>
        </el-col>
        <el-col :span="5">
          <h5>关于“趣生活”</h5>
          <p>联系我们&nbsp;&nbsp;&nbsp;诚聘英才</p>
          <p>旅游资质&nbsp;&nbsp;&nbsp;企业公民</p>
          <p>用户协议&nbsp;&nbsp;&nbsp;隐私政策</p>
          <p>营业执照&nbsp;&nbsp;&nbsp;安全中心</p>
          <p>信用卡&nbsp;&nbsp;&nbsp;&nbsp;知识产权</p>
        </el-col>
        <el-col :span="6" class="scan">
          <p>
            <img src="../assets/images/首页二维码.jpg" alt />
          </p>关注我们
        </el-col>
      </el-row>

      <div
        class="licence"
      >京ICP备08001421号 京公网安备110108007702 Copyright © 2016-2010 广东理工学院 All Rights Reserved</div>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style scoped lang="less">
.footer-wrapper {
  background: #f4f4f4;
  color: #666;
  min-width: 1000px;
}

.footer {
  padding-top: 30px;
  margin: 0 auto;
  width: 1000px;
}

.info-list {
  h5 {
    font-weight: normal;
    font-size: 16px;
    margin-bottom: 10px;
  }

  p {
    font-size: 12px;
    line-height: 1.8;
  }
}

.scan {
  text-align: center;

  img {
    width: 140px;
    height: 140px;
  }

  font-size: 12px;
}

.licence {
  // border-top: 1px #666 solid;
  margin-top: 20px;
  padding: 30px 0;
  text-align: center;
  font-size: 12px;
}
</style>
