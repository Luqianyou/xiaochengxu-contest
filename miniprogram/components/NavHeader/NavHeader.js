// components/NavHeader/NavHeader.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    title:
    {
    type:String,
    value:'默认'
    },
    nav:
    {
    type:String,
    value:'默认'
    }
  },
  /**
   * 组件的方法列表
   */
  methods: {
    toHome(){
      wx.navigateTo({
        url: '/pages/home/home',
      })
    }
  }
})
