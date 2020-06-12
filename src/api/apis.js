import axios from 'axios'

//设置服务器的默认地址
export const API_SERVE = 'http://127.0.0.1:5000'
axios.defaults.baseURL = API_SERVE

//服务器上传图片地址地址
export const SHOP_IMGS = API_SERVE+'/shop/upload/'

//店铺图片地址
export const UPLOAD_SHOP= API_SERVE+'/upload/shop/'


//登录接口
//account:用户名   password:密码
//暴露出去
export const API_LOG = (account, password) => axios.post('/users/checkLogin', {account,password});

//添加账号
//account   用户
//password  密码
//userGroup  用户组
export const API_ADD_ACC = (account, password,userGroup) => axios.post('/users/add', {account,password,userGroup});


//获取账号列表
//currentPage  当前页面
//pageSize  每页条数
export const USER_LIST = (currentPage, pageSize) => axios.get('/users/list', {params: {currentPage,pageSize}});

//删除账号
export const API_DEL = (id) => axios.get('/users/del', {params:{id}});


//批量删除
//ids  多个用户  是一个字符串数组
export const API_BATCHDEL = (ids) => axios.get('/users/batchdel', {params:{ids}});


//修改账户
//id  用户id
//account 用户名
//userGroup 用户组 
export const API_EDIT = (id,account,userGroup) => axios.post('/users/edit', {id,account,userGroup});


//验证旧密码
//旧密码oldPwd ,   id
export const API_OLDPWD = (oldPwd,id) => axios.get('/users/checkoldpwd', {params:{oldPwd,id}});

//修改密码
//新密码 newPwd,  id
export const API_EDIT_PWD = (newPwd,id) => axios.post('/users/editpwd', {newPwd,id});

//上传图片
export const API_AVATAR_UPLOAD = (id,file) => axios.post('/users/avatar_upload', {id,file});

//获取账户（个人中心）
export const API_ACCOUNTINFO = (id) => axios.get('/users/accountinfo', {params:{id}});

//验证token是否过期
//token  存在的有效时期
export const API_CHECKTOKEN = (token) => axios.get('/users/checktoken', {params:{token}});


//添加分类
//cateName  分类名称  state是否启用
export const API_ADD_CATE = (cateName,state) => axios.post('/goods/addcate', {cateName,state});

//获取商品分类列表
//currentPage 当前页
//pageSize 每页条数
export const API_CATE_LIST = (productCate) => axios.get('/goods/catelist', {params:productCate});



//删除商品分类
export const API_DELCATE = (id) => axios.get('/goods/delcate', {params:{id}});
//修改分类
export const API_EDIT_CATE = (id,cateName,state) => axios.post('/goods/editcate', {id,cateName,state});

//查询所有分类名称
export const API_CATEGORIES = () => axios.get('/goods/categories');

//添加商品
export const API_GOODS_ADD = (productCate) => axios.post('/goods/add', productCate);


//获取商品列表
//currentPage 当前页
//pageSize 每页条数
export const API_GOODS_LIST = (currentPage,pageSize) => axios.get('/goods/list', {params:{currentPage,pageSize}});

//删除商品
export const API_GOODS_DEL = (id) => axios.get('/goods/del', {params:{id}});

//编辑商品
//name商品名称 ,category商品分类, price商品价格 ,imgUrl图片, goodsDesc商品描述
//name,category,price,imgUrl,goodsDesc,id
export const API_GOODS_EDIT = (name,category,price,imgUrl,goodsDesc,id) => axios.post('/goods/edit', {name,category,price,imgUrl,goodsDesc,id});

//获取订单列表
//currentPage当前页码, pageSize每条页数, orderNo订单号, consignee收货人, phone电话, orderState订单状态, date时间范围
export const API_ORDER_LIST = (currentPage,pageSize) => axios.get('/order/list', {params:{currentPage,pageSize}});

//查询
//currentPage当前页码, pageSize每条页数, orderNo订单号, consignee收货人, phone电话, orderState订单状态, date时间范围
export const API_ORDER_SEARCH = (queryParams) => axios.get('/order/search', {params:queryParams});

//获取订单详情
export const API_ORDER_DETAIL = (id) => axios.get('/order/detail', {params:{id}});
//修改订单
//id 要修改账号的id,orderNo订单号,orderTime下单时间,phone电话,consignee收货人,deliverAddress送货地址,deliveryTime送达时间,remarks备注,orderAmount订单金额,orderState订单状态
//id,orderNo,orderTime,phone,consignee,deliverAddress,deliveryTime,remarks,orderAmount,orderState
export const API_ORDER_EDIT = (orderParams) => axios.post('/order/edit', orderParams);

//获取店铺详情
export const API_SHOP_INFO = () => axios.get('/shop/info');
//店铺内容修改
export const API_SHOP_EDIT= (newStore) => axios.post('/shop/edit', newStore);


//首页报表数据
export const API_ORDER_TOTALDATA = () => axios.get('/order/totaldata');
//订单报表数据
export const API_ORDER_ORDERTOTAL = (date) => axios.get('/order/ordertotal', {params:{date}});