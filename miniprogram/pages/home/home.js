// pages/home/home.js
const db = wx.cloud.database()
const order = db.collection('xiangqing')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    orderlist:[],
    //tab的切换
    currentTab: 0,
    
    },
    // 点击切换按钮
    swichNav: function (e) {
      // console.log(e)
        var that = this;
        if (this.data.currentTab === e.target.dataset.current) {
            return false;
        } else {
            that.setData({
                currentTab: e.target.dataset.current,
            })
        }
    },
    //滑动切换
    swiperChange: function (e) {
        this.setData({
            currentTab: e.detail.current,
        })
    },

    ChooseFood:function(e) {
      //console.log(e)
      //console.log(e.currentTarget.dataset.value)
      //console.log(e.currentTarget.id)
      // url: '/pages/shop_list/shop_list?id='+e.currentTarget.id+'&&content='+e.currentTarget.dataset.content,
      wx.navigateTo({
        url: '/pages/info/info?id='+e.currentTarget.id+'&&content='+e.currentTarget.dataset.value,
      })
    },
  /**
   * 生命周期函数--监听页面加载
   */


  onLoad: function (options) {
    order.get({
      success:res=> {
        //console.log(res.data[0].subArr)
        //console.log(...res.data)
        this.setData({
          orderlist:res.data,
        })
      },
      fail: console.error
    })
    let aa = wx.getStorageSync('currentTab')
    this.setData({
      currentTab:aa
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
    wx.setStorageSync('currentTab', 0)
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
    //用户点击分享
    return {
      title:'title',
      desc:'desc',
      path:'path'
    }
  }
})