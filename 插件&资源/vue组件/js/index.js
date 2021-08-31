let utils = {}
/*输入框只能输入数字和小数点或整数
 * value：需要修改的值必要参数
 * decimal:保留几位小数,不传为整数
 * canMinus 是否可以为负数，不传就是不可以有负数*/
utils.formatNum = function (value, decimalNum, canMinus) {
  //响应鼠标事件，允许左右方向键移动
  var isMinus = false;//是否为负数
  Boolean(canMinus) ? canMinus = true : canMinus = false;
  //如果第一位是负号，则允许添加
  if (canMinus && value.charAt(0) === '-') {
    isMinus = true
  }
  //先把非数字的都替换掉，除了数字和.
  value = value.replace(/[^\d.]/g, "");
  //必须保证第一个为数字而不是.
  value = value.replace(/^\./g, "");
  //保证只有出现一个.而没有多个.
  value = value.replace(/\.{2,}/g, ".");
  //保证.只出现一次，而不能出现两次以上
  value = value.replace(".", "$#$").replace(/\./g, "").replace("$#$", ".");
  if (isMinus) {
    value = '-' + value;
  }
  decimalNum = parseInt(decimalNum);
  if (decimalNum <= 0 || isNaN(decimalNum)) {
    decimalNum = -1
  }
  if (value.indexOf('.') !== -1) {
    value = value.substring(0, value.indexOf('.') + decimalNum + 1);
  }
  return value
};
/*
 * 随机产生数，最小值，最大值，保留几位小数点
 * 第三个参数没有或者小于等于0或空 则返回整数
 * */
utils.randomNum = function (Min, Max, Point) {
  var Range = Max - Min,
    Rand = Math.random();
  if (!Point || Point <= 0) {
    return (Min + Math.round(Rand * Range));
  } else {
    return parseInt((Min + Rand * Range) * Math.pow(10, Point)) / Math.pow(10, Point);
  }
};
/*取url参数*/
utils.getUrlParameter = function (name) {
  var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
  var result = window.location.search.substr(1).match(reg);
  return result ? decodeURIComponent(result[2]) : null;
};
/*url传参 url参数拼接*/
utils.splicingUrlParam = function (url, dataObj) {
  var paramStr = '',
    paramValue = '';
  for (var k in dataObj) {
    paramValue = dataObj[k] !== undefined ? dataObj[k] : '';
    paramStr += '&' + k + '=' + encodeURIComponent(paramValue)
  }
  paramStr ? paramStr = paramStr.substring(1) : paramStr = '';
  url += (url.indexOf('?') < 0 ? '?' : '&') + paramStr;
  return url;
};
/*返回文件容量大小*/
utils.fileSizeBigToSmall = function (oSize) {
  var oSizeNum = '';
  if (oSize.indexOf('G') >= 0) {
    oSizeNum = parseFloat(oSize) * 1024 * 1024 * 1024;
  } else if (oSize.indexOf('M') >= 0) {
    oSizeNum = parseFloat(oSize) * 1024 * 1024;
  } else if ((oSize.indexOf('K') >= 0)) {
    oSizeNum = parseFloat(oSize) * 1024;
  }
  return oSizeNum;
};
/*返回容量+单位*/
utils.fileSizeSmallToBig = function (oSize) {
  oSize = parseFloat(oSize);
  if (oSize > 1024 * 1024 * 1024) {
    oSize = (oSize / 1024 / 1024 / 1014).toFixed(2) + 'G';
  } else if (oSize > 1024 * 1024) {
    oSize = (oSize / 1024 / 1024).toFixed(2) + 'MB';
  } else if (oSize > 1024) {
    oSize = (oSize / 1024).toFixed(2) + 'KB';
  } else {
    oSize = oSize.toFixed(2) + 'B';
  }
  return oSize;
};
/*
 * 按照数组对象中的一个元素进行排序
 *用法 array.sort(compare('需要排序的元素'));
 * */
