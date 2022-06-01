const obj = {};
let str = null;
while ((str = readline())) {
  let [path, line] = str.split(" ");
  // 截取文件名称 截取倒数16路径
  path = path.slice(path.lastIndexOf("\\") + 1).substr(-16);
  obj[`${path} ${line}`] = (obj[`${path} ${line}`] || 0) + 1;
}
Object.keys(obj)
  .slice(-8)
  .forEach((el) => {
    print(`${el} ${obj[el]}`);
  });
