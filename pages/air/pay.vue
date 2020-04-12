<template>
  <div class="container">
    <div class="main">
      <div class="pay-title">
        <strong>总金额</strong> 
        <span class="pay-price">￥ {{payData.price}}</span>
      </div>
      <div class="pay-main">
        <h4>请使用微信支付</h4>
        <el-row type="flex" justify="space-between" align="middle" class="pay-qrcode">
          <div class="qrcode">
            <!-- 二维码 -->
            <canvas id="qrcode-stage" ref="canvasAAA"></canvas>
            <p>请使用微信扫一扫</p>
            <p>扫描二维码支付</p>
          </div>
          <div class="pay-example">
            <img src="http://157.122.54.189:9093/images/wx-sweep2.jpg" alt />
          </div>
        </el-row>
      </div>
    </div>
  </div>
</template>

<script>
import qrCode from "qrcode";
export default {
  data() {
    return {
      payData: {}
    };
  },
  mounted() {
    this.loadData();
  },
  methods: {
    //获取订单数据
    loadData() {
      let token = this.$store.state.user.userInfo.token;
      if (token) {
        this.$axios({
          url: `/airorders/${this.$route.query.id}`,
          headers: {
            Authorization: "Bearer " + token
          }
        }).then(res => {
          console.log(res);
          this.payData = res.data;
          qrCode.toCanvas(this.$refs.canvasAAA, this.payData.payInfo.code_url, {
            width: 200
          });
          this.askPayRes();
        });
      }
    },
    //轮询支付结果
    askPayRes() {
      let token = this.$store.state.user.userInfo.token;
      this.$axios({
        method: "post",
        url: "/airorders/checkpay",
        headers: {
          Authorization: "Bearer " + token
        },
        data: {
          id: this.payData.id,
          nonce_str: this.payData.payInfo.nonce_str,
          out_trade_no: this.payData.payInfo.order_no
        }
      }).then(res => {
        console.log(res);
        if (res.data.trade_state == "NOTPAY") {
          setTimeout(() => {
            this.askPayRes();
          }, 3000);
        } else {
          this.otherStatus(res.data.trade_state)
        }
      });
    },
    //非未支付状态的其他状态
    otherStatus(res) {
      switch (res) {
        case "SUCCESS":
          this.$message({
            message: "支付成功",
            type: "success"
          });
          break;
        case "REFUND":
          this.$message({
            message: "转入退款",
            type: "info"
          });
          break;
        case "CLOSED":
          this.$message({
            message: "已关闭",
            type: "info"
          });
          break;
        case "REVOKED":
          this.$message({
            message: "已撤销（付款码支付）",
            type: "info"
          });
          break;
        case "PAYERROR":
          this.$message({
            message: "支付失败",
            type: "error"
          });
          break;
        default:
          break;
      }
    }
  },
  watch: {
    "$store.state.user.userInfo.token"() {
      this.loadData();
    }
  }
};
</script>

<style scoped lang="less">
.container {
  background: #f5f5f5;
  padding: 30px 0;

  .main {
    width: 1000px;
    margin: 0 auto;

    .pay-title {
      text-align: right;
      span {
        font-size: 28px;
        color: orangered;
      }
    }

    .pay-main {
      background: #fff;
      margin-top: 10px;
      // border-top: 5px orange solid;
      padding: 30px;

      h4 {
        font-size: 28px;
        font-weight: normal;
        margin-bottom: 10px;
        padding-left: 350px;
        color: #2064c8;
      }

      .pay-qrcode {
        padding: 0 80px;
      }

      .qrcode {
        border: 1px #ddd solid;
        padding: 15px;
        height: fit-content;

        #qrcode-stage {
          width: 200px;
          height: 200px;
          margin-bottom: 10px;
        }

        p {
          line-height: 2;
          text-align: center;
        }
      }
    }
  }
}
</style>