<template>
  <div id="order">
    <div class="order_top">
      <div class="order_num">
        <span>订单号</span>
        <el-input v-model="queryParam.orderNo" placeholder="请输入内容" class="input_text"></el-input>
      </div>
      <div class="order_num">
        <span>收货人</span>
        <el-input v-model="queryParam.consignee" placeholder="收货人" class="input_text"></el-input>
      </div>
      <div class="order_num">
        <span>手机号</span>
        <el-input v-model="queryParam.phone" placeholder="手机号" class="input_text"></el-input>
      </div>
      <div class="order_num">
        <span>订单状态</span>
        <el-select v-model="queryParam.orderState" placeholder="订单状态">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          ></el-option>
        </el-select>
      </div>
    </div>

    <div class="block">
      <span class="demonstration">默认</span>
      <el-date-picker
        v-model="queryParam.date"
        type="datetimerange"
        range-separator="至"
        start-placeholder="开始日期"
        end-placeholder="结束日期"
        value-format="yyyy-MM-dd HH:mm:ss"
      ></el-date-picker>
      <el-button type="primary" @click="onSubmit">查询</el-button>
    </div>

    <div class="tabletext">
      <el-table :data="tableData" border style="width: 100%">
        <el-table-column fixed prop="orderNo" label="订单号" width="150"></el-table-column>
        <el-table-column label="下单时间" width="200">
          <template slot-scope="scope">
            <span>{{formDate(scope.row.orderTime)}}</span>
          </template>
        </el-table-column>
        <el-table-column prop="phone" label="手机号" width="120"></el-table-column>
        <el-table-column prop="consignee" label="收货人" width="120"></el-table-column>
        <el-table-column prop="deliverAddress" label="配送地址" width="240"></el-table-column>
        <el-table-column label="送达时间" width="200">
          <template slot-scope="scope">
            <span>{{formDate(scope.row.deliveryTime)}}</span>
          </template>
        </el-table-column>
        <el-table-column prop="remarks" label="用户备注" width="120"></el-table-column>
        <el-table-column prop="orderAmount" label="订单金额" width="120"></el-table-column>
        <el-table-column prop="orderState" label="订单状态" width="120"></el-table-column>
        <el-table-column fixed="right" label="操作" width="200">
          <template slot-scope="scope">
            <el-button type="primary" size="small" @click="handleSee(scope.row)">查看</el-button>
            <el-button @click="handleClick(scope.row)" type="success" size="small">编辑</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <!-- 分页 -->
    <div class="block">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="queryParam.currentPage"
        :page-sizes="[5, 10, 15, 20]"
        :page-size="queryParam.pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
      ></el-pagination>
    </div>
    <!-- 查看模态框 -->
    <el-dialog title="订单详情" :visible.sync="dialogTableVisible" width="80%">
      <el-table :data="gridData">
        <el-table-column fixed prop="orderNo" label="订单号" width="100"></el-table-column>
        <el-table-column label="下单时间" width="160">
          <template slot-scope="scope">
            <span>{{formDate(scope.row.orderTime)}}</span>
          </template>
        </el-table-column>
        <el-table-column prop="phone" label="手机号" width="130"></el-table-column>
        <el-table-column prop="consignee" label="收货人" width="100"></el-table-column>
        <el-table-column prop="deliverAddress" label="配送地址" width="160"></el-table-column>
        <el-table-column label="送达时间" width="160">
          <template slot-scope="scope">
            <span>{{formDate(scope.row.deliveryTime)}}</span>
          </template>
        </el-table-column>
        <el-table-column prop="remarks" label="备注" width="100"></el-table-column>
        <el-table-column prop="orderAmount" label="订单金额" width="90"></el-table-column>
        <el-table-column prop="orderState" label="订单状态" width="90"></el-table-column>
      </el-table>
    </el-dialog>

    <!-- 编辑模态框 -->
    <el-dialog title="编辑订单" :visible.sync="dialogFormVisible" width="600px">
      <el-form :model="orderParams">
        <el-form-item label="订单号" :label-width="formLabelWidth">
          <el-input v-model="orderParams.orderNo" autocomplete="off" style="width:287px"></el-input>
        </el-form-item>

        <el-form-item label="下单时间" :label-width="formLabelWidth">
          <div class="block">
            <el-date-picker
              v-model="orderParams.orderTime"
              type="datetime"
              placeholder="下单时间"
              format="yyyy-MM-dd HH:mm:ss"
              style="width:287px"
            ></el-date-picker>
          </div>
        </el-form-item>

        <el-form-item label="手机号" :label-width="formLabelWidth">
          <el-input v-model="orderParams.phone" autocomplete="off" style="width:287px"></el-input>
        </el-form-item>

        <el-form-item label="收货人" :label-width="formLabelWidth">
          <el-input v-model="orderParams.consignee" autocomplete="off" style="width:287px"></el-input>
        </el-form-item>

        <el-form-item label="配送地址" :label-width="formLabelWidth">
          <el-input v-model="orderParams.deliverAddress" autocomplete="off" style="width:287px"></el-input>
        </el-form-item>

        <el-form-item label="送达时间" :label-width="formLabelWidth">
          <div class="block">
            <el-date-picker
              v-model="orderParams.deliveryTime"
              type="datetime"
              placeholder="送达时间"
              format="yyyy-MM-dd HH:mm:ss"
              style="width:287px"
            ></el-date-picker>
          </div>
        </el-form-item>

        <el-form-item label="备注" :label-width="formLabelWidth">
          <el-input v-model="orderParams.remarks" autocomplete="off" style="width:287px"></el-input>
        </el-form-item>

        <el-form-item label="订单金额" :label-width="formLabelWidth">
          <el-input v-model="orderParams.orderAmount" autocomplete="off" style="width:287px"></el-input>
        </el-form-item>

        <el-form-item label="订单状态" :label-width="formLabelWidth">
          <el-select v-model="orderParams.orderState" placeholder="订单状态">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="orderEdit">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
