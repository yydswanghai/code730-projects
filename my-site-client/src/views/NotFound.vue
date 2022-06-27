<template>
    <div class="not-found-container">
        <img src="@/assets/404.webp" alt="">
    </div>
</template>

<script>
export default {}
</script>

<style scoped lang="less">
.not-found-container{
    background: #90cbc0;
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    img{
        width: 100%;
        height: 100%;
        object-fit: cover;
    }
}
</style>