utils.compare = function (compareObj) {
  return function (a, b) {
    var value1 = a[compareObj];
    var value2 = b[compareObj];
    return value2 - value1;
  }
};
/*检测图片是否加载完了*/
utils.chkallimg = function (dom, makeDom) {
  var $img = $(dom).find("img");
  var imgload = $img.length;
  var tepimg = [];
  for (var a = 0; a < $img.length; a++) {
    tepimg[a] = new Image();
    tepimg[a].onload = function () {
      imgload--;
    };
    tepimg[a].src = $img.eq(a).attr("src");

  }
  var chkload = setInterval(function () {
    if (imgload <= 0) {
      clearInterval(chkload);
      if (makeDom) {
        makeDom();
      }
    }
  }, 500);
};
/*获取格式化的时间
* time长整型时间*/
utils.formatTime = function (time, fmt) {
  if (!time) {
    time = new Date()
  }
  fmt = fmt ? fmt : 'yyyy-MM-dd';
  time = new Date(time);
  var z = {
    M: time.getMonth() + 1,
    d: time.getDate(),
    h: time.getHours(),
    m: time.getMinutes(),
    s: time.getSeconds()
  };
  fmt = fmt.replace(/(M+|d+|h+|m+|s+)/g, function (v) {
    return ((v.length > 1 ? "0" : "") + z[v.slice(-1)]).slice(-2);
  });
  return fmt.replace(/(y+)/g, function (v) {
    return time.getFullYear().toString().slice(-v.length);
  });
};
/*获取今日，今月，今年的起始和结束时间*/
utils.getStartEndTimeStr = function (type, time) {
  var startTime = '', endTime = '';
  switch (type) {
    case 'today':
      startTime = utils.formatTime(time) + ' 00:00:00';
      endTime = utils.formatTime(time) + ' 23:59:59';
      break;
    case 'thisMonth':
      startTime = utils.formatTime(time, 'yyyy-MM') + '-01 00:00:00';
      endTime = utils.formatTime(time, 'yyyy-MM') + '-' + new Date(utils.formatTime(time, 'yyyy'), utils.formatTime('', 'MM'), 0).getDate() + ' 23:59:59';
      break;
    case 'thisYear':
      startTime = utils.formatTime(time, 'yyyy') + '-01-01 00:00:00';
      endTime = utils.formatTime(time, 'yyyy') + '-12-31 23:59:59';
      break;
    default:
      alert('getStartEndTime方法参数为today,thisMonth,thisYear的一种');
      break
  }
  return {
    startTime: startTime,
    endTime: endTime
  }
};
/*把时间字符串转为时间对象，字符串格式必须为2019-12-25 10:10:00*/
utils.getTimeStrToObj = function (str) {
  str = str.replace(/-/g, ' ')
  str = str.replace(/:/g, ' ')
  console.log();
  str = str.split(' ')
  var timeObj = {
    Y: str[0],
    M: str[1],
    D: str[2],
    H: str[3],
    m: str[4],
    s: str[5]
  }
  if (timeObj.D === undefined) {
    timeObj.D = 0
  }
  if (timeObj.H === undefined) {
    timeObj.H = 0
  }
  if (timeObj.m === undefined) {
    timeObj.m = 0
  }
  if (timeObj.s === undefined) {
    timeObj.s = 0
  }
  return new Date(timeObj.Y, timeObj.M - 1, timeObj.D, timeObj.H, timeObj.m, timeObj.s)
}
/*去除HTML标签*/
utils.filterHTMLTag = function (msg) {
  msg = msg.replace(/<\/?[^>]*>/g, ''); //去除HTML Tag
  msg = msg.replace(/[|]*\n/, ''); //去除行尾空格
  // msg = msg.replace(/&nbsp;/ig, ''); //去掉npsp
  // msg = msg.replace(/\ +/g, ''); //去掉空格
  // msg = msg.replace(/[ ]/g, ''); //去掉空格
  msg = msg.replace(/[\r\n]/g, ''); //去掉换行符
  return msg;
};
/*把html转为纯文字
 * 这个是就是jquery.text()原理*/
utils.htmlText = function (str) {
  str = str.replace(/</g, "&lt;");
  str = str.replace(/>/g, "&gt;");
  str = str.replace(/^\s+|\s+$/g, "&nbsp;");
  return str;
};
/*获取表单数据*/
utils.getFormData = function (dom) {
  var $input = dom.find('input'),
    $textArea = dom.find('textarea'),
    $select = dom.find("select");
  var option = {};
  var i = 0, iLen = 0, type = '', valType = 0, valIsObj = null;
  iLen = $input.length;
  for (i = 0; i < iLen; i++) {
    type = $input.eq(i).attr('name');
    valType = $input.eq(i).attr('data-num');
    valIsObj = $input.eq(i).attr('data-obj');
    if (type) {
      switch ($input.eq(i).attr('type')) {
        case 'checkbox':
          option[type] = $input.eq(i).is(':checked');
          break;
        case 'radio':
          if ($input.eq(i).is(':checked')) {
            option[type] = $input.eq(i).val();
          }
          break;
        case 'number':
        case 'text':
          option[type] = $input.eq(i).val();
          if ($input.eq(i).attr('data-alert')) {
            if (option[type] === '') {
              layer.msg('请填写' + $input.eq(i).attr('data-alert'));
              return false;
            }
          }
          if (valIsObj !== undefined) {
            if (option[type] === '') {
              option[type] = null;
            }
          }
          if (valType !== undefined) {
            if (option[type] === '') {
              option[type] = null;
            } else {
              option[type] = parseFloat(option[type]);
              if (isNaN(option[type])) {
                layer.msg('input框' + type + '字段需要传数值类型');
                return false;
              }
            }
          }
          break;
        default:
          break;
      }
    }
  }
  for (i = 0, iLen = $textArea.length; i < iLen; i++) {
    type = $textArea.eq(i).attr('name');
    option[type] = $textArea.eq(i).val();
    if ($textArea.eq(i).attr('data-alert')) {
      if (option[type] === '') {
        layer.msg('请填写' + $textArea.eq(i).attr('data-alert'));
        return false;
      }
    }
  }
  for (i = 0, iLen = $select.length; i < iLen; i++) {
    type = $select.eq(i).attr('name');
    option[type] = $select.eq(i).val();
    valType = $select.eq(i).attr('data-num');
    if ($select.eq(i).attr('data-alert')) {
      if (option[type] === '' || option[type] === null) {
        layer.msg('请选择' + $select.eq(i).attr('data-alert'));
        return false;
      }
    }
    if (valType !== undefined) {
      option[type] = parseFloat(option[type]);
      if (isNaN(option[type])) {
        layer.msg('下拉框' + type + '字段需要传数值类型');
        return false;
      }
    }
  }
  return option;
};
/*
* 颜色16进制转rgba
* 第一个参数为16进制颜色字符串
* 第二个是透明度 不传为1*/
utils.colorBase16ToRgba = function (base16, opacity) {
  if (opacity === undefined) {
    opacity = 1;
  }
  var sColor = base16.toLowerCase(),
    i = 0;
  if (sColor.length === 4) {
    var sColorNew = "#";
    for (i = 1; i < 4; i += 1) {
      sColorNew += sColor.slice(i, i + 1).concat(sColor.slice(i, i + 1));
    }
    sColor = sColorNew;
  }
  //处理六位的颜色
  var sColorChange = [];
  for (i = 1; i < 7; i += 2) {
    sColorChange.push(parseInt("0x" + sColor.slice(i, i + 2)));
  }
  sColorChange.push(opacity);
  return "RGBA(" + sColorChange.join(",") + ")";
};
/*
* 把null处理成想要的字符串*/
utils.handleFalseVal = function (value, str) {
  if (str === undefined) {
    str = '-';
  }
  if (value === null || value === undefined || value === '') {
    return str
  }
  return value;
};
/*
* 返回上周本周下周的各周的时间段
* time 传入是时间对象，
* format返回的时间格式*/
utils.getWeekTime = function (time, format) {
  if (!time) {
    time = new Date();
  }
  if (!format) {
    format = 'yyyy-MM-dd'
  }
  var year = time.getFullYear(),
    month = time.getMonth(),
    day = time.getDate(),
    week = time.getDay();
  if (week === 0) {
    week = 7
  }
  var weekTime = {
    lastWeek: '',
    nowWeek: '',
    nextWeek: ''
  };
  var weekStartDay = day - week + 1;
  weekTime.lastWeek = utils.formatTime(new Date(year, month, weekStartDay - 7), format) + '-' + utils.formatTime(new Date(year, month, weekStartDay + 6 - 7), format);
  weekTime.nowWeek = utils.formatTime(new Date(year, month, weekStartDay), format) + '-' + utils.formatTime(new Date(year, month, weekStartDay + 6), format);
  weekTime.nextWeek = utils.formatTime(new Date(year, month, weekStartDay + 7), format) + '-' + utils.formatTime(new Date(year, month, weekStartDay + 6 + 7), format);
  return weekTime;
};
/*设置input select textarea只读*/
utils.fromReadOnly = function ($dom) {
  if ($dom) {
    $dom.find('input,textarea').attr('readonly', 'readonly');
    $dom.find('select,input[type="checkbox"],input[type="radio"]').attr('disabled', 'disabled');
  } else {
    $('input,textarea').attr('readonly', 'readonly');
    $('select,input[type="checkbox"],input[type="radio"]').attr('disabled', 'disabled');
  }
};
utils.unitChang = function (num, defaultVal) {
  if (num === undefined || num === null) {
    return defaultVal;
  }
  if (typeof num === "number") {
    return num + 'px';
  } else {
    return num;
  }
};
utils.stringUtil = {
  //普通字符转换成转意符
  html2Escape: function (sHtml) {
    return sHtml.replace(/[<>&"]/g, function (c) {
      return {'<': '&lt;', '>': '&gt;', '&': '&amp;', '"': '&quot;'}[c];
    });
  },
  //转意符换成普通字符
  escape2Html: function (str) {
    var arrEntities = {'lt': '<', 'gt': '>', 'nbsp': ' ', 'amp': '&', 'quot': '"'};
    return str.replace(/&(lt|gt|nbsp|amp|quot);/ig, function (all, t) {
      return arrEntities[t];
    });
  },
  nbspvl: function (str) {
    return str != null ? str : "&nbsp;";
  },
  nvl: function (str) {
    return str != null ? str : "";
  }
};
/*返回当前dom没有id*/
utils.getDomOnlyId = function (id) {
  var hasId = function (id) {
    var thisIdNum = parseInt(id.substr(id.length - 1, 1));
    if (isNaN(thisIdNum)) {
      thisIdNum = 0;
      id = id + thisIdNum;
    }
    if ($('#' + id).length) {
      return hasId(id.substr(0, id.length - 1) + (++thisIdNum));
    } else {
      return id
    }
  };
  return hasId(id)
};
utils.byteLength = function (str, maxLen) {  //获取字符串的字节数，扩展string类型方法
  var b = 0;
  var returnStr = '';
  var strLen = str.length;  //初始化字节数递加变量并获取字符串参数的字符个数
  if (strLen) {  //如果存在字符串，则执行计划
    for (var i = 0; i < strLen; i++) {  //遍历字符串，枚举每个字符
      if (str.charCodeAt(i) > 255) {  //字符编码大于255，说明是双字节字符
        b += 2;  //则累加2个
      } else {
        b++;  //否则递加一次
      }
      if (maxLen !== undefined) {
        if (b < maxLen) {
          returnStr += str[i];
        } else if (b === maxLen) {
          returnStr += str[i];
          return returnStr;
        } else {
          return returnStr;
        }
      }
    }
    if (maxLen !== undefined) {
      return returnStr;
    }
    return b;  //返回字节数
  } else {
    if (maxLen !== undefined) {
      return returnStr;
    }
    return 0;  //如果参数为空，则返回0个
  }
};
/**
 * 构造树型结构数据
 * @param {*} source 数据源
 * @param {*} id id字段 默认 'id'
 * @param {*} parentId 父节点字段 默认 'parentId'
 * @param {*} children 孩子节点字段 默认 'children'
 * @param {*} rootId 根Id 默认 0
 */
utils.makeTreeData = function (source, id, parentId, children, rootId) {
  id = id || 'id'
  parentId = parentId || 'parentId'
  children = children || 'children'
  rootId = rootId || 0
  var cloneData = JSON.parse(JSON.stringify(source))// 对源数据深度克隆
  return cloneData.filter(function (father) {
    if (father.parentId === undefined || father.parentId === null) {
      father.parentId = 0
    }
    var branchArr = cloneData.filter(function (child) {
      return father[id] === child[parentId]
    })// 返回每一项的子级数组
    branchArr.length > 0 ? father[children] = branchArr : delete father[children]// 如果存在子级，则给父级添加一个children属性，并赋值
    return father[parentId] === rootId // 返回第一层
  })
};
utils.isIE = function () {
  if (!!window.ActiveXObject || "ActiveXObject" in window) {
    return true;
  }
  else {
    return false;
  }
};
/*判断是否是ie11*/
utils.isIE11 = function () {
  var u = window.navigator.userAgent.toLocaleLowerCase();
  if (u.match(/(trident)\/([\d.]+)/)) {
    return true
  } else {
    return false;
  }
};
/*判断移动设备*/
utils.isIOSorAndroid = function () {
  var u = navigator.appVersion;
  return {
    iOS: !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/),
    Android: (u.indexOf('Android') > -1 || u.indexOf('Adr') > -1)
  }
}
utils.getMainPageMinHeight = function (ref) {
  let iframeHeight = 0
  iframeHeight = parseInt(ref.style.minHeight);
  if (iframeHeight === 0 || isNaN(iframeHeight)) {
    iframeHeight = window.innerHeight;
  }
  return iframeHeight += 'px'
}
export default utils;


