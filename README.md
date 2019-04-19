# wechat-mini-stateChange

> 微信小程序页面状态监听 利用 `Object.definedProperty` 实现 A页面状态改变 `=>` B页面方法执行

**app.js**

```javascript
//状态管理
watchCallBack: {},
watchingKeys: [],
// 利用Object.definedProperty 建立监听关系并触发cb
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
```



**页面调用**

```javascript
  onLoad() {
    //onLoad 挂载进程上
    this.watch()
  },
  watch() {
    this.watchObj = this.watchFuncs();
	
    app.$watch('nums', this.watchObj.numsChangeAction);

  },
	
  watchFuncs() {
    let that = this
    return {
      //nums改变 触发改回调
      numsChangeAction: function() {

        // nums为5时 卸载监听
        if(app.globalData.nums == 5){
          app.$off('nums', that.watchObj.numsChangeAction);
        }
        console.log('nums 改变了', app.globalData.nums)
      },
    }
  },
```

