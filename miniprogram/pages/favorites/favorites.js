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
    // console.log(e.target.dataset);
    let CurrentId = e.target.dataset.currentid
    let Value = e.target.dataset.value
    wx.navigateTo({
      url: '/pages/info/info?id='+CurrentId+'&&content='+Value,
    })
  },
  // 删除食物
  delete(e) {
    // console.log(e)
    wx.showModal({
      title: '温馨提示',
      content: '是否删除商品',
      success :(res)=> {
        if (res.confirm) {
          order.doc(e.target.dataset.index._id).remove({
            success:res=>{
              wx.showToast({
                title: '删除成功',
                icon:'success',
                duration:1000
              })
              wx.showNavigationBarLoading()
              setTimeout(()=>{
              wx.hideNavigationBarLoading()
              this.getsousuolist()
            },10)
          }
        })
      } else if (res.cancel) {
        console.log('用户点击取消')
      }
    }
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
    let panduan = wx.getStorageSync('userInfo')
    let userpanduan = panduan.nickName
    let res = await order.where({userid:userpanduan}).get()
    this.setData({
      orderlist:res.data,
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

})