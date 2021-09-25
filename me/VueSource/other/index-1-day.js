let o = {
  el: "app",
  data: {
    test: "$TEST",
    hello: "$HELLO",
  },
};
let template = document.querySelector("#" + o.el);
let reg = /\{\{(.+?)\}\}/g;
let generateNode = template.cloneNode( true );


let app = new Vue(o);


function Vue(o) {
  let data = o.data;
  compile(generateNode , data);
}
function compile(template, data) {
  let childNodes = template.childNodes;
  for (let i = 0; i < childNodes.length; i++) {
    let nodeType = childNodes[i].nodeType;
    // 元素节点
    if (nodeType === 1) {
      compile(
        childNodes[i], data
      )
    }
    // 文本节点
    else if (nodeType === 3) {
      let txt = childNodes[i].nodeValue.trim();
      if (txt) {
        // 第一个参数 匹配内容, 第二个参数是 原子组
        txt = txt.replace(reg, (_, g) => {
          let key = g.trim();
          let value = data[key];
          return value;
        });
        childNodes[i].nodeValue = txt;
      }
    }
  }
  
}
/* 
// 不过此时未生成新的模板, 且会直接修改母版的内容，
  为什么不修改母版的内容？ 因为 母版中的双括号是与其他内容是需要作为后续操作标识的 
*/
// 使用 新的dom去渲染！
let root =  document.querySelector('#app');
root.parentNode.replaceChild(
  generateNode, 
  root
)
// 保留了母版
console.log(template)

/* 
  1 vue使用的是虚拟dom， 我们并非虚拟dom！
  2 只考虑单属性， 而Vue存在层级 {{obj.name}}
  3 代码整合
*/
