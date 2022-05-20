const db = wx.cloud.database()
const cai_col = db.collection('caipin')
const order = db.collection('xiangqing')
// pages/index/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    caiList:[],
    orderlist1:[],
    orderlist2:[],
    orderlist3:[],
    currentTab: 0,
    // shopList:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    order.get({
      success:res=> {
        this.setData({
          orderlist1:res.data[0],
          orderlist2:res.data[6],
          orderlist3:res.data[7]
        })
      },
      fail: console.error
    })
    this.updataCai()
    wx.showNavigationBarLoading()
  },
  ChooseFood:function(e){
    wx.navigateTo({
      url: '/pages/info/info?id='+e.currentTarget.id+'&&content='+e.currentTarget.dataset.value,
    })
  },
  // 获取数据信息
 async updataCai(){
   let res = await cai_col.get()
   this.setData({
    caiList:res.data
   }) 
 },

 toHome(){
   wx.navigateTo({
     url: '/pages/home/home',
   })
 },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    let that = this
    setTimeout(()=>{
      wx.hideNavigationBarLoading()
      that.updataCai()
    },2000)
  },

  // 页面跳转
  leap1(){
    wx.setStorageSync('currentTab', 0)
    wx.navigateTo({
      url: '/pages/home/home',
    })
  },

  leap2(){
    wx.setStorageSync('currentTab', 1)
    wx.navigateTo({
      url: '/pages/home/home',
    })
  },

  leap3(){
    wx.setStorageSync('currentTab', 2)
    wx.navigateTo({
      url: '/pages/home/home',
    })
  },

  leap4(){
    wx.setStorageSync('currentTab', 3)
    wx.navigateTo({
      url: '/pages/home/home',
    })
  },

  leap5(){
    wx.setStorageSync('currentTab', 4)
    wx.navigateTo({
      url: '/pages/home/home',
    })
  },

  leap6(){
    wx.setStorageSync('currentTab', 5)
    wx.navigateTo({
      url: '/pages/home/home',
    })
  },

  leap7(){
    wx.setStorageSync('currentTab', 6)
    wx.navigateTo({
      url: '/pages/home/home',
    })
  },

  leap8(){
    wx.setStorageSync('currentTab', 7)
    wx.navigateTo({
      url: '/pages/home/home',
    })
  }
})