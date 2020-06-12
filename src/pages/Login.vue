<template>
  <div class="log">
    <el-card class="box-card">
      <h2>天域餐饮管理系统</h2>
      <el-form>
        <el-form-item>
          <el-input placeholder="请输入用户名" prefix-icon="el-icon-user-solid" v-model="user"></el-input>
        </el-form-item>
        <el-form-item>
          <el-input placeholder="请输入密码" prefix-icon="el-icon-view" v-model="pwd"></el-input>
        </el-form-item>

        <el-form-item>
          <el-button class="subbtn" type="primary" @click="submitForm">登录</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
//引入
import { API_LOG } from "../api/apis.js";
export default {
  data() {
    return {
      pwd: "",
      user: "",
      islog: true, //设定标杆  发送请求

    };
  },
  methods: {
    submitForm() {

      //判断标杆值是否为false  是就直接返回
      if (this.islog == false) return;

      //发送一次请求后就直接把标识设为false
      this.islog = false;
      //发送登录请求
      API_LOG(this.user, this.pwd).then(res => {
       //console.log(res.data.role);
        if (res.data.code == 0) {
          this.success(res.data.msg);
          //保存账户信息
           localStorage.setItem('account',JSON.stringify(res.data));
         
          setTimeout(() => {
            this.$router.push("/homepage/index");
          }, 500);
        } else {
           this.$message.error('用户名或密码错误~');
        }
      });
 
      //发送一次后，为了防止用户多点击的时候，浪费资源，当点击一次后，过3秒后再点击
      setTimeout(() => {
        this.islog = true;
      }, 2000); 
      
    },
    //提示信息
    success(msg) {
      this.$message({
        message: msg,
        type: "success"
      });
    },
    error(msg) {
      this.$message.error(msg);
    }
  }
};
</script>

<style lang="less" scoped>
.log {
  width: 100% !important;
  height: 100%;
  background: url('../assets/imgs/01.png') no-repeat ;
  background-size: 100% 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  .box-card {
    width: 400px !important;
    text-align: center;
    opacity:0.81;
    box-shadow: 1px 2px 5px 0;
    h2 {
      color: #2d3a4b;
      margin-bottom: 20px;
    }

    .subbtn {
      width: 100%;
    }
  }
}
</style>