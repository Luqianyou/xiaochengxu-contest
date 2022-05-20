// miniprogram/pages/favorites/favorites.js
const db = wx.cloud.database()
const order = db.collection('soucang')
// const order1 = db.collection('xiangqing')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    orderlist:[]
  },
  ChooseFood:function(e) {
    console.log(e.target.dataset);
    let CurrentId = e.target.dataset.currentid
    let Value = e.target.dataset.value
    wx.navigateTo({
      url: '/pages/info/info?id='+CurrentId+'&&content='+Value,
    })
  },
 
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getsousuolist()
  },

  // 获取详情信息
  async getsousuolist(){
    let res = await order.get()
    // console.log(res.data);
    this.setData({
      orderlist:res.data,
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

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})