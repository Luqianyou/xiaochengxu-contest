// 注册应用
App({

  /**
   * 当小程序初始化完成时，会触发 onLaunch（全局只触发一次）
   */
  onLaunch: function () {
    wx.cloud.init({
      env:'wx01-xp0jx'
    }) 

  },
})
