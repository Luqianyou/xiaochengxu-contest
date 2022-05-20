// pages/gouwu/gouwu.js
const db = wx.cloud.database()
const Gouwulist = db.collection('users')
Page({
  /**
   * 页面的初始数据
   */
  data: {
    gouwulist: [],
    allprice: 0,
    addrsss: {}
  },

  // 获取购物车详情数据
  async getgouwulist() {
    let panduan = wx.getStorageSync('userInfo')
    let userpanduan = panduan.nickName
    let res = await Gouwulist.where({
      userid: userpanduan
    }).get()
    var price = 0;
    for (var i = 0; i < res.data.length; i++) {
      price += res.data[i].content.price
    }
    this.setData({
      gouwulist: res.data,
      allprice: price
    })
  },

  // 收货地址
  handleoptadress() {
    // 获取权限状态
    wx.getSetting({
      success: (result) => {
        const scopeAddress = result.authSetting["scope.address"];
        if (scopeAddress === true || scopeAddress === undefined) {
          wx.chooseAddress({
            success: (result1) => {
              wx.setStorageSync('address', result1)
            },
          })
        } else {
          // 诱导用户打开授权
          wx.openSetting({
            success: (result2) => {
              wx.chooseAddress({
                success: (result3) => {
                  wx.setStorageSync('address', result3)
                },
              })
            }
          })
        }
      }
    })
  },

  // 弹窗提示
 showtoast() {
    wx.showModal({
      title: '温馨提示',
      content: '是否支付',
      success :res=> {
        if (res.confirm) {
          wx.showToast({
            title: '支付成功',
            icon:'success',
            duration:2000
          })
        } else if (res.cancel) {
          wx.showToast({
            title: '取消支付',
            icon:'none',
            duration:2000
          })
        }
      }
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getgouwulist()
    const user = wx.getStorageSync('userInfo')
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    this.getgouwulist()
    // 获取缓存数据
    const address = wx.getStorageSync('address')
    this.setData({
      address: address
    })
  },
})