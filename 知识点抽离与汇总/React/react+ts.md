### 01 | 特别

1. 键盘事件

   ```tsx
   const onInputKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) {
   	console.log(e)
   }
   ```

2. useRef

   ```tsx
     const selectRef = useRef<{
       blur: () => void
       focus: () => void
     }>(null)
   ```

3. onClick

   在 React 中分清楚是 DOM 的 MouseEvent，还是 React.MouseEvent

   ```jsx
   import { MouseEvent } from 'react'
   interface changeFn {
     (e: MouseEvent, key: number | string): void
   }
     
   const openSelect = (e: React.MouseEvent<HTMLElement>) => {
       e.stopPropagation()
   }
   ```

4. interface函数

   ```jsx
   interface changeFn {
     (key: number | string): void
   }
   ```

   

