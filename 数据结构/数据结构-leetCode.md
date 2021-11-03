> 题目： 大厂面试时，刷到1000题的时候可以保证80%的题目都是原题
>
> 如何在LeetCode上更好的刷题
>
> 1. 首先【学习面板】开始刷题 （这些都是面试的重点）
>
>    特点： 体系化、动画、详细的讲解是入门的不二法门。以此举一反三。
>
>    当你能做到以同一个算法， 多题一解才是真正理解。
>
>    - 初级算法
>    - 队列、栈、字符串、递归、二叉树、链表、哈希表、二叉查找、
>    - 深度优先、广度优先搜索、动态规划
>
> 2. 【题库】
>
>    - 从简单题目开始刷题
>
>    - 从通过率高的题目开始刷题
>
>    - 从高频题开始刷题
>
>    此外你应该 
>
>    1. 多看题解，即便你做出来了
>    2. 多去思考
>    3. 多写题解
>    4. 小灰的漫画图解
>
> 3. codeTop收录了一些较好的大厂面试题



## 一 搜索算法

### 1 二分查找法

- 搜索一个元素时。

  1. 两端闭
  2. while要等号
  3. mid必须 +-1

  ```js
  
  ```

- 搜索左右边界时

  1. if相等别反回，要用mid锁边界
  2. while要用小于号，如此才能不漏区间
  3. mid加一还是减一。 看区间的开与闭。

##### 1.1 while的判断

为什么while是小于等于呢？

```js
目标0 => [0, 4] => [0, 1] => [0, 0];

#此外
while (left <= right ) 条件中断为 left === right + 1 故[3, 2]无效, 依旧需要判断[0, 0]
左侧边界是保证返回值的

while (left < right)   条件中断为 left === right => 不再执行 while 故[0, 0] 无效
```

如果你偏偏要用这个烦人的家伙 你应该避免上述的情况

```js
while (left < right) { ... }
return nums[left] === target ? left : -1
```

##### 1.2 left、right与mid

为什么有时候left = mid + 1 有时候 left = mid呢？比如我们最近遇到的经典两道题目。指定元素与区间。

搜索区间所决定的。

```js
# 目标 0
1. [0, 10] => mid为5 => 此时我们应该是[0, 5] 还是[0, 4]呢？
   显然是[0, 4] 因为 mid为5已经被访问过了！
```

##### 1.3 关于区间

如下是一个经典利用二分查找区间的方式

- 为什么 right 为 mid， 而不是 mid + 1?

  1. 因为 length 为 nums， right 也为 nums.length！这令每次循环都是左闭右开的形式

     【left, left)的形式的时候我们不认为这是一个有效的区间

- 为声明不需要返回 - 1？

  1.  始终返回left的意义 例如

      [1, 2, 2, 2, 3]，目标是2.left 会返回 1， 它可以证明 nums小于等于2的至少有一个

     [2, 3, 5, 6] 目标是1， left返回0， nums小于1的元素有0个 例如 [0, 0)时。

  2. 「左侧边界」的特殊含义决定其不需要返回-1

  3. right = mid 就是在缩小【搜索区间】的上界。以达到锁定左侧的目的。

```js
function left_bound(nums, target) {
    if (nums.length == 0) return -1;
    int left = 0;
    int right = nums.length; // 注意
    while (left < right) { // 注意
        int mid = Math.floor((left + right) / 2);
        if (nums[mid] == target) {
            right = mid;
        } else if (nums[mid] < target) {
            left = mid + 1;
        } else if (nums[mid] > target) {
            right = mid; // 注意
        }
    }
    return left;
}
```



