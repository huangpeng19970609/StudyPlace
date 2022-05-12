https://www.baidu.com/s?ie=utf-8&f=8&rsv_bp=1&tn=baidu&wd=Javascript%E7%9A%84%E8%A7%A3%E6%9E%90%E6%B5%81%E7%A8%8B%20%E7%9F%A5%E4%B9%8E&oq=Javascript%25E7%259A%2584%25E8%25A7%25A3%25E6%259E%2590%25E6%25B5%2581%25E7%25A8%258B&rsv_pq=8c669bab0002de38&rsv_t=2415gqBXetBwH6nn4wdURBDs1vS%2FDjjfewJDgigsdoP6oOiC5A5M%2BsHGYSM&rqlang=cn&rsv_enter=1&rsv_dl=tb&rsv_btype=t&inputT=995&rsv_sug3=62&rsv_sug1=32&rsv_sug7=100&rsv_sug2=0&rsv_sug4=1251



https://www.cnblogs.com/tugenhua0707/p/11980566.html

### 00 | 一些被忽略的事情

1. 引擎

   Chrome浏览器 的 【解析引擎】为 V8 (由c++实现的)

2. 预解析的报错

   javascript解析过程中，如果遇到错误，会直接跳出下一个script代码块，而不会影响下一个script的代码块

   （❗ JavaScript的解析过程是【运行阶段】， 预解析、执行阶段都是指 解析， 具体看我们的语境）

3. 

### 01 | 解析引擎解析JS

1. 语法检查阶段
   - 词法分析
   - 语法分析
2. 运行阶段
   - 预解析
   - 执行阶段

### 02 | 语法检查阶段

### 03 | 运行阶段