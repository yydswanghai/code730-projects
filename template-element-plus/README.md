## element-plus vue3 + ts 中后台模版

1. 使用按需引入组件，自动生成的目录在`src`下的`components.d.ts`

2. 暗色模式：调用`composables/index`目录里的`toggleDark`方法就可以切换

3. 主题色：组件库颜色被`styles/element/index.scss`重置，颜色变量在`var.scss`，暗主题色一样

4. icon组件的使用：

注意：`icons`目录下生成组件，并统一导出时命名都是大驼峰式命名法（首字母也要大写）
后台接口请求到的`icon`实际是一个字符串，转换为组件后也要跟这个命名保持一致才会正确加载。
所以接口请求到的`icon`统一使用的是`icons`目录下的组件

详情：https://www.npmjs.com/package/vite-svg-loader

- 如果你仅需要作为图片使用，请在路经后加`?url`

```html
<img src="~@/icons/avatar/avatar-1.svg?url"/>
```

- 如果你是作为组件使用，请在路经后加`?component`，vite-svg-loader插件会将导入的svg地址转换为vue组件。

```html
<template>
    <el-icon :size="32" class="icon">
        <AsideLogo />
    </el-icon>
</template>

<script lang="ts">
import AsideLogo from "@/assets/logo/logo-2.svg?component"

export default defineComponent({
    components: { AsideLogo }
})
</script>
```

5. 关于在src目录下使用node的`path`模块，因为vite源码中设定了不允许在客户端代码中访问内置模块代码。
所以这里使用一个实现了`path`模块的`path-browserify`

```sh
npm i path-browserify
npm install --save @types/path-browserify
```