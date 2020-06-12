<template>
  <div class="add_list">
    <span>商品添加</span>
    <hr />
    <div class="table_text">
      <el-form label-width="80px">
        <el-form-item label="商品名称">
          <el-input v-model="productCate.name" placeholder="商品名称" class="shopname"></el-input>
        </el-form-item>
        <el-form-item label="商品分类">
          <el-select v-model="productCate.category" placeholder="请选择商品分类">
            <el-option v-for="item in categories" :key="item" :value="item"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="商品价格">
          <el-input-number v-model="productCate.price" @change="handleChange" :min="0" :max="500" label="描述文字"></el-input-number>
        </el-form-item>
        <el-form-item label="商品图片">
          <el-upload
            action="http://127.0.0.1:5000/goods/goods_img_upload"
            list-type="picture-card"
            :on-preview="handlePictureCardPreview"
            :on-remove="handleRemove"
            :on-success="handleAvatarSuccess"
          >
            <i class="el-icon-plus"></i>
          </el-upload>
          <el-dialog :visible.sync="dialogVisible">
            <img width="100%" :src="productCate.imgUrl" alt />
          </el-dialog>
        </el-form-item>
        <el-form-item label="商品描述" class="shoptext">
          <el-input type="textarea" v-model="productCate.goodsDesc"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit">添加商品</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
//API_CATEGORIES 查询所有分类名
//API_GOODS_ADD 添加商品
import { API_CATEGORIES, API_GOODS_ADD } from "@/api/apis";
export default {
  data() {
    return {
      //name商品名称 ,category商品分类, price商品价格 ,imgUrl图片, goodsDesc商品描述
      productCate: {
        name: "",
        category: "",
        price: "",
        imgUrl: "",
        goodsDesc: ""
      },

      //保存商品分类
      categories: [],
      dialogVisible: false
    };
  },
  created() {
    //查询所有分类
    API_CATEGORIES().then(res => {
      this.categories = res.data.categories.map(element => {
        return element.cateName;
      });
    });
  },
  methods: {
    //添加商品
    onSubmit() {
      API_GOODS_ADD(this.productCate).then(res => {
        if (res.data.code == 0) {
          this.success(res.data.msg);
          this.$router.push("/homepage/shoplist");
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
    handleAvatarSuccess(res) {
      this.productCate.imgUrl = res.imgUrl;
    },

    handleChange(value) {
      console.log(value);
    },
    handleRemove(file, fileList) {
      console.log(file, fileList);
    },
    handlePictureCardPreview(file) {
      this.productCate.imgUrl = file.url;
      this.dialogVisible = true;
    }
  }
};
</script>

<style lang="less" scoped>
.add_list {
  background-color: #fff;
  span {
    font-size: 18px;
    height: 30px;
    line-height: 40px;
    padding: 20px;
    color: #888;
  }
  .table_text {
    padding: 20px;
    .shopname {
      width: 40%;
    }
    .shoptext {
      width: 45%;
    }

    .btn {
      display: flex;
      justify-content: space-around;
    }
  }
}
</style>