
const app = getApp()

Page({
  data: {
  },

  onLoad() {
    this.watch()
  },
  watch() {
    this.watchObj = this.watchFuncs();

    app.$watch('nums', this.watchObj.numsChangeAction);

  },

  watchFuncs() {

    return {
      numsChangeAction: function() {
        console.log('nums 改变了', app.globalData.nums)
      },
    }
  },

  toCalc(){
    wx.navigateTo({
      url: '/pages/calc/calc',
    })
  }
})