//API_ORDER_DETAIL订单详情
//API_ORDER_LIST 获取订单列表详情
//API_ORDER_EDIT 修改订单
//API_ORDER_SEARCH 查询  带有获取列表功能
import {

  API_ORDER_SEARCH,
  API_ORDER_EDIT,
  API_ORDER_DETAIL
} from "@/api/apis";
export default {
  data() {
    return {
      //查看模态框
      dialogTableVisible: false,
      //编辑模态框
      dialogFormVisible: false,
      formLabelWidth: "100px",
      total: 0,
      //订单状态
      options: [
        {
          value: "派送中",
          label: "派送中"
        },
        {
          value: "已受理",
          label: "已受理"
        },
        {
          value: "已完成",
          label: "已完成"
        }
      ],


      queryParam: {
        orderNo: "",
        consignee: "",
        phone: "",
        orderState: "",
        date: "",
        //查询
        currentPage: 1,
        pageSize: 5
      },
      //表格数据
      tableData: [],
      //查看
      gridData: [],
      //编辑订单
      orderParams: {}
    };
  },
  //生命周期函数：在最开始就获取列表
  created() {
    //获取订单列表
    this.orderList();
  },
  methods: {
    //封查询和订单列表的方法
    orderList() {
      /*  API_ORDER_LIST(this.queryParam.currentPage, this.queryParam.pageSize).then(res => {
        this.tableData = res.data.data; //数据数组列表
        this.total = res.data.total;
      }); */
      API_ORDER_SEARCH(this.queryParam).then(res => {
        this.tableData = res.data.data;
        this.total = res.data.total;
      });

    },
    //查看
    handleSee(row) {
      this.dialogTableVisible = true;
      API_ORDER_DETAIL(row.id).then(res => {
        this.$set(this.gridData, 0, row);
      console.log(res);
      
      });
    },

    //展示表格
    handleClick(row) {
      this.orderParams = row;
      this.dialogFormVisible = true;
    },
    //编辑
    orderEdit() {
      this.dialogFormVisible = false;
      this.orderParams.orderTime = this.formDate(this.orderParams.orderTime);
      this.orderParams.deliveryTime = this.formDate(
        this.orderParams.deliveryTime
      );
      API_ORDER_EDIT(this.orderParams).then(res => {
        if (res.data.code == 0) {
          this.success(res.data.msg);
        } else {
          this.error(res.data.msg);
        }
      });
    },
    //查询
    onSubmit() {
      this.queryParam.date = JSON.stringify(this.queryParam.date);
      API_ORDER_SEARCH(this.queryParam).then(res => {
        this.tableData = res.data.data;
        this.total = res.data.total;
      });
    },
    //每页显示多少条 改变条数
    handleSizeChange(val) {
      this.queryParam.pageSize = val;
      //发送请求获取当前列表
      this.orderList();
    },
    //点击页码，页码跳转时触发的函数 页数
    handleCurrentChange(val) {
      this.queryParam.currentPage = val;
      //发送请求获取当前列表
      this.orderList();
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
  }
};
</script>

<style lang="less" scoped>
#order {
  width: 100%;
  background-color: #fff;
  .order_top {
    padding: 10px;
    display: flex;
    .order_num {
      display: flex;
      align-items: center;
      span {
        margin: 0 8px;
        font-size: 14px;
      }
      .el-input {
        width: 240px;

        .input_text {
          height: 34px !important;
        }
      }
    }
  }
  .block {
    padding: 10px;
    .el-button {
      margin-left: 8px;
    }
    span {
      margin: 0 8px;
    }
  }
  .tabletext {
    margin: 20px;
  }
}
</style>