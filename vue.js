function observe (value, cb) {
  Object.keys(value).forEach((key) => {
    console.log(key);
    defineReactive(value, key, value[key], cb)
  }
  )
}
function defineReactive (obj, key, val, cb) {
  Object.defineProperty(obj, key, {
    enumerable: true,
    configurable: true,
    get: () => {
      /*....依赖收集等....*/
      /*Github:https://github.com/answershuto*/
      console.log('test');
      return val
    },
    set: newVal => {
      val = newVal;
      let div = document.querySelector('div')
      div.innerHTML = `${app.text}`
      cb();/*订阅者收到消息的回调*/
    }
  })
}

/*代理*/
function _proxy (data) {
  const that = this;
  Object.keys(data).forEach(key => {
    Object.defineProperty(that, key, {
      configurable: true,
      enumerable: true,
      get: function proxyGetter () {
        return that._data[key];
      },
      set: function proxySetter (val) {
        that._data[key] = val;
      }
    })
  });
}

class Vue {
  constructor(options) {
    this._data = options.data;
    _proxy.call(this, options.data);/*构造函数中*/
    options.render = options.methods.render.bind(this)
    observe(this._data, options.render)
  }
}

