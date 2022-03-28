<script lang="jsx">
/**
 * 1.引用element-plus icon: 使用时，在icon名称前补一个 'el-'
 * 2.本地引用: 直接使用 src/icons/svg/下的文件名
 */
import { ref, h, resolveDynamicComponent, resolveComponent } from "vue";

const Item = (props, context) => {
    const { icon, title } = props
    const vnodes = []
    if (icon) {
        if (icon.includes('el-')) {// el-list
            const Component = resolveDynamicComponent(icon.substr(3))// list
            vnodes.push(<el-icon class='sub-el-icon'><Component /></el-icon>)// <list />
        } else {
            vnodes.push(<svg-icon icon-name={icon} class='sub-el-icon' />)
        }
    }

    if (title) {// todo 这里需要将title放入父组件的插槽
        vnodes.push(<span v-slots="title">{ title }</span>)
    }
    return vnodes
}

Item.props = ['icon', 'title']

export default Item
</script>
<style lang="scss" scoped>
.sub-el-icon {
    color: currentColor;
    width: 1em;
    height: 1em;
    margin-right: 12px;
    margin-left: -2px;
}
</style>