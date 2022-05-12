> array.prototype.reduce

> https://www.cnblogs.com/Leophen/p/12505792.html

### 示范

```js
      const data = [
        {
          name: '数据筛查',
          value: 100
        },
        {
          name: '确定对象',
          value: 75
        },
        {
          name: '实施检查',
          value: 50
        }
      ];
      const sum = data.reduce((a, b) => {
        return a + b.value;
      }, 0);
```

