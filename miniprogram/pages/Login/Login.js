Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo:{},//用户的基本信息
    hasUserInfo: false,
    canIUseGetUserProfile: false,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    if (wx.getUserProfile) {
      this.setData({
        canIUseGetUserProfile: true
      })
    }
  },
  

  getUserProfile(e) {
    wx.getUserProfile({
      desc: '用于完善会员资料', 
      success: (res) => {
        wx.setStorageSync('userInfo',res.userInfo)
        let userid = wx.getStorageSync('userInfo')
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      },
    })
  },

  // 跳转页面
  toLogs(){
    wx.switchTab({
      url: '/pages/index/index',
    })
  },

  

})