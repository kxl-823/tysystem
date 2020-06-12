<template>
  <div class="mian_index">
    <div class="mian_top">
      
      <el-row :gutter="20">
        <el-col :span="6" v-for="(item,index) in titlelist" :key="index">
          <div class="grid-content bg-purple top_text">
            <span :class="item.sclass" :style="item.style"></span>
            <div>
              <p class="toptext">{{item.title}}</p>
              <p>{{item.price}}</p>
            </div>
          </div>
        </el-col>
      </el-row>
    <!--   
      <el-row :gutter="20">
        <el-col :span="6">
          <div class="grid-content bg-purple top_text">
            <span class="iconfont icon-dingdan11" style="color:#1296DB;font-size:76px"></span>
            <div>
              <p class="toptext">总订单</p>
              <p>{{totalOrder}}</p>
            </div>
          </div>
        </el-col>
        <el-col :span="6">
          <div class="grid-content bg-purple top_text">
            <span class="iconfont icon-edu" style="color:#D4237A;font-size:83px;font-weight: bold"></span>
            <div>
              <p class="toptext">总销售额</p>
              <p>{{totalAmount}}</p>
            </div>
          </div>
        </el-col>
        <el-col :span="6">
          <div class="grid-content bg-purple top_text">
            <span
              class="iconfont icon-dingdan"
              style="color:#1296DB;font-size:74px;font-weight: bold;"
            ></span>
            <div>
              <p class="toptext">今日订单数</p>
              <p>{{todayOrder}}</p>
            </div>
          </div>
        </el-col>
        <el-col :span="6">
          <div class="grid-content bg-purple top_text">
            <span class="iconfont icon-jine" style="color:#1AFA29;font-size:76px;font-weight: bold;"></span>
            <div>
              <p class="toptext">今日销售额</p>
              <p>{{totayAmount}}</p>
            </div>
          </div>
        </el-col>

      </el-row> -->
    </div>
    <div id="mian_data"></div>
  </div>
</template>

<script>
//1、引入echarts
import echarts from "echarts";
import { API_ORDER_TOTALDATA } from "@/api/apis";

export default {
  data() {
    return {
       titlelist: [
        {
          sclass: "iconfont icon-dingdan11",
          style: "color:#1296DB;font-size:76px",
          title: "总订单",
          price: "210400"
        },
        {
          sclass: "iconfont icon-edu",
          style: "color:#D4237A;font-size:83px;font-weight: bold;",
          title: "总销售额",
          price: "210400"
        },
        {
          sclass: "iconfont icon-dingdan",
          style: "color:#1296DB;font-size:74px;font-weight: bold;",
          title: "今日订单数",
          price: "210400"
        },
        {
          sclass: "iconfont icon-jine",
          style: "color:#1AFA29;font-size:76px;font-weight: bold;",
          title: "今日销售额",
          price: "210400"
        }
      ], 
      totalOrder: 0,
      todayOrder: 0,
      totalAmount: 0,
      totayAmount: 0
    };
  },
  mounted() {
    //2、实例化echarts
    var totaldate = echarts.init(document.getElementById("mian_data"));
    //开启loading
    totaldate.showLoading();
    setTimeout(() => {
      //3、获取数据
      API_ORDER_TOTALDATA().then(res => {
        //xData x轴数据，orderData 订单数据，amountData金额数据
        let { xData, orderData, amountData } = res.data;
        // todayOrder: 189;今日订单 totalAmount: 202466;总销售额 totalOrder: 5486;总订单 totayAmount: 2189;今日销售额
        this.totalOrder = res.data.totalOrder;
        this.todayOrder = res.data.todayOrder;
        this.totalAmount = res.data.totalAmount;
        this.totayAmount = res.data.totayAmount;

        var option = {
          title: {
            text: "数据统计"
          },
          tooltip: {
            trigger: "axis"
          },
          legend: {
            data: ["订单数据", "金额数据"]
          },
          grid: {
            left: "3%",
            right: "4%",
            bottom: "3%",
            containLabel: true
          },
          toolbox: {
            feature: {
              saveAsImage: {}
            }
          },
          xAxis: {
            type: "category",
            boundaryGap: false,
            data: xData
          },
          yAxis: {
            type: "value"
          },
          series: [
            {
              name: "订单数据",
              type: "line",
              stack: "总量",
              data: orderData
            },
            {
              name: "金额数据",
              type: "line",
              stack: "总量",
              data: amountData
            }
          ]
        };

        //配置表格对象进行渲染
        totaldate.setOption(option);
        //关闭loadin
        totaldate.hideLoading();
      });
    }, 2000);
  }
};
</script>

<style lang="less" scoped>
.mian_index {
  width: 100%;
  .mian_top {
    margin-bottom: 20px;
    .top_text {
      background-color: #fff;
      display: flex;
      justify-content: space-around;
      align-items: center;
      .toptext {
        color: #888;
      }
    }
  }
  #mian_data {
    width: 100%;
    height: 400px;
    background-color: #fff;
   
  }
}
</style>