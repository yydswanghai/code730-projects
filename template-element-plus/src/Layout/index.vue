<template>
    <el-container class="layout">
        <el-aside
            v-if="showAside"
            class="layout-aside"
            :style="asideStyles"
        >
            <Logo :collapsed="collapsed" />
            <el-button @click="collapsed = !collapsed">切换</el-button>
            <Menu :collapsed="collapsed"  >

            </Menu>
        </el-aside>

        <el-drawer
            direction="ltr"
            :with-header="false"
            v-model="showSideDrawder"
        >
            <Logo :collapsed="collapsed" />
            <Menu :collapsed="collapsed"  >

            </Menu>
        </el-drawer>
    </el-container>
</template>

<script lang="ts">
import { defineComponent, ref, computed, onMounted } from "vue"
import { useRoute } from 'vue-router'
import { useProjectSettingStore } from '@/store/modules/projectSetting'
import { Logo } from "./components/Logo/"
import { Menu } from "./components/Menu/"

export default defineComponent({
    name: "Layout",
    components: {
        Logo,
        Menu,
    },
    setup(){
        const collapsed = ref(false);
        const settingStore = useProjectSettingStore();
        const $route = useRoute();
        /* 导航栏模式 */
        const navMode = computed(() => settingStore.navMode);
        /* 导航栏风格 */
        const navTheme = computed(() => settingStore.navTheme);
        /* 是否为手机端 */
        const isMobile = computed({
            get: () => settingStore.isMobile,
            set: (val) => settingStore.setIsMobile(val)
        });
        /* 混合菜单模式并开启分割菜单且没有子路由 */
        const isMixMenuNoneSub = computed(() => {
            const { mixMenu } = settingStore.menuSetting;// 分割菜单
            if(navMode.value === 'horizontal-mix' && mixMenu && $route.meta.isRoot){
                return false
            }
            return true
        });
        /* 显示侧边栏 */
        const showAside = computed(() => {
            return !isMobile.value && isMixMenuNoneSub.value &&
            (navMode.value === 'vertical' || navMode.value === 'horizontal-mix')
        });
        /* 侧边栏样式 */
        const asideStyles = computed(() => {
            return {
                width: (collapsed.value ?
                    settingStore.menuSetting.minMenuWidth :
                    settingStore.menuSetting.menuWidth) + 'px'
            }
        });
        /* 控制显示或隐藏移动端侧边栏 */
        const showSideDrawder = computed({
            get: () => isMobile.value && collapsed.value,
            set: (val) => (collapsed.value = val)
        });
        /* 判断是否触发移动端模式 */
        function checkMobileMode() {
            const { mobileWidth } = settingStore.menuSetting;
            if(document.body.clientWidth <= mobileWidth){
                isMobile.value = true;
            }else{
                isMobile.value = false;
            }
            collapsed.value = false;
        }
        /* 监听屏幕宽度改变 */
        function watchScreenWidth() {
            const { mobileWidth } = settingStore.menuSetting;
            if(document.body.clientWidth <= mobileWidth){
                collapsed.value = true
            }else{
                collapsed.value = false
            }
            // checkMobileMode()
        }

        onMounted(() => {
            checkMobileMode()
            window.addEventListener('resize', watchScreenWidth)
        })

        return {
            collapsed,
            asideStyles,
            showAside,
            showSideDrawder
        }
    }
})
</script>
<style lang="scss" scoped>
.layout{
    
}
.layout-aside{
    transition: width .6s;
}
</style>