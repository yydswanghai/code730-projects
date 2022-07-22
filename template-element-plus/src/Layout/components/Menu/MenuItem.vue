<script lang="tsx">
import { defineComponent, PropType, VNode, computed } from 'vue'
import { IRouteRecordRaw } from '@/router/types'
import { ElMenuItem, ElSubMenu } from 'element-plus'
import { resolve } from 'path-browserify'
import { isExternal } from '@/utils/'
import { useProjectSettingStore } from '@/store/modules/projectSetting'

const MenuItem = defineComponent({
    name: 'MenuItem',
    props: {
        option: {
            type: Object as PropType<IRouteRecordRaw>,
            required: true,
        },
        isRoot: {// true 表示一级路由 false 表示非一级路由
            type: Boolean,
            default: true
        },
        basePath: String,
        location: String
    },
    setup(props){
        const settingStore = useProjectSettingStore();
        const navIsHead = computed(() => {
            if(settingStore.navMode === 'horizontal' || settingStore.navMode === 'horizontal-mix'){
                return true;
            }
            return false;
        });
        let currentRouter = props.option!;// 当前路由
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
        function getIndex(path: string) {
            if(isExternal(path)){
                const url = path.replace(/(^\/*)|(\/*$)/g, '');// 去除字符串最前面的'/’
                return url;
            }
            if(props.isRoot){
                return resolve(props.basePath!)
            }else{
                return resolve(props.basePath!, path)
            }
        }
        return () => {
            const notSubItem = <ElMenuItem
                        index={getIndex(currentRouter.path)}
                        data-index={getIndex(currentRouter.path)}
                        v-slots={{ 'title': () => { return (<><span>{currentRouter.meta?.title}</span></>) } }}>
                        {currentRouter.meta?.icon && (currentRouter.meta?.icon as () => VNode)()}
                    </ElMenuItem>
            // 单独渲染混合菜单header菜单
            if(props.location === 'header' && settingStore.navMode === 'horizontal-mix'){
                return notSubItem
            }else{
                if(isRootRouter(currentRouter)){
                    return notSubItem
                }else{
                    return <ElSubMenu class="i-menu" popperClass={navIsHead.value ? 'i-popper-head-menu i-popper-menu': 'i-popper-menu'} data-url={getIndex(currentRouter.path)} index={getIndex(currentRouter.path)} v-slots={{ 'title': () => {
                        return (<>
                            {currentRouter.meta?.icon && (currentRouter.meta?.icon as () => VNode)()}
                            <span>{currentRouter.meta?.title}</span>
                        </>)
                    } }}>
                        {
                            currentRouter.children?.map(child => {
                                return <MenuItem option={child} isRoot={false} basePath={getIndex(currentRouter.path)} />
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