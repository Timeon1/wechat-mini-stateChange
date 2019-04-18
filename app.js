
App({
  onLaunch() {


  },
  /**
   * @brief 状态管理
  */
  watchCallBack: {},
  watchingKeys: [],
  $watch(key, cb) {
    this.watchCallBack = Object.assign({}, this.watchCallBack, {[key]: this.watchCallBack[key] || []});
    if (!this.watchCallBack[key]) this.watchCallBack[key] = [];
    this.watchCallBack[key].push(cb);
    
    if (!this.watchingKeys.find(x => x === key)) {
      const that = this;
      this.watchingKeys.push(key);
      let val = this.globalData[key];

      Object.defineProperty(this.globalData, key, {
        configurable: true,
        enumerable: true,
        set(value) {
          const old = that.globalData[key];
          val = value;
          that.watchCallBack[key].map(func => func(value, old));
        },
        get() {
          return val;
        }
      })
    }
  },
  $off(key, handle) {
    if (this.watchCallBack[key]) {
      for (var i = 0; i<this.watchCallBack[key].length; i++) {
        if (this.watchCallBack[key][i] == handle) {
          this.watchCallBack[key].splice(i, 1);
        }
      }
    }
  },

  /**
   * @brief 全局变量
  */
  globalData: {
    nums: 0
  }
})
