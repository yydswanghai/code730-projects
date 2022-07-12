<template>
    <div class="header-right">
        <div class="trigger" v-if="showInput">
            <el-input v-model="inputVal" placeholder="please input"></el-input>
        </div>
        <div class="trigger">
            <el-tooltip placement="bottom">
                <el-icon :size="18" @click="showInput = !showInput"><Search /></el-icon>
                <template #content>
                    <span>搜索</span>
                </template>
            </el-tooltip>
        </div>
        <div class="trigger">
            <el-tooltip placement="bottom">
                <el-icon :size="18"><Github /></el-icon>
                <template #content>
                    <a href="https://github.com/" target="_blank">github</a>
                </template>
            </el-tooltip>
        </div>
        <div class="trigger">
            <el-tooltip placement="bottom">
                <el-icon :size="18">
                    <component :is="fullscreenIcon" @click="toggleFullScreen" />
                </el-icon>
                <template #content>
                    <span>全屏</span>
                </template>
            </el-tooltip>
        </div>
        <div class="trigger" @click="openSetting">
            <el-tooltip placement="bottom-end">
                <el-icon :size="18">
                    <Settings />
                </el-icon>
                <template #content>
                    <span>修改设置</span>
                </template>
            </el-tooltip>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted } from "vue"
import { useRouter } from 'vue-router'
import { Search } from "@element-plus/icons-vue"
import Github from "@/icons/github.svg?component"
import Fullscreen from "@/icons/fullscreen.svg?component"
import FullscreenExit from "@/icons/fullscreen-exit.svg?component"
import Settings from "@/icons/settings-outline.svg?component"

export default defineComponent({
    name: "HeaderLeft",
    components: {
        Search,
        Github,
        Fullscreen,
        FullscreenExit,
        Settings,
    },
    setup(){
        const $router = useRouter();
        const fullscreenIcon = ref('Fullscreen');
        const drawerSettingRef = ref(null);
        // 用户头像
        const avatar = ref('');
        const inputVal = ref('');
        const showInput = ref(false);
        const userOptions = [
            { label: '个人设置', key: 1 },
            { label: '退出登录', key: 2 },
        ]
        // 切换全屏图标
        function toggleFullscreenIcon() {
            fullscreenIcon.value = document.fullscreenElement !== null ? 'FullscreenExit' : 'Fullscreen';
        }
        // 全屏切换
        function toggleFullScreen() {
            if(!document.fullscreenElement){
                document.documentElement.requestFullscreen();
            }else{
                if(document.exitFullscreen){
                    document.exitFullscreen();
                }
            }
        }
        onMounted(() => {
            // 监听全屏切换事件
            document.addEventListener('fullscreenchange', toggleFullscreenIcon);
        })
        // 打开设置
        function openSetting() {
            // drawerSettingRef.value.openDrawer()
        }
        return {
            drawerSettingRef,
            fullscreenIcon,
            inputVal,
            showInput,
            toggleFullscreenIcon,
            toggleFullScreen,
            openSetting,
        }
    }
})
</script>
<style lang="scss" scoped>
    
</style>