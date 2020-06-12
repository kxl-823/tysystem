<template>
  <div class="class_list">
    <div class="list_top">
      <span>账号列表</span>
    </div>

    <hr />
    <div class="table_text">
      <!-- data显示数据 -->
      <el-table
        :data="tableData"
        ref="multipleTable"
        style="width: 100%"
        @selection-change="handleSelectionChange"
      >
        <el-table-column type="selection" width="55"></el-table-column>
        <el-table-column label="账号" width="180">
          <template slot-scope="scope">
            <span style="margin-left: 10px">{{ scope.row.account }}</span>
          </template>
        </el-table-column>
        <el-table-column label="用户组" width="200">
          <template slot-scope="scope">
            <p>{{ scope.row.userGroup }}</p>
          </template>
        </el-table-column>
        <el-table-column label="日期" width="300">
          <template slot-scope="scope">
            <i class="el-icon-time"></i>
            <span style="margin-left: 10px">{{ dateFormat(scope.row.ctime) }}</span>
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button size="mini" @click="showDlog(scope.row)">编辑</el-button>
            <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
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
      <div class="btn">
        <el-button type="danger" @click="deleteAccountInfos">批量删除</el-button>
        <el-button type="primary" @click="toggleSelection()">取消选择</el-button>
      </div>

      <el-dialog title="修改账户" :visible.sync="dialogFormVisible" left width="400px">
        <div class="form">
          <el-form :model="updateAccount">
            <el-form-item label="账户" :label-width="LabelWidth">
              <el-input v-model="updateAccount.account" autocomplete="off" style="width:217px"></el-input>
            </el-form-item>

            <el-form-item label="用户组" :label-width="LabelWidth">
              <el-select v-model="updateAccount.userGroup">
                <el-option label="普通管理员" value="guest"></el-option>
                <el-option label="超级管理员" value="admin"></el-option>
              </el-select>
            </el-form-item>
          </el-form>
        </div>
        <div slot="footer" class="dialog-footer" style="text-align:left">
          <el-button @click="dialogFormVisible = false">取 消</el-button>
          <el-button type="primary" @click="update">确 定</el-button>
        </div>
      </el-dialog>
    </div>
  </div>
</template>

<script>
//账号列表  USER_LIST
//删除账号   API_DEL
//批量删除  API_BATCHDEL
//修改账户  API_EDIT
import { USER_LIST, API_DEL, API_BATCHDEL, API_EDIT } from "@/api/apis";

export default {
  data() {
    return {
      //存储列表数据
      tableData: [],
      //分页  当前默认显示的页
      currentPage: 1,
      //总条数
      total: 0,
      //每页显示的条数
      size: 5,
      //批量删除的id
      deleteIds: "",
      //更新用户信息存储的数组
      updateAccount: {},
      //对话框
      dialogFormVisible: false,
      //宽度
      LabelWidth: "60px"
    };
  },
  //生命周期函数：在最开始就获取账号列表
  created() {
    //发送请求获取当前列表
    this.updatelist();
  },
  methods: {
    //封装更新列表
    updatelist() {
      //发送请求获取当前列表
      USER_LIST(this.currentPage, this.size).then(res => {
        this.tableData = res.data.data; //数据数组列表
        this.total = res.data.total;
      });
    },
    //每页显示多少条 改变条数
    handleSizeChange(val) {
      this.size = val;
      //发送请求获取当前列表
      this.updatelist();
    },
    //点击页码，页码跳转时触发的函数 页数
    handleCurrentChange(val) {
      this.currentPage = val;
      //发送请求获取当前列表
      this.updatelist();
    },

    //展示模态框
    showDlog(row) {
      this.updateAccount = row;
      this.dialogFormVisible = true;
    },
    //修改信息 确定后发送请求
    update() {
      this.dialogFormVisible = false;
      //发送修改请求
      API_EDIT(
        this.updateAccount.id,
        this.updateAccount.account,
        this.updateAccount.userGroup
      ).then(res => {
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
    },

    
    //转时间格式
    dateFormat(time) {
      let date = new Date(time);
      let Str =
        date.getFullYear() +
        "-" +
        (date.getMonth() + 1) +
        "-" +
        date.getDate() +
        " " +
        date.getHours() +
        ":" +
        date.getMinutes() +
        ":" +
        date.getSeconds();
      return Str;
    },

    //删除单个数据
    handleDelete(index, row) {
      //消息确认框
      this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(() => {
        //点击确认时发送请求
        API_DEL(row.id).then(res => {
          if (res.data.code == 0) {
            this.$message({
              type: "success",
              message: "删除成功!"
            });
            //发送请求获取当前列表
            this.updatelist();
          }
        });
      });
    },

    //批量选择删除时触发
    handleSelectionChange(vals) {
      var ids = [];
      vals.forEach(element => {
        ids.push(element.id);
      });
      //转换为字符串格式
       this.deleteIds=JSON.stringify(ids)
      
    },

    //执行批量删除
    deleteAccountInfos() {
      //发送请求
      API_BATCHDEL(this.deleteIds).then(res => {
        if (res.data.code == 0) {
          //发送请求获取当前列表
          this.updatelist();
        }
        alert(res.data.msg);
      });
    },
    //取消选择
    toggleSelection(rows) {
      if (rows) {
        rows.forEach(row => {
          this.$refs.multipleTable.toggleRowSelection(row);
        });
      } else {
        this.$refs.multipleTable.clearSelection();
      }
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
  }
  .table_text {
    padding: 20px;

    .btn {
      margin-top: 8px;
    }
  }
}
</style>