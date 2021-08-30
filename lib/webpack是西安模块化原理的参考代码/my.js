

var module_webpack = {
  './src/index.js': function(module) {
    const format = () => {
      return '11'
    }
    module.exports = {
      format
    }
  }
}

var _module_cache = {}
function _webpack_require_(moduleId) {
  if (_module_cache[moduleId]) return _module_cache[moduleId].exports;
  
  // 初始化
  var module = _module_cache[moduleId] = { exports: {} }
  module_webpack[moduleId](module);
}



!function () {
  const { format } = _webpack_require_('./src/index.js')
}