<template>
  <div>
    <div class="class_list">
      <div class="list_top">
        <span>商品分类</span>
        <el-button type="primary" small class="addbtn" @click="addcate()">添加分类</el-button>
      </div>

      <hr />
      <div class="table_text">
        <el-table :data="tableData" style="width: 100%">
          <el-table-column label="序号" width="200">
            <template slot-scope="scope">
              <span style="margin-left: 10px">{{ scope.row.id }}</span>
            </template>
          </el-table-column>

          <el-table-column label="分类名称" width="300">
            <template slot-scope="{row,$index}">
              <el-input v-model="row.cateName" v-if="showEdit[$index]" placeholder="请输入内容"></el-input>
              <span v-else>{{row.cateName}}</span>
            </template>
          </el-table-column>

          <el-table-column label="是否应用" width="200">
            <template slot-scope="scope">
              <el-switch v-model="scope.row.state" active-color="#13ce66" inactive-color="#ff4949"></el-switch>
            </template>
          </el-table-column>

          <el-table-column label="操作">  
            <template slot-scope="scope">
              <el-button
                size="mini"
                @click="handleEdit(scope.$index, scope.row)"
                v-if="!showEdit[scope.$index]"
              >编辑</el-button>
              <el-button
                size="mini"
                type="success"
                @click="edited(scope.$index,scope.row)"
                v-else
              >完成</el-button>
              <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
        <!-- 分页 -->
        <div class="block">
          <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="pager.currentPage"
            :page-sizes="[5, 10, 15, 20]"
            :page-size="pager.pageSize"
            layout="total, sizes, prev, pager, next, jumper"
            :total="total"
          ></el-pagination>
        </div>
        <!-- 添加的模态框 -->
        <el-dialog title="添加分类" :visible.sync="dialogFormVisible" left width="400px">
          <div class="form">
            <el-form :model="updateclass">
              <el-form-item label="分类名称" :label-width="LabelWidth">
                <el-input style="width:217px" v-model="updateclass.name"></el-input>
              </el-form-item>
              <el-form-item label="是否应用" :label-width="LabelWidth">
                <el-switch
                  v-model="updateclass.state"
                  autocomplete="off"
                  active-color="#13ce66"
                  inactive-color="#ff4949"
                ></el-switch>
                <template>
                  <span style="margin-left: 10px"></span>
                </template>
              </el-form-item>
            </el-form>
          </div>
          <div slot="footer" class="dialog-footer" style="text-align:left">
            <el-button @click="dialogFormVisible = false">取 消</el-button>
            <el-button type="primary" @click="addclass">确 定</el-button>
          </div>
        </el-dialog>
      </div>
    </div>
  </div>
</template>

<script>
//API_ADD_CATE 添加商品分类
//API_CATE_LIST 获取商品分类列表
//API_DELCATE 删除商品分类
//API_EDIT_CATE 修改分类
import {
  API_ADD_CATE,
  API_CATE_LIST,
  API_DELCATE,
  API_EDIT_CATE
} from "@/api/apis";
export default {
  data() {
    return {
    
      //展示表单的input
      showEdit: [],
    
      //新添的内容
      updateclass: {
        name: "",
        state: false
      },
      //数据
      tableData: [],
      //分页
      pager:{
        currentPage: 1,
        pageSize: 5,
      },
      //每页条数
      //总条数
      total: 0,
      //对话框
      dialogTableVisible: false,
      dialogFormVisible: false,
      //宽度
      LabelWidth: "100px"
    };
  },
  created() {
    this.catelist();
  },
  methods: {
    //获取分类列表
    catelist() {
      API_CATE_LIST(this.pager).then(res => {
        this.tableData = res.data.data;
        this.tableData.forEach(element => {
          element.state = element.state === 1 ? true : false;
        });
        this.total = res.data.total;
      });
    },

    //展示模态框
    addcate() {
      this.dialogFormVisible = true;
      this.catelist();
    },
    ////添加分类
    addclass() {
      //添加分类请求
      API_ADD_CATE(
        this.updateclass.name,
        this.updateclass.state.toString()
      ).then(res => {
        if (res.data.code == 0) {
          this.success(res.data.msg);
          this.dialogFormVisible = false;
          this.catelist();
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

    //编辑
    handleEdit(index, row) {
      console.log(index, row);
      //
      this.$set(this.showEdit, index, true);

    },
    //完成编辑
    edited(index, row) {
      console.log(index, row);
      this.$set(this.showEdit, index, false);
      API_EDIT_CATE(row.id, row.cateName, row.state.toString()).then(res => {
        if (res.data.code == 0) {
          this.success(res.data.msg);
          this.catelist();
        } else {
          this.error(res.data.msg);
        }
      });
    },
    //删除
    handleDelete(index, row) {
      //消息确认框
      this.$confirm("此操作将永远删除此分类, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(() => {
        //点击确认时发送请求
        API_DELCATE(row.id).then(res => {
          if (res.data.code == 0) {
            this.$message({
              type: "success",
              message: "删除成功!"
            });
            //发送请求获取当前列表
            this.catelist();
          }
        });
      });
    },

    //每页显示多少条 改变条数
    handleSizeChange(val) {
      this.pager.pageSize = val;
      //发送请求获取当前列表
      this.catelist();
    },
    //点击页码，页码跳转时触发的函数 页数
    handleCurrentChange(val) {
      this.pager.currentPage = val;
      //发送请求获取当前列表
      this.catelist();
    }
  }
};
</script>

<style lang="less" scoped>
.class_list {
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

    .btn {
      display: flex;
      justify-content: space-around;
    }
  }
}
</style>