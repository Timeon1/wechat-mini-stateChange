
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
  globalData: {
    nums: 0
  }
})
