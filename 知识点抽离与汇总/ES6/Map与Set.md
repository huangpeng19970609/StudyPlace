## Map

> 我们为什么要在JS中使用Map？换言之，Map数据结构在计算机中的优势是什么?
>
> 1. 键值对结构 
>
>    - 当然 object也是一种键值对的结构！而object的键只能为string， 
>
>      不过由于object的存在的原型链，你可能会无意设置了一个相同的键名
>
>    直接根据键名找到对应的值，可以实现类似数组结构，并且去重
>
> 2. Map的键为任意值。
>
>    一个`Object` 的键必须是一个 [`String`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/String) 或是[`Symbol`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Symbol)
>
>    但是Map的键是随便的！它真的可以是任意值！但要注意引用类型的堆地址。
>
> 3. Map的键是有序的，而Object的键是无顺序的
>
>    虽然浏览器打印的结果貌似有序，但这是控制台帮我进行了排序的优化

----

<img src="../images/image-20211005152811817.png" alt="image-20211005152811817" style="zoom: 80%;" />

#### 二维数组与Map

1. `二维数组`转为`Map类型`

   ````js
   let kvArray = [["key1", "value1"], ["key2", "value2"]];
   let myMap = new Map(kvArray);
   ````

2. Map类型转为二维数组

   ````js
   Array.from(myMap)
   [...myMap] // 这样更简便
   ````

3. 获取map的所有key集合的数组

   ````js
   Array.from(myMap.keys())
   ````

## Set

#### add

add() 方法用来向一个 `Set` 对象的末尾添加一个指定的值。

````js
const set1 = new Set()
set1.add(1);
````

#### clear

用来清空一个 `Set` 对象中的所有元素

```js
# 删除
mySet.clear();

mySet.size;       // 0
mySet.has("bar")  // false
```

#### delete

可以从一个 `Set` 对象中删除指定的元素。

````js
mySet.add("foo");
mySet.delete("foo"); // 返回 true，删除成功
````

#### entries

> entries() 方法返回一个新的迭代器对象 ，这个对象的元素是类似 [value, value] 形式的数组，value 是集合对象中的每个元素，迭代器对象元素的顺序即集合对象中元素插入的顺序。由于集合对象不像 Map 对象那样拥有 key，然而，为了与 Map 对象的 API 形式保持一致，故使得每一个 entry 的 key 和 value 都拥有相同的值，因而最终返回一个 [value, value] 形式的数组。

[返回值](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Set/entries#返回值)

一个新的包含 [value, value] 形式的数组迭代器对象，value 是给定集合中的每个元素，迭代器 对象元素的顺序即集合对象中元素插入的顺序。

```js
var setIter = mySet.entries();

console.log(setIter.next().value); // ["foobar", "foobar"]
console.log(setIter.next().value); // [1, 1]
console.log(setIter.next().value); // ["baz", "baz"]
```

#### forEach

高阶函数迭代

````js
function logSetElements(value1, value2, set) {
    console.log("[" + value1 + "] = " + value2);
}

new Set(["foo", "bar", undefined]).forEach(logSetElements);

// "[foo] = foo"
// "[bar] = bar"
// "[undefined] = undefined"
````

#### has

**has()** 方法返回一个布尔值来指示对应的值value是否存在Set对象中。

````js
mySet.has(value);
````

#### keys与values

返回其迭代器属性·

```js
let set = new Set(
  ['1', '1', 'me', {a: 1}]
)

set.values()
set.keys()
```

