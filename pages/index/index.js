// index.js
// 获取应用实例
const app = getApp()

Page({
  data: {
  },

  onLoad() {
 
  },
  toCalc(){
    wx.navigateTo({
      url: '/pages/calc/calc',
    })
  }
})
