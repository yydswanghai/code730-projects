<template>
    <div class="logo h-16 leading-normal flex items-center justify-center overflow-hidden whitespace-normal">
        <img src="~@/assets/images/logo.png" :class="{ 'mr-2': !collapsed }" class="h-8 w-auto" />
        <h2 v-show="!collapsed" class="mb-0">NaiveUiAdmin</h2>
    </div>
</template>

<script>
export default {
    name: 'Logo',
    props: {
        collapsed: Boolean
    }
}
</script>