<template>
  <div class="table_list">
    <span>商品列表</span>
    <hr />
    <div class="table_text">
      <el-table :data="tableData" style="width: 100%">
        <el-table-column type="expand">
          <template slot-scope="props">
            <el-form label-position="left" inline class="demo-table-expand">
              <el-form-item label="商品ID">
                <span>{{ props.row.id }}</span>
              </el-form-item>

              <el-form-item label="所属分类">
                <span>{{ props.row.category }}</span>
              </el-form-item>

              <el-form-item label="商品图片">
                <el-image
                  style="width: 100px; height: 100px"
                  :src="'http://127.0.0.1:5000/upload/imgs/goods_img/'+tableData[props.$index].imgUrl"
                ></el-image>
              </el-form-item>

              <el-form-item label="商品评价">
                <span>{{ props.row.rating }}</span>
              </el-form-item>

              <el-form-item label="商品描述">
                <span>{{ props.row.goodsDesc }}</span>
              </el-form-item>

              <el-form-item label="商品名称">
                <span>{{ props.row.name }}</span>
              </el-form-item>

              <el-form-item label="商品价格">
                <span>{{ props.row.price }}</span>
              </el-form-item>

              <el-form-item label="创建时间">
                <span>{{ formDate(props.row.ctime) }}</span>
              </el-form-item>

              <el-form-item label="商品销量">
                <span>{{ props.row.sellCount }}</span>
              </el-form-item>
            </el-form>
          </template>
        </el-table-column>

        <el-table-column label="商品名称" prop="name"></el-table-column>
        <el-table-column label="所属分类" prop="category"></el-table-column>
        <el-table-column label="商品价格" prop="price"></el-table-column>
        <el-table-column label="商品图片">
          <template slot-scope="{row,$index}">
            <el-image
              style="width: 100px; height: 100px"
              :src="'http://127.0.0.1:5000/upload/imgs/goods_img/'+tableData[$index].imgUrl"
            ></el-image>
          </template>
        </el-table-column>
        <el-table-column label="商品描述" prop="goodsDesc"></el-table-column>

        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button type="primary" @click="goodsEdit(scope.row)">编辑</el-button>
            <el-button type="danger" @click="del(scope.$index,scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <div class="block">
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="currentPage"
          :page-sizes="[5, 10, 15, 20]"
          :page-size="size"
          layout="total, sizes, prev, pager, next, jumper"
          :total="total"
        ></el-pagination>
      </div>
      <!-- 编辑模态框 -->
      <el-dialog title="编辑商品" :visible.sync="dialogFormVisible" left width="600px">
        <div class="form">
          <el-form :model="goodEdit">
            <el-form-item label="商品名称" :label-width="LabelWidth">
              <el-input v-model="goodEdit.name" autocomplete="off" style="width:217px"></el-input>
            </el-form-item>

            <el-form-item label="商品分类" :label-width="LabelWidth">
              <el-input v-model="goodEdit.category" autocomplete="off" style="width:217px"></el-input>
            </el-form-item>

            <el-form-item label="商品价格" :label-width="LabelWidth">
              <el-input v-model="goodEdit.price" autocomplete="off" style="width:217px"></el-input>
            </el-form-item>

            <el-form-item label="商品图片" :label-width="LabelWidth">
                  <el-image
                    style="width: 100px; height: 100px"
                    :src="'http://127.0.0.1:5000/upload/imgs/goods_img/'+img"
                  ></el-image>
            </el-form-item>

             <el-form-item label="商品描述" :label-width="LabelWidth">
          <el-input type="textarea" v-model="goodEdit.goodsDesc" style="width:217px"  cols="2" rows="4"> </el-input>
        </el-form-item>
          </el-form>
        </div>
        <div slot="footer" class="dialog-footer" style="text-align:left">
          <el-button @click="dialogFormVisible = false">取 消</el-button>
          <el-button type="primary" @click="updateGood">确 定</el-button>
        </div>
      </el-dialog>
    </div>
  </div>
</template>

<script>
//API_GOODS_LIST  获取商品列表
//API_GOODS_DEL  删除商品
//API_GOODS_EDIT 编辑商品
import { API_GOODS_LIST, API_GOODS_DEL, API_GOODS_EDIT } from "@/api/apis";
export default {
  data() {
    return {
      tableData: [],
      currentPage: 1,
      size: 5,
      total: 0,
      //更新用户信息存储的数组
      goodEdit: {},
      //对话框
      dialogFormVisible: false,
      //宽度
      LabelWidth: "100px",
      img:"",
    };
  },
  created() {
    this.goodslist();
  },
  methods: {
    //获取商品列表
    goodslist() {
      API_GOODS_LIST(this.currentPage, this.size).then(res => {
        this.tableData = res.data.data; //数据数组列表
        this.total = res.data.total;
      });
    },
    //每页显示多少条 改变条数
    handleSizeChange(val) {
      this.size = val;
      //发送请求获取当前列表
      this.goodslist();
    },
    //点击页码，页码跳转时触发的函数 页数
    handleCurrentChange(val) {
      this.currentPage = val;
      //发送请求获取当前列表
      this.goodslist();
    },
    //编辑商品
    goodsEdit(row) {
      this.dialogFormVisible = true;
      this.goodEdit = row;
      this.img=this.goodEdit.imgUrl
    },
    //修改信息 确定后发送请求
    updateGood() {
      this.dialogFormVisible = false;
      //发送修改请求
      API_GOODS_EDIT(
        this.goodEdit.name,
        this.goodEdit.category,
        this.goodEdit.price,
        this.goodEdit.imgUrl,
        this.goodEdit.goodsDesc,
        this.goodEdit.id
      ).then(res => {
        if (res.data.code == 0) {
          this.success(res.data.msg);
        } else {
          this.error(res.data.msg);
        }
      });
    },
    //删除商品
    del(index, row) {
      //消息确认框
      this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(() => {
        //点击确认时发送请求
        API_GOODS_DEL(row.id).then(res => {
          if (res.data.code == 0) {
            this.$message({
              type: "success",
              message: "删除成功!"
            });
            //发送请求获取当前列表
            this.goodslist();
          }
        });
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
    },
    //转时间格式
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
  }
};
</script>

<style lang="less" scoped>
.table_list {
  background-color: #fff;
  span {
    font-size: 18px;
    height: 30px;
    line-height: 40px;
    padding: 20px;
    color: #888;
  }
  .table_text {
    .demo-table-expand {
      font-size: 0;
      label {
        width: 90px;
        color: #99a9bf;
      }
      .el-form-item {
        margin-right: 0;
        margin-bottom: 0;
        width: 50%;
      }
    }
  }
}
</style>