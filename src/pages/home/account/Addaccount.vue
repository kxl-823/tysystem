<template>
  <div class="class_list">
    <div class="list_top">
      <span>添加账号</span>
    </div>

    <hr />
    <div class="table_text">
      <el-form :label-position="labelPosition" label-width="80px">
        <el-form-item label="账号">
          <el-input v-model="acc" class="input_length"></el-input>
        </el-form-item>
        <el-form-item label="密码">
          <el-input type="password" v-model="pwd" class="input_length"></el-input>
        </el-form-item>
        <el-form-item label="用户组">
          <el-select placeholder="请选择管理员" class="input_length" v-model="group">
            <el-option label="普通管理员" value="普通管理员"></el-option>
            <el-option label="超级管理员" value="超级管理员"></el-option>
          </el-select>
        </el-form-item>

        <el-form-item>
          <el-button type="primary" @click="submitForm()">添加</el-button>
          <el-button @click="resetForm()">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import { API_ADD_ACC } from "../../../api/apis";
export default {
  data() {
    return {
      labelPosition: "right",
      acc: "",
      pwd: "",
      group: ""
    };
  },
  methods: {
    //点击发送请求
    submitForm() {
      API_ADD_ACC(this.acc, this.pwd, this.group).then(res => {
        if (res.data.code == 0) {
          this.success(res.data.msg);
          setTimeout(() => {
            this.$router.push("/homepage/accountlist");
            //请求后清空输入框
            this.acc = "";
            this.pwd = "";
            this.group = "";
          }, 1500);
        } else {
          this.error(res.data.msg);
        }
      });
    },
    //添加成功的信息
    success(msg) {
      this.$message({
        message: msg,
        type: "success"
      });
    },
    //失败信息
    error(msg) {
      this.$message.error(msg);
    },
    //重置
    resetForm() {
      this.acc = "";
      this.pwd = "";
      this.group = "";
    }
  }
};
</script>

<style lang="less" scoped>
.class_list {
  background-color: #fff;
  .list_top {
    span {
      font-size: 18px;
      height: 30px;
      line-height: 40px;
      margin: 20px;
      color: #888;
    }
    .addbtn {
      margin: 20px;
    }
  }

  .table_text {
    padding: 20px;
    .input_length {
      width: 40%;
    }
    .btn {
      display: flex;
      justify-content: space-around;
    }
  }
}
</style>