## element-plus vue3 + ts 中后台模版

1. 使用按需引入组件，自动生成的目录在`src`下的`components.d.ts`

2. 暗色模式：调用`composables/index`目录里的`toggleDark`方法就可以切换

3. 主题色：组件库颜色被`styles/element/index.scss`重置，颜色变量在`var.scss`，暗主题色一样

4. icon组件的使用：

详情：https://www.npmjs.com/package/vite-svg-loader

vite-svg-loader插件会将导入的svg地址转换为vue组件。

注意：如果你要讲svg当图片使用，会使svg导入会失效，但是图片不受影响

```ts
import AsideLogo from "@/assets/images/logo/logo-2.svg?component"

export default defineComponent({
    components: { AsideLogo }
})
```

```html
<template>
    <el-icon :size="32" class="icon">
        <AsideLogo />
    </el-icon>
</template>
```

5. 关于在src目录下使用node的`path`模块，因为vite源码中设定了不允许在客户端代码中访问内置模块代码。
所以这里使用一个实现了`path`模块的`path-browserify`

```sh
npm i path-browserify
npm install --save @types/path-browserify
```