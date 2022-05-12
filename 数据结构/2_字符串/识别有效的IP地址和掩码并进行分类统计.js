/* 
  https://www.nowcoder.com/practice/de538edd6f7e4bc3a5689723a7435682?tpId=37&tags=&title=&difficulty=0&judgeStatus=0&rp=1&sourceUrl=%2Fexam%2Foj%2Fta%3Fpage%3D1%26tpId%3D37%26type%3D37
*/

const data = [];
let line = readline();
while (line) {
  const ipMask = line.split("~");
  data.push({
    ip: ipMask[0],
    mask: ipMask[1],
  });
  line = readline();
}

const ipReg = /^\d{1,3}\.\d{1,3}\.\d{1,3}.\d{1,3}$/;
function isPrivateIp(ip) {
  let flag = false;
  const arr = ip.split(".");
  const first = parseInt(arr[0]);
  const second = parseInt(arr[1]);
  if (
    first === 10 ||
    (first === 172 && second >= 16 && second <= 31) ||
    (first === 192 && second === 168)
  ) {
    flag = true;
  }
  return flag;
}
// 先检查子网掩码合法性，a).合法则接着检查IP, IP不合法，该计数+1；b)子网掩码不合法，则计数+1
function checkSubnetMask(mask) {
  let isValid = true;
  const ipArr = mask.split(".");
  let binaryStr = "";
  ipArr.forEach((subnet) => {
    // 10000000 再去除1
    binaryStr += (parseInt(subnet) + 256).toString(2).substring(1);
  });
  if (binaryStr.indexOf("01") > -1) {
    isValid = false;
  } else if (binaryStr.indexOf("1") < 0 || binaryStr.indexOf("0") < 0) {
    // 全1，全零
    isValid = false;
  }
  return isValid;
}

function ipTest() {
  // ipMaskErr 包含 ip 与 子网掩码
  const counter = {
    ipA: 0,
    ipB: 0,
    ipC: 0,
    ipD: 0,
    ipE: 0,
    ipMaskErr: 0,
    privateIp: 0,
  };
  data.forEach((item) => {
    const first = parseInt(item.ip.split("."));
    // 【0.*.*.*】和【127.*.*.*】的IP地址不属于上述输入的任意一类，也不属于不合法ip地址，计数时请忽略
    if (first === 0 || first === 127) {
      return;
    }
    // 是否是合理的子网掩码
    if (!checkSubnetMask(item.mask)) {
      counter.ipMaskErr++;
    }
    // 是否是合理的ip地址
    else if (!ipReg.test(item.ip)) {
      counter.ipMaskErr++;
    }
    // 自此他一定是合法的ip了
    else {
      if (isPrivateIp(item.ip)) {
        counter.privateIp++;
      }
      if (first > 0 && first < 127) {
        counter.ipA++;
      } else if (first > 127 && first < 192) {
        counter.ipB++;
      } else if (first > 191 && first < 224) {
        counter.ipC++;
      } else if (first > 223 && first < 240) {
        counter.ipD++;
      } else if (first > 239 && first < 256) {
        counter.ipE++;
      }
    }
  });
  console.log(
    counter.ipA +
      " " +
      counter.ipB +
      " " +
      counter.ipC +
      " " +
      counter.ipD +
      " " +
      counter.ipE +
      " " +
      counter.ipMaskErr +
      " " +
      counter.privateIp
  );
}
ipTest();
