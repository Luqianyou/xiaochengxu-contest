const db = wx.cloud.database()
const Gouwulist = db.collection('users')
Page({
  /**
   * 页面的初始数据
   */
  data: {
    gouwulist:[],
    allprice:0,
  },

  // 获取购物车详情数据
async getgouwulist(){
  // 读取本地用户信息
  let panduan = wx.getStorageSync('userInfo')
  let userpanduan = panduan.nickName
let res = await Gouwulist.where({userid:userpanduan}).get()
var price = 0;
// 计算总价
for(var i=0;i<res.data.length;i++){
  price += res.data[i].content.price
}
this.setData({
  allprice:price,
  gouwulist:res.data
})
},

// 删除商品
deletshop(e){
  wx.showModal({
    title: '温馨提示',
    content: '是否删除商品',
    success :(res)=> {
      if (res.confirm) {
        Gouwulist.doc(e.target.dataset.index._id).remove({
          success:res=>{
            wx.showToast({
              title: '删除成功',
              icon:'success',
              duration:1000
            })
            wx.showNavigationBarLoading()
            setTimeout(()=>{
              wx.hideNavigationBarLoading()
              this.getgouwulist()
            },10)
          }
        })
      } else if (res.cancel) {
        console.log('用户点击取消')
      }
    }
  })
},

  // 跳转支付页面
  tozhifu(){
    wx.navigateTo({
      url: '/pages/zhifu/zhifu',
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getgouwulist()
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    this.getgouwulist()
  },
})