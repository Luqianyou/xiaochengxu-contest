const db = wx.cloud.database()
const cai_col = db.collection('cailiao')
const menulist = db.collection('menu')
const heightArr = [0]
Page({

  /**
   * 页面的初始数据
   */
  data: {
    caiList:[],
    // 菜单数组
    MenuList: [],
    // 右侧对应id
    rightId: 'right0',
    //左侧当前项
    leftNum:0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.updataCai()
    this.updatamenu()
    wx.showNavigationBarLoading()
  },

  // 获取数据信息
  async updataCai() {
    let res = await cai_col.get()
    this.setData({
      caiList: res.data
    })
  },

  // 获取详情数据
  async updatamenu() {
    let res = await menulist.get()
    this.setData({
      MenuList: res.data
    })
  },

  // 左侧点击
  leftClick(e){
    this.setData({
      leftNum : e.currentTarget.dataset.myindex,
      rightId:"right"+e.currentTarget.dataset.myindex
    })
  },

  // 右侧滚动事件
  rightScroll(e){
    // console.log(e.detail.scrollTop);
    let st = e.detail.scrollTop;
    for(let i=0;i<heightArr.length;i++){
      if(st>=heightArr[i] && st<heightArr[i+1]-10){
        this.setData({
          leftNum:i
        });
        return;
      }
    }
  },

  // 详情页跳转
  shopList(e){
    wx.navigateTo({
      url: '/pages/shop_list/shop_list?id='+e.currentTarget.id+'&&content='+e.currentTarget.dataset.content,
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    wx.showToast({
      title: '加载中',
      icon:'loading',
      duration:2000
    })
    setTimeout(() => {
      const query = wx.createSelectorQuery()
      query.selectAll('.box').boundingClientRect()
      query.selectViewport().scrollOffset()
      query.exec(function (res) {
        res[0].map(val =>{
          let result = val.height + heightArr[heightArr.length-1]
          heightArr.push(result)
        })
        wx.hideNavigationBarLoading()
      })
    },2000)
  },
})
