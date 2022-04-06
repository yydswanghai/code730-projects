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
