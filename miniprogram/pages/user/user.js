// 初始化变量
let startY = 0; //手指起始的坐标
let moveY = 0; //手指移动的坐标
let moveDistance = 0; //手指移动的距离

Page({

  /**
   * 页面的初始数据
   */
  data: {
    coverTransform: 'translateY(0)',
    coveTransition: '',
    userInfo:{}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const user=wx.getStorageSync('userInfo')
    const address=wx.getStorageSync('address')
    this.setData({
      userInfo:user
    })
  },
  handleTouchStart(event){
    // 用event 获取 手指的起始坐标
    startY = event.touches[0].clientY;
    
  },
  handleTouchMove(event){
    moveY = event.touches[0].clientY;
    moveDistance = moveY - startY ;

    if(moveDistance > 0){
      return;
    }
    if(moveDistance <= -265){
      moveDistance = -265;
    }
    // 动态更新coverTransform的状态值
    this.setData({
      coverTransform: `translateY(${moveDistance}rpx)`,
      coveTransition: 'transform 0.3s linear'
    })
  },
  handleTouchEnd(){
    this.setData({
      coverTransform: `translateY(0rpx)`
    })
  },

 // 收货地址
 handleoptadress(){
  // 获取权限状态
  wx.getSetting({
    success:(result)=>{
      const scopeAddress = result.authSetting["scope.address"];
      if(scopeAddress===true||scopeAddress===undefined){
        wx.chooseAddress({
          success: (result1) => {
            wx.setStorageSync('address',result1)
          },
        })
      }else{
        // 诱导用户打开授权
        wx.openSetting({
          success:(result2)=>{
            wx.chooseAddress({
              success: (result3) => {
                wx.setStorageSync('address',result3)
              },
            })
          }
        })
      }
    }
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
  toAbout(){
    wx.navigateTo({
      url: '/pages/about/about',
    })
  },
  toContact(){
    wx.navigateTo({
      url: '/pages/contact/contact',
    })
  },
  toShare(){
    wx.navigateTo({
      url: '/pages/share/share',
    })
  },
  

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
    
  }
})