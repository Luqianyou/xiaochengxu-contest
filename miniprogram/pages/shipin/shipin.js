const db = wx.cloud.database()
const videoList = db.collection('vedio')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    videoArr:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getvideoList()
    this.videoContext = wx.createVideoContext('myVideo');
  },

  // 获取视频数据库
 async getvideoList(){
 let res = await videoList.get()
//  console.log(res.data);
 this.setData({
  videoArr:res.data
 })
  },
})