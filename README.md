> npm i yz-clipboard
### 示例
```javascript
// 先全局配置复制成功和复制失败的回调方法
// main.js
import { clipConfig } from 'yz-clipboard'
clipConfig({
  successText: '复制成功！',
  errorText: '复制失败'
  success: msg => console.log(msg)
  error: msg => console.log(msg)
})
```
```javascript
// 复制
// demo.vue
<template>
  <div>
    <p>{{ text }}</p>
    <button @click="onCopy">复制</button>
    <button @click="onCustomCopy">复制（定制提示信息）</button>
  </div>
</template>

<script>
  import { clipCopy } from 'yz-clipboard'
  export default {
    name: 'demo',
    data() {
      return { text: 'hello world' }
    },
    methods: {
      onCopy(event) {
        clipCopy({
          event,
          data: this.text
        })
      },
      onCustomCopy(event) {
        clipCopy({
          event,
          data: this.text,
          successText: '订单号复制成功',
          success() {
            // 复制成功后的业务逻辑
          },
          error() {
            // 复制失败后的业务逻辑
          }
        })
      }
    }
  }
</script>
```

### 文档

这个包仅仅是对clipboard.js的上层封装。对外暴露两个方法，一个是配置方法clipConfig，一个是复制方法clipCopy。

方法名称 | 说明 | 参数类型 | 返回值
-|-|-|-
clipConfig | 配置方法，用来配置复制成功和复制失败的提示信息 | Object | 无
clipCopy | 复制方法 | Object |无

#### clipConfig参数
参数名称 | 参数类型 | 是否必须 | 说明
-|-|-|-
successText | String | 否 | 全局复制成功的提示信息
errorText | String | 否 | 全局复制失败的提示信息
success | Function | 否（建议配置） | 全局复制成功的提示方法，主要用来展示提示信息
error | Function | 否（建议配置） | 全局复制失败的提示方法，主要用来展示提示信息
#### clipCopy参数
参数名称 | 参数类型 | 是否必须 | 说明
-|-|-|-
event | -- | 是 | DOM Event对象
data | String | 是 | 被复制的数据
successText | String | 否 | 此次复制成功的提示信息
errorText | String | 否 | 此次复制失败的提示信息
success | Function | 否 | 复制成功后的回调方法，主要用来处理业务回调
error | Function | 否 | 复制失败后的回调方法，主要用来处理业务回调