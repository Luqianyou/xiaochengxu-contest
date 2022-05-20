// miniprogram/pages/info/info.js
const db = wx.cloud.database()
const order = db.collection('xiangqing')
const soucang = db.collection('soucang')
const Value={};
const CurrentId={}
Page({

  /**
   * 页面的初始数据
   */
  data: {
    shopList:[],
    CurrentId:0,
    Value:0
  },
  buyGoods:function() {
    wx.switchTab({
      url: '/pages/shop/shop',
    })
  },
  Favorites:function(e){
    // console.log(e.target.dataset)
    let panduan = wx.getStorageSync('userInfo')
    let userpanduan = panduan.nickName
    // console.log(userpanduan);
    let arr = []
    arr.push(e.target.dataset)
    arr[0].userid = userpanduan
    let soucanguser = arr[0]
    // console.log(soucanguser);
    soucang.add({
      data:soucanguser,
      success:res=>{
        wx.showToast({
          title: '收藏成功,请勿多次点击，避免菜品重复', //弹框内容
          icon: 'none',  //弹框模式
          duration: 3000    //弹框显示时间
        })
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    //console.log(options)
    CurrentId.id = options.id
    Value.content = options.content
    // console.log(options.id)
    // console.log( options.content)
    this.ChooseFood()
  },
  async ChooseFood(){
    let res = await order.get()
    // console.log(res.data[CurrentId.id].subArr[Value.content].shopList)
    // console.log(res.data[parentid.id].subArr[parentcontent.content].shopList);
    this.setData({
      shopList: res.data[CurrentId.id].subArr[Value.content].shopList,
      CurrentId:CurrentId.id,
      Value:Value.content
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