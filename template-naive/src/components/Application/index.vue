<template>
    <NLoadingBarProvider>
        <NDialogProvider>
            <DialogContent />
            <NNotificationProvider>
                <NMessageProvider>
                    <MessageContent />
                    <slot slot="default"></slot>
                </NMessageProvider>
            </NNotificationProvider>
        </NDialogProvider>
    </NLoadingBarProvider>
</template>

<script>
/**
 * 这个组件主要用来做一个全局挂载
 * 这里将 $message 和 $dialog 添加在window对象上方便后续在js里直接使用
 */
import MessageContent from '@/components/MessageContent/index.vue'
import DialogContent from '@/components/DialogContent/index.vue'
export default {
    name: 'Application',
    components: {
        MessageContent,
        DialogContent,
    },
}
</script>
