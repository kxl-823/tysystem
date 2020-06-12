<template>
  <div class="perList">
    <el-card>
      <div class="list_top">
        <span>管理员信息</span>
      </div>
      <hr />
      <div>
        <p>
          管理员ID：
          <span>{{accountInfo.id}}</span>
        </p>
        <el-divider></el-divider>
        <p>
          账号：
          <span>{{accountInfo.account}}</span>
        </p>
        <el-divider></el-divider>
        <p>
          用户组：
          <span>{{accountInfo.userGroup}}</span>
        </p>
        <el-divider></el-divider>
        <p>
          创建时间：
          <span>{{formDate(accountInfo.ctime)}}</span>
        </p>
        <el-divider></el-divider>
        <div class="contentImg">
          <span>管理员头像：</span>
          <el-upload
            class="avatar-uploader"
            action="http://127.0.0.1:5000/users/avatar_upload"
            :show-file-list="false"
            :on-success="handleAvatarSuccess"
            :data="paramsData"
          >
            <img v-if="accountInfo.imgUrl" :src="accountInfo.imgUrl" class="avatar" />
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </div>
        <el-button type="primary" plain @click="out()">注销</el-button>
      </div>
    </el-card>
  </div>
</template>

<script>
//API_ACCOUNTINFO 获取个人中心
//API_AVATAR_UPLOAD 上传图片
import { API_ACCOUNTINFO } from "@/api/apis";
export default {
  data() {
    return {
      //存放用户信息
      accountInfo: {},
      dialogVisible: false,
      disabled: false
    };
  },

  created() {
    let account = JSON.parse(localStorage.getItem("account"));
    //发送 获取账户（个人中心）的信息
    API_ACCOUNTINFO(account.id).then(res => {
      if (res.data.accountInfo !== null) {
        //把响应的参数获取出来赋值给accountinfo这个对象，在个人中心展示出来数据
        this.accountInfo = res.data.accountInfo;
      }
    });
  },
  methods: {
    handleAvatarSuccess(res) {
      if (res.code == 0) {
        window.location.reload();
      }
    },
    //注销跳转登录并且清除会话存储的id
    out() {
      localStorage.removeItem("account");
      this.$router.push("/");
    },
    //转换时间格式
    formDate(dateForm) {
      if (dateForm === "") {
        //解决deteForm为空传1970-01-01 00:00:00
        return "";
      } else {
        var dateee = new Date(dateForm).toJSON();
        var date = new Date(+new Date(dateee) + 8 * 3600 * 1000)
          .toISOString()
          .replace(/T/g, " ")
          .replace(/\.[\d]{3}Z/, "");
        return date;
      }
    }
  },
  computed: {
    //获取用户id
    paramsData() {
      let params = {
        id: this.accountInfo.id
      };
      return params;
    }
  }
};
</script>

<style>
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9 !important;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  z-index: 1000;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
/* 头部 */
.perList {
  background-color: #fff;
}
.list_top span {
  font-size: 18px;
  height: 30px;
  line-height: 30px;
  margin: 20px;
  color: #888;
}
.showImg {
  width: 178px;
  height: 178px;
  border: 1px solid #d9d9d9 !important;
  border-radius: 6px;
  cursor: pointer;
  margin-right: 20px;
}
.contentImg {
  display: flex;
  margin-bottom: 10px;
  text-align: center;
}
</style>