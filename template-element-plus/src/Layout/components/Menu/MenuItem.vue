<script lang="tsx">
import { defineComponent, PropType } from "vue"
import { IRouteRecordRaw } from "@/router/types"
import { ElMenuItem, ElSubMenu, ElIcon } from "element-plus"
import { isExternal } from "@/utils/"
import { resolve } from "path-browserify"
const MenuItem = defineComponent({
    name: "MenuItem",
    props: {
        option: {
            type: Object as PropType<IRouteRecordRaw>,
            required: true,
        },
        isRoot: {// true 表示一级路由 false 表示非一级路由
            type: Boolean,
            default: true
        },
        basePath: {// 基础路径
            type: String,
            default: ''
        }
    },
    setup(props, ctx){
        const currentRouter = props.option!;// 当前路由
        /**
         * 一级路由确定有children，子路由不确定有children
         * 1. 一级路由，设置了"alwaysShow"，有children（1个或0个）渲染：<el-menu-item>
         * 2. 子路由，但是没有children 渲染：<el-menu-item>
         * 3. 一级路由，仅有一个children，但是children还有children 渲染：<el-sub-menu>
         * 4. 其他渲染：<el-sub-menu>
         */
        function isRootRouter(router: IRouteRecordRaw) {
            if(props.isRoot && !router.meta?.alwaysShow){
                if(router.children?.length === 0){
                    return true;
                }
                if(router.children?.length === 1){
                    if(router.children[0].children?.length){
                        return false;
                    }else{
                        return true;
                    }
                }
            }
            if(!props.isRoot && !router.children){
                return true;
            }
            return false;
        }
        /**
         * 处理路径跳转
         */
        function resolvePath(routePath: string) {
            if(isExternal(routePath)){
                return routePath;
            }
            if(isExternal(props.basePath)){
                return props.basePath;
            }
            return resolve(props.basePath, routePath);
        }
        return () => {
            if(!currentRouter.meta?.hidden){
                if(isRootRouter(currentRouter)){
                    return <ElMenuItem index={resolvePath(currentRouter.path)}
                                v-slots={{ 'title': () => {
                                    return (<><span>{currentRouter.meta?.title}</span></>)
                                } }}>
                            {currentRouter.meta?.icon && <ElIcon class="aside-menu-icon">{ currentRouter.meta?.icon }</ElIcon>}
                        </ElMenuItem>
                }else{
                    return <ElSubMenu index={resolvePath(currentRouter.path)} v-slots={{ 'title': () => {
                        return (<>
                            {currentRouter.meta?.icon && <ElIcon class="aside-menu-icon">{ currentRouter.meta?.icon }</ElIcon>}
                            <span>{currentRouter.meta?.title}</span>
                        </>)
                    } }}>
                        {
                            currentRouter.children?.map(child => {
                                return <MenuItem option={child} isRoot={false} basePath={resolvePath(child.path)} />
                            })
                        }
                    </ElSubMenu>
                }
            }
        }
    }
})

export default MenuItem;
</script>
<style lang="scss" scoped>
</style>