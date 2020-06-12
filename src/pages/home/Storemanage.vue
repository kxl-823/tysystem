<template>
  <div class="manage_list">
    <div class="list_top">
      <span>店铺管理</span>
      <el-button type="primary" class="addbtn" @click="clickSave">保存</el-button>
    </div>

    <hr />
    <div class="table_text">
      <el-form ref="form" :model="store" label-width="80px">
          <el-form-item label="店铺 ID">
          <el-input v-model="store.id" class="input_name"></el-input>
        </el-form-item>
        <el-form-item label="店铺名称">
          <el-input v-model="store.name" class="input_name"></el-input>
        </el-form-item>
        <el-form-item label="店铺公告">
          <el-input type="textarea" v-model="store.bulletin" class="input_name" cols="4" rows="8"></el-input>
        </el-form-item>

        <!-- 店铺头像 -->
        <el-form-item label="店铺头像"> 
            <el-upload
            class="shopimg"
            :action="shopImgs"
            list-type="picture-card"
            :on-success="handleAvatarSuccess"
          >
            <img
              v-if="store.avatar"
              :src="uploadShop + store.avatar"
              width="142"
              height="142"
              class="avatar"
            /> 
            <i v-else class="el-icon-plus"></i>
          </el-upload>
        </el-form-item>

        <el-form-item label="店铺图片">
        
          <!-- 图片上传 -->
          <el-upload
            class="shopimg"
            :action="shopImgs"
            list-type="picture-card"
            :file-list="fileList"
            :on-success="handleImgSuccess"
           
          >
            <i class="el-icon-plus"></i>
            
          </el-upload>

          <el-dialog :visible.sync="dialogVisible">
            <img width="100%" :src="dialogImageUrl" alt />
          </el-dialog>
        </el-form-item>
        <el-form-item label="起送价格">
          <el-input v-model="store.minPrice" class="input_name"></el-input>
        </el-form-item>

        <el-form-item label="配送时间">
          <el-input v-model="store.deliveryTime" class="input_name"></el-input>
        </el-form-item>

        <el-form-item label="配送费">
          <el-input v-model="store.deliveryPrice" class="input_name"></el-input>
        </el-form-item>

        <el-form-item label="配送描述">
          <el-input v-model="store.description" class="input_name"></el-input>
        </el-form-item>

        <el-form-item label="店铺评分">
          <el-input v-model="store.score" class="input_name"></el-input>
        </el-form-item>

        <el-form-item label="销量">
          <el-input v-model="store.sellCount" class="input_name"></el-input>
        </el-form-item>

        <el-form-item label="活动">
          <el-checkbox-group v-model="supportlist">
            <el-checkbox v-for="(item,index) in supports" :key="index" :label="item" ></el-checkbox> 
          </el-checkbox-group>
        </el-form-item>

        <el-form-item label="营业时间">
          <el-date-picker
            v-model="store.date"
            type="datetimerange"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            :default-time="['08:00:00','22:00:00']"
            value-format="yyyy-MM-dd HH:mm:ss"
          ></el-date-picker>

        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
//API_SHOP_INFO 获取店铺详情
//API_SHOP_EDIT 修改店铺内容
//SHOP_IMGS
import { API_SHOP_INFO, API_SHOP_EDIT,SHOP_IMGS,UPLOAD_SHOP } from "@/api/apis";
export default {
  data() {
    return {
      store: {},
      dialogImageUrl: "",
      dialogVisible: false,
      supports:['在线支付满28减5','VC无4限橙汁全场8折','单人精彩套餐','特价饮品8折抢购','单人特殊套餐'],
      supportlist: [],//活动支持的值
      pics: [],
      fileList:[],//当前上传的图片的数组
      shopImgs:SHOP_IMGS, //店铺上传图片地址
      uploadShop:UPLOAD_SHOP//店铺图片地址
    };
  },
  created() {
    //获取店铺详情
    API_SHOP_INFO().then(res => {
      this.store = res.data.data;
      //活动支持
      this.supportlist=res.data.data.supports
      //获取显示店铺默认的图片
      this.fileList=res.data.data.pics.map(element=>{
        return {
          url:this.uploadShop + element
        }
      })
    });
  },
  methods: {
    //头像上传成功
    handleAvatarSuccess(res) {
     this.store.avatar = res.imgUrl
    },
    //图片上传上传
    handleImgSuccess(res){
       this.pics.push(res.imgUrl)
    },
    //保存
    clickSave() {
      //声明一个新变量展开store对象
      let newStore = {...this.store};
      console.log(newStore);
      
      //拼接上传的图片和数据库的图片
      newStore.pics = JSON.stringify(this.pics.concat(this.store.pics));
      newStore.supports = JSON.stringify(this.supportlist);
      newStore.date = JSON.stringify(this.store.date);
      API_SHOP_EDIT(newStore).then(res => {
        if (res.data.code == 0) {
          this.success(res.data.msg);
         
        } else {
          this.error(res.data.msg);
        }
      });
    },
    //成功提示信息
    success(msg) {
      this.$message({
        message: msg,
        type: "success"
      });
    },
    //失败提示信息
    error(msg) {
      this.$message.error(msg);
    }
  }
};
</script>

<style lang="less" scoped>
.manage_list {
  background-color: #fff;
  .list_top {
    display: flex;
    justify-content: space-between;
    align-items: center;
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
    .pics_img {
      margin-right: 10px;
    }
    .input_name {
      width: 40%;
    }
    .input_time {
      width: 45%;
    }
    .btn {
      display: flex;
      justify-content: space-around;
    }
  }
}
</style>