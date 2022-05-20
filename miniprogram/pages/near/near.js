const db = wx.cloud.database()
const user = db.collection('userslocation')
const _ = db.command
Page({

  /**
   * 页面的初始数据
   */
  data: {
    latitude:'',
    longitude:'',
    marKers:[],
    check:true
  },

  // 获取本地地址
  getLocation(){
    wx.getLocation({
      type: 'gcj02',
      success: (res)=> {
        const latitude = res.latitude
        const longitude = res.longitude
        this.setData({
          latitude,
          longitude
        })
        this.getNearUsers()
      }
     })
  },

  // 获取附近用户
  getNearUsers(){
    user.where({
      location: db.command.geoNear({
        geometry: db.Geo.Point(this.data.longitude, this.data.latitude),
        minDistance: 0,
        maxDistance: 500,
    })
  }).get().then((res)=>{
    let data = res.data;
    let result = [];
    if(data.length){
      for(let i =0;i<data.length;i++){
        result.push({
          iconPath:data[i].avatarUrl,
          id:data[i]._id,
          latitude:data[i].latitude,
          longitude:data[i].longitude,
          width:30,
          height:30
        })
      }
      this.setData({
        marKers:result
      })
    }
  })
  },

  // 上传坐标
  shangchuan(e){
    const userid=wx.getStorageSync('userInfo')
    this.setData({
      check:false
    })
    let arr = [];
    arr.push(userid)
    arr[0].latitude = e.target.dataset.latitude
    arr[0].longitude = e.target.dataset.longitude
    arr[0].location = db.Geo.Point(e.target.dataset.longitude,e.target.dataset.latitude)
    let et = arr[0]
    user.add({
      data:et
    })
    wx.showToast({
      title: '再次进入请重新上传坐标',
      icon:'none',
      duration:3000
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let panduan = wx.getStorageSync('userInfo')
    let userpanduan = panduan.nickName
    user.where({nickName:userpanduan}).remove()
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    this.getLocation()
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    this.getLocation()
  },
})