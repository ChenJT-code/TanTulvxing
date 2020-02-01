<template>
  <div class="main">
    <div class="air-column">
      <h2>剩机人</h2>
      <el-form class="member-info" :model="{users}" ref="usersRules">
        <div class="member-info-item" v-for="(item,index) in users" :key="index">
          <el-form-item
            label="乘机人类型"
            :prop="`users.${index}.username`"
            :rules="{
            required:true,message:'请输入乘机人姓名',trigger:'blur'
          }"
          >
            <el-input placeholder="姓名" class="input-with-select" v-model="item.username">
              <el-select slot="prepend" value="1" placeholder="请选择">
                <el-option label="成人" value="1"></el-option>
              </el-select>
            </el-input>
          </el-form-item>

          <el-form-item
            label="证件类型"
            :prop="`users.${index}.id`"
            :rules="{
            required:true,message:'请输入乘机人证件号',trigger:'blur'
            }"
          >
            <el-input placeholder="证件号码" class="input-with-select" v-model="item.id">
              <el-select slot="prepend" value="1" placeholder="请选择">
                <el-option label="身份证" value="1" :checked="true"></el-option>
              </el-select>
            </el-input>
          </el-form-item>

          <span class="delete-user" @click="handleDeleteUser(index)">-</span>
        </div>
      </el-form>

      <el-button class="add-member" type="primary" @click="handleAddUsers">添加乘机人</el-button>
    </div>

    <div class="air-column">
      <h2>保险</h2>
      <div>
        <el-checkbox-group v-model="insurances">
          <div class="insurance-item" v-for="(item,index) in data.insurances" :key="index">
            <el-checkbox
              :label="item.id"
              border
            >{{item.type}}：￥{{item.price}}/份×1 最高赔付{{item.compensation}}</el-checkbox>
          </div>
        </el-checkbox-group>
      </div>
    </div>

    <div class="air-column">
      <h2>联系人</h2>
      <div class="contact">
        <el-form
          label-width="80px"
          :model="{contactName,contactPhone,captcha}"
          :rules="contactRules"
          ref="conRules"
        >
          <el-form-item label="姓名" prop="contactName">
            <el-input v-model="contactName"></el-input>
          </el-form-item>

          <el-form-item label="手机" prop="contactPhone">
            <el-input placeholder="请输入内容" v-model="contactPhone">
              <template slot="append">
                <el-button @click="handleSendCaptcha">发送验证码</el-button>
              </template>
            </el-input>
          </el-form-item>

          <el-form-item label="验证码" prop="captcha">
            <el-input v-model="captcha"></el-input>
          </el-form-item>
        </el-form>
        <el-button type="warning" class="submit" @click="handleSubmit">提交订单</el-button>
      </div>
    </div>
    <span v-show="false">{{getAllPrice}}</span>
  </div>
</template>

<script>
export default {
  props: ["data"],
  data() {
    return {
      users: [
        {
          username: "",
          id: ""
        }
      ],
      contactRules: {
        contactName: {
          required: true,
          message: "请输入联系人姓名",
          trigger: "blur"
        },
        contactPhone: {
          required: true,
          message: "请输入联系人电话",
          trigger: "blur"
        },
        captcha: {
          required: true,
          message: "请输入验证码",
          trigger: "blur"
        }
      },
      insurances: [], //保险id
      contactName: "", //联系人名字
      contactPhone: "", //联系人电话
      captcha: "" //手机验证码
    };
  },
  computed: {
    //获取总金额
    getAllPrice() {
      var res = 0;
      //计算一共有多少名乘客并将机票价格相加
      res += this.data.seat_infos.org_settle_price * this.users.length;
      //加上机建燃油
      res += this.data.airport_tax_audlet * this.users.length;
      //再加上意外保险和延误险
      this.insurances.forEach(id => {
        this.data.insurances.forEach(item => {
          if (item.id == id) {
            res += item.price * this.users.length;
          }
        });
      });
      let allPrice = {
        price: res,
        usersNum: this.users.length
      };
      this.$emit("sendAllPrice", allPrice);
    }
  },
  methods: {
    // 添加乘机人
    handleAddUsers() {
      this.users.push({ username: "", id: "" });
    },

    // 移除乘机人
    handleDeleteUser(index) {
      this.users.splice(index, 1);
    },

    // 发送手机验证码
    handleSendCaptcha() {
      //判断手机号不能问空
      if (!this.contactPhone) {
        this.$confirm("手机号码不能为空", "提示", {
          confirmButtonText: "确定",
          showCancelButton: false,
          type: "warning"
        });
        return;
      }
      //判断手机号的长度只能是11位
      if (this.contactPhone.length !== 11) {
        this.$confirm("手机号码格式错误", "提示", {
          confirmButtonText: "确定",
          showCancelButton: false,
          type: "warning"
        });
        return;
      }
      this.$axios({
        url: "/captchas",
        method: "post",
        data: { tel: this.contactPhone }
      }).then(res => {
        // console.log(res);
        this.$confirm(`模拟验证码:${res.data.code}`, "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        });
      });
    },

    // 提交订单
    async handleSubmit() {
      //提交订单之前判断用户信息的必填项是否已经填写完成
      let usersRes = await this.$refs.usersRules.validate().catch(err => false);
      let conRes = await this.$refs.conRules.validate().catch(err => false);
      if (!usersRes || !conRes) {
        this.$message.error("你还有信息没有填写哦！");
        return;
      }
      let orderData = {
        users: this.users,
        insurances: this.insurances,
        contactName: this.contactName,
        contactPhone: this.contactPhone,
        captcha: this.captcha,
        invoice: false,
        seat_xid: this.$route.query.seat_xid,
        air: this.$route.query.id
      };
      let token = this.$store.state.user.userInfo.token;
      if (!token) {
        this.$message.error("请先进行登录!正在跳转登录页面……");
        this.$router.push("/user/login");
      }
      this.$axios({
        url: "/airorders",
        method: "post",
        data: orderData,
        headers: {
          Authorization: "Bearer " + token
        }
      })
        .then(res => {
          console.log(res);
          this.$router.push({
            path: "/air/pay",
            query: {
              id: res.data.data.id
            }
          });
        })
        .catch(err => {
          const { message } = err.response.data;
          this.$confirm(message, "提示", {
            confirmButtonText: "确定",
            showCancelButton: false,
            type: "warning"
          });
        });
    }
  }
};
</script>

<style scoped lang="less">
.air-column {
  border-bottom: 1px #ddd dashed;
  padding-bottom: 20px;
  margin-bottom: 20px;
}

.air-column h2 {
  margin-bottom: 20px;
  font-size: 22px;
  font-weight: normal;
}

/deep/ .el-select .el-input {
  width: 130px;
}

.input-with-select {
  width: 590px;
}

.input-with-select /deep/ .el-input-group__prepend {
  background-color: #fff;
}
// .member-info /deep/ .el-form-item {
//   margin-bottom: 0;
// }

.member-info-item {
  border-bottom: 1px #eee dashed;
  padding-bottom: 20px;
  position: relative;

  &:first-child {
    .delete-user {
      display: none;
    }
  }
}

.add-member {
  margin-top: 20px;
}

.delete-user {
  display: block;
  background: #ddd;
  width: 16px;
  height: 16px;
  font-size: 14px;
  text-align: center;
  line-height: 16px;
  color: #fff;
  cursor: pointer;
  border-radius: 50px;
  position: absolute;
  right: -30px;
  top: 50%;
}

.insurance {
  > div {
    margin-top: 10px;
  }
}

.insurance-item {
  margin-bottom: 20px;
}

.contact {
  /deep/ .el-input {
    width: 50%;
  }
}

.submit {
  margin: 50px auto;
  display: block;
  width: 250px;
  height: 50px;
}
</style>