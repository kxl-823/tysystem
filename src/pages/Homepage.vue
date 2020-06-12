<template>
  <el-container>
    <el-aside width="200px">
      <el-menu
        :default-active="default_active"
        class="el-menu-vertical-demo"
        background-color="#545c64"
        text-color="#fff"
        active-text-color="#ffd04b"
        router
        unique-opened
      >
        <h3>
          <svg class="icon" aria-hidden="true">
            <use xlink:href="#icon-chufangyongpin" />
          </svg>
          外卖商家中心
        </h3>
        <!-- 循环侧边栏菜单 -->
        <div v-for="item in newtreelist" :key="item.index">
          <!-- 一级菜单 -->
          <el-submenu v-if="item.children" :index="item.index">
            <template slot="title">
              <i :class="item.iclass"></i>
              <span slot="title">{{item.title}}</span>
            </template>
            <!-- 循环二级菜单 -->
            <el-menu-item v-for="child in item.children" :key="child.index" :index="child.index">
              <span slot="title">{{child.title}}</span>
            </el-menu-item>
          </el-submenu>
          <!-- 一级菜单 -->
          <el-menu-item v-else :index="item.index">
            <i :class="item.iclass"></i>
            <span slot="title">{{item.title}}</span>
          </el-menu-item>
        </div>
      </el-menu>
    </el-aside>
    <el-container>
      <el-header>
        <el-breadcrumb separator-class="el-icon-arrow-right">
          <el-breadcrumb-item v-for="item in titletext" :key="item">{{item}}</el-breadcrumb-item>
        </el-breadcrumb>
        <div class="head_portrait">
          <div class="head_text">
            欢迎你,
            <span v-html="user"></span>
            <!-- 头像部分 -->
          </div>
          <router-link to="/homepage/personal">
            <el-avatar :src="accountInfo.imgUrl" :size="58"></el-avatar>
          </router-link>
        </div>
      </el-header>
      <!-- 二级路由的出口 -->
      <el-main id="main">
        <!-- 二级路由 -->
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
//API_ACCOUNTINFO 获取个人中心
import { API_ACCOUNTINFO, API_CHECKTOKEN } from "@/api/apis";

export default {
  data() {
    return {
      /* 
      treelist：侧栏列表
      index：一级路由
      iclass：一级图标
      title：一级标题
      children:子菜单数组
              index：二级路由
              title：二级标题
      */
      treelist: [
        {
          //首页主体部分
          index: "/homepage/index",
          iclass: "icon-shouye iconfont",
          title: "后台首页",
          role: ["super", "normal"]
        },
        {
          index: "/homepage/ordermanage",
          iclass: "icon-dingdan iconfont",
          title: "订单管理",
          role: ["super"]
        },
        {
          index: "sale",
          iclass: "icon-shangpinguanli iconfont",
          title: "商品管理",
          role: ["super", "normal"],
          children: [
            { index: "/homepage/shoplist", title: "商品列表" },
            { index: "/homepage/additem", title: "商品添加" },
            { index: "/homepage/commodityclassification", title: "商品分类" }
          ]
        },
        {
          index: "/homepage/storemanage",
          iclass: "icon-dianpuguanli iconfont",
          title: "店铺管理",
          role: ["super", "normal"]
        },
        {
          index: "account",
          iclass: "icon-gerenyonghutouxiang2 iconfont",
          title: "账号管理",
          role: ["super"],
          children: [
            { index: "/homepage/accountlist", title: "账号列表" },
            { index: "/homepage/addaccount", title: "添加账号" },
            { index: "/homepage/changepassword", title: "修改密码" }
          ]
        },
        {
          index: "sell",
          iclass: "icon-xiaoshoutongji iconfont",
          title: "销售统计",
          role: ["super"],
          children: [
            { index: "/homepage/commoditystatistic", title: "商品统计" },
            { index: "/homepage/orderstatistic", title: "订单统计" }
          ]
        }
      ],
      //存储权限的数组
      role: "",
      //面包屑标题导航
      titletext: ["首页"],
      //加载默认的样式，
      default_active: "",
      //获取数据
      accountInfo: {},
      imageUrl: "",
      user: "亲，请登录~"
    };
  },

  methods: {
    //根据hash值监听面包屑变化
    changeTitle(hash) {
      //定义个空数组
      let arr = [];
      //根据当前点击的hash来改变面包屑的内容
      switch (hash) {
        case "/homepage/index":
          arr = ["首页"];
          break;
        case "/homepage/ordermanage":
          arr = ["首页", "订单管理"];
          break;
        case "/homepage/shoplist":
          arr = ["首页", "商品管理", "商品列表"];
          break;
        case "/homepage/additem":
          arr = ["首页", "商品管理", "商品添加"];
          break;
        case "/homepage/commodityclassification":
          arr = ["首页", "商品管理", "商品分类"];
          break;
        case "/homepage/storemanage":
          arr = ["首页", "店铺管理"];
          break;
        case "/homepage/accountlist":
          arr = ["首页", "账号管理", "账户列表"];
          break;
        case "/homepage/addaccount":
          arr = ["首页", "账号管理", "添加账号"];
          break;
        case "/homepage/changepassword":
          arr = ["首页", "账号管理", "修改密码"];
          break;
        case "/homepage/personal":
          arr = ["首页", "账号管理", "个人中心"];
          break;
        case "/homepage/commoditystatistic":
          arr = ["首页", "销售统计", "商品统计"];
          break;
        case "/homepage/orderstatistic":
          arr = ["首页", "销售统计", "订单统计"];
          break;
      }
      //把定义在数组的内容给面包屑的标题导航
      this.titletext = arr;
    }
  },

  //监测hash的变化值
  watch: {
    $route: {
      handler: function(val) {
        //点击谁就获取谁的path
        //这里的this为undefined  这时候可以把他挂载到window上，下面使用的时候能够切换到对应的path路径
        window.titlethis.changeTitle(val.path);
        //利用hash再刷新时还是显示当前选中的路径和样式
        this.default_active = val.path;
      }
    },
    // 深度观察监听
    deep: true
  },
  //生命周期
  created() {
    //this.$route是mian.js中的对象实例，获取的是index.js中的routes的路径
    //console.log(this.$route);
    //定义变量保存
    let hash = this.$route.path;

    //利用hash再刷新时还是显示当前选中的路径和样式
    this.default_active = hash;

    //改名面包屑的数组
    this.changeTitle(hash);

    //挂在window上，定义保存this
    window.titlethis = this;

    //获取存储
    let account = JSON.parse(localStorage.getItem("account"));

    //拿到存储的权限值给权限数组
    this.role = account.role;

    //发送 获取账户（个人中心）的信息
    API_ACCOUNTINFO(account.id).then(res => {
      if (res.data.accountInfo !== null) {
        //把响应的参数获取出来赋值给accountinfo这个对象，在个人中心展示出来数据
        this.accountInfo = res.data.accountInfo;
      }
    });
    //检测token是否有效
    API_CHECKTOKEN(account.token).then(res => {
      if (res.data.code == 0) {
        //有效期就显示用户名
        this.user = this.accountInfo.account;
      } else {
        this.user = '<a href="/">亲，请登录</a>';
      }
    });
  },

  //计算属性，根据权限返回新的数组
  computed: {
    //把过滤后的新菜单给newtreelist
    newtreelist() {
      //进行筛选
      return this.treelist.filter(item => item.role.includes(this.role));
    }
  }
};
</script>

<style lang="less" scoped>
.el-container {
  height: 100%;
  //侧栏
  .el-aside {
    background-color: #545c64;
    .el-menu {
      border: none;
      h3 {
        color: #fff;
        .icon {
          width: 53px;
          height: 33px;
          vertical-align: middle;
          fill: currentColor;
          overflow: hidden;
        }
      }
    }
    .el-menu-item i,
    .el-submenu i {
      margin-right: 10px;
      vertical-align: top;
    }
  }
  //右上部分
  .el-header {
    background-color: #fff;
    color: #333;
    display: flex;
    justify-content: space-between;
    .el-breadcrumb {
      line-height: 50px !important;
    }
    .head_portrait {
      display: flex;
      align-items: center;
      .head_text {
        margin-right: 20px;
        font-size: 14px;
      }
    }
  }
  //右边主体
  .el-main {
    padding-bottom: 0;
    background-color: #e9eef3;
  }
}
</style>