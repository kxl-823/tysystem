<template>
  <div class="class_list">
    <div class="list_top">
      <span>修改密码</span>
    </div>

    <hr />
    <div class="table_text">
      <el-form
        :model="ruleForm"
        status-icon
        :rules="rules"
        ref="ruleForm"
        label-width="100px"
        class="demo-ruleForm"
      >
        <el-form-item label="原密码" prop="oldpass">
          <el-input
            type="password"
            v-model="ruleForm.oldpass"
            autocomplete="off"
            class="input_length"
          ></el-input>
        </el-form-item>
        <el-form-item label="新密码" prop="newpass">
          <el-input
            type="password"
            v-model="ruleForm.newpass"
            autocomplete="off"
            class="input_length"
          ></el-input>
        </el-form-item>
        <el-form-item label="确认密码" prop="checkPass">
          <el-input
            type="password"
            v-model="ruleForm.checkPass"
            autocomplete="off"
            class="input_length"
          ></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm('ruleForm')">确定</el-button>
          <el-button @click="resetForm('ruleForm')">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import { API_OLDPWD, API_EDIT_PWD } from "../../../api/apis";
export default {
  data() {
    //旧密码
    var validatePass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入密码"));
      } else {
        if (this.ruleForm.oldpass !== "") {
          //从存储里拿出id
          var account = JSON.parse(localStorage.getItem("account"));
          //发送请求
          API_OLDPWD(this.ruleForm.oldpass, account.id).then(res => {
            if (res.data.code == 0) {
              //验证
              callback();
            } else {
              callback(new Error(res.data.msg));
            }
          });
        }
      }
    };
    var validatePass2 = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入新密码"));
      } else if (value !== this.ruleForm.newpass) {
        callback(new Error("两次输入密码不一致!"));
      } else {
        callback();
      }
    };
    return {
      ruleForm: {
        newpass: "",
        oldpass: "",
        checkPass: ""
      },
      rules: {
        oldpass: [{ validator: validatePass, trigger: "blur" }],
        newpass: [{ validator: validatePass2, trigger: "blur" }],
        checkPass: [{ validator: validatePass2, trigger: "blur" }]
      }
    };
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          //从本地存储里拿出账户信息
          var account = JSON.parse(localStorage.getItem("account"));
          //发送修改请求
          API_EDIT_PWD(this.ruleForm.newpass, account.id).then(res => {
            if (res.data.code == 0) {
              this.success(res.data.msg);
              //修改成功后清空值
               this.$refs[formName].resetFields();
               //修改后跳转 重新登录
               this.$router.push("/");
            }else{
              this.error(res.data.msg);
            }
          });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
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