<template>
  <div>
    <div class="block commody_top">
      <span class="demonstration time">时间范围</span>
      <el-date-picker
        v-model="date"
        value-format="yyyy-MM-dd HH:mm:ss"
        type="daterange"
        range-separator="至"
        start-placeholder="开始日期"
        end-placeholder="结束日期"
      ></el-date-picker>

      <el-button type="primary" @click="onSubmit" class="btn">查询</el-button>
    </div>
    <div id="mian_list">订单统计数据图</div>
  </div>
</template>

<script>
import echarts from "echarts";
import { API_ORDER_ORDERTOTAL } from "@/api/apis";
export default {
  data() {
    return {
      date: 0
    };
  },
  mounted() {
    var ordertotal = echarts.init(document.getElementById("mian_list"));
    ordertotal.showLoading();
    setTimeout(() => {
      API_ORDER_ORDERTOTAL(this.date).then(res => {
        //下单时间
        let orderTime = res.data.data.map(element => {
          return this.formDate(element.orderTime);
        });
        //下单金额
        let orderAmount = res.data.data.map(element => {
          return element.orderAmount;
        });
        var option = {
          xAxis: {
            type: "category",
            data: orderTime,
            name: "下单时间"
          },
          yAxis: {
            type: "value",
            name: "订单金额"
          },
          series: [
            {
              data: orderAmount,
              type: "bar",
              showBackground: true,
              backgroundStyle: {
                color: "rgba(220, 220, 220, 0.8)"
              }
            }
          ]
        };
        //配置表格对象进行渲染
        ordertotal.setOption(option);
        //关闭loadin
        ordertotal.hideLoading();
      });
    }, 2000);
  },
  methods: {
    onSubmit() {
      var ordertotal = echarts.init(document.getElementById("mian_list"));
      ordertotal.showLoading();
      API_ORDER_ORDERTOTAL(JSON.stringify(this.date)).then(res => {
        //下单时间
        let orderTime = res.data.data.map(element => {
          return this.formDate(element.orderTime);
        });
        //下单金额
        let orderAmount = res.data.data.map(element => {
          return element.orderAmount;
        });
        var option = {
          xAxis: {
            type: "category",
            data: orderTime,
            name: "下单时间"
          },
          yAxis: {
            type: "value",
            name: "订单金额"
          },
          series: [
            {
              data: orderAmount,
              type: "bar",
              showBackground: true,
              backgroundStyle: {
                color: "rgba(220, 220, 220, 0.8)"
              }
            }
          ]
        };
        //配置表格对象进行渲染
        ordertotal.setOption(option);
        //关闭loadin
        ordertotal.hideLoading();
      });
    
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
.commody_top {
  margin-bottom: 10px;
  .time {
    margin-right: 10px;
  }
  .btn {
    margin-left: 10px;
  }
}

#mian_list {
  width: 100%;
  background-color: #fff;
  height: 500px;
}
</style>