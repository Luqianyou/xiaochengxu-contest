const db = wx.cloud.database()
const menulist = db.collection('menu')
const Gouwu = db.collection('users')
const parentcontent={};
const parentid={}
Page({

  /**
   * 页面的初始数据
   */
  data: {
    shopList:'',
    MenuList: [],
    Gouwunum:0,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    parentcontent.content = options.content;
    parentid.id = options.id;
    this.getshoplist()
  },

  // 获取详情页列表
  async getshoplist(){
    let res = await menulist.get()
    this.setData({
      shopList: res.data[parentid.id].subArr[parentcontent.content].shopList
    })
  },

  // 获取购物车数据
 async getGouwu(){
  let panduan = wx.getStorageSync('userInfo')
  let userpanduan = panduan.nickName
  let res = await Gouwu.where({userid:userpanduan}).get()
  this.setData({
    Gouwunum:res.data.length
  })
  },

  // 加入购物车
  async addshop(e){
    let dataset = e.target.dataset
    wx.setStorageSync('Gouwu', dataset)
    let userid = wx.getStorageSync('userInfo')
    let arr = []
    arr.push(dataset)
    arr[0].userid = userid.nickName
    let datasettrue = arr[0]
    let res = await Gouwu.add({
      data:datasettrue,
      success:(res)=>{
        wx.showNavigationBarLoading()
        setTimeout(()=>{
          wx.hideNavigationBarLoading()
          this.getGouwu()
        },10)
      },
      fail(res){
        console.log("添加失败",res);
      }
      })
  },

  // 跳转至购物车页面
  toGouwulist(){
    wx.switchTab({
      url:'/pages/gouwu/gouwu'
    })
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    this.getGouwu()
  },
})