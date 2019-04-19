
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
    let that = this
    return {
      numsChangeAction: function() {

        // nums为5时 取消监听
        if(app.globalData.nums == 5){
          app.$off('nums', that.watchObj.numsChangeAction);
        }
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
