<template>
  <div
    class="carousel-item-container"
    ref="container"
    @mousemove="handleMouseMove"
    @mouseleave="handleMouseLeave"
  >
    <div class="carousel-img" :style="imagePosition" ref="image">
      <ImageLoader
        :src="carousel.bigImg"
        :placeholder="carousel.midImg"
        @load="showWords"
      />
    </div>
    <div class="title" ref="title">{{ carousel.title }}</div>
    <div class="desc" ref="desc">{{ carousel.description }}</div>
  </div>
</template>

<script>
import ImageLoader from "@/components/ImageLoader";
export default {
  props: ["carousel"],
  components: {
    ImageLoader,
  },
  data() {
    return {
      titleWidth: 0, // title的宽度
      descWidth: 0, // desc的宽度
      containerSize: null, // 外层容器的尺寸
      innerSize: null, // 里层图片的尺寸
      mouseX: 0, // 鼠标的横坐标
      mouseY: 0, // 鼠标的纵坐标
    };
  },
  computed: {
    // 得到图片的位置
    // 鼠标位置 / 图片坐标
    // left / this.mouseX = -this.extraWidth / this.containerSize.width
    imagePosition() {
      if (!this.innerSize || !this.containerSize) {
        return;
      }
      const extraWidth = this.innerSize.width - this.containerSize.width; // 多出来的宽度
      const extraHeight = this.innerSize.height - this.containerSize.height; // 多出来的高度
      const left = (-extraWidth / this.containerSize.width) * this.mouseX;
      const top = (-extraHeight / this.containerSize.height) * this.mouseY;
      return {
        transform: `translate(${left}px, ${top}px)`,
      };
    },
    // 中间的位置
    center() {
      return {
        x: this.containerSize.width / 2,
        y: this.containerSize.height / 2,
      };
    },
  },
  mounted() {
    this.titleWidth = this.$refs.title.clientWidth;
    this.descWidth = this.$refs.desc.clientWidth;

    this.setSize();
    this.mouseX = this.center.x;
    this.mouseY = this.center.y;
    window.addEventListener("resize", this.setSize);
  },
  destroyed() {
    window.removeEventListener("resize", this.setSize);
  },
  methods: {
    // 调用该方法显示文字（过渡显示的文字）
    showWords() {
      this.$refs.title.style.opacity = 1;
      this.$refs.title.style.width = 0;
      // 强制让浏览器渲染一次
      this.$refs.title.clientHeight; // reflow
      this.$refs.title.style.transition = "1s";
      this.$refs.title.style.width = this.titleWidth + "px";

      this.$refs.desc.style.opacity = 1;
      this.$refs.desc.style.width = 0;
      // 强制让浏览器渲染一次
      this.$refs.desc.clientHeight; // reflow
      this.$refs.desc.style.transition = "2s 1s"; // 描述延迟一秒
      this.$refs.desc.style.width = this.descWidth + "px";
    },
    // 设置容器大小
    setSize() {
      this.containerSize = {
        width: this.$refs.container.clientWidth,
        height: this.$refs.container.clientHeight,
      };
      this.innerSize = {
        width: this.$refs.image.clientWidth,
        height: this.$refs.image.clientHeight,
      };
    },
    // 鼠标滚动事件  获取鼠标的坐标 mouseX和mouseY
    handleMouseMove(e) {
      const rect = this.$refs.container.getBoundingClientRect(); // 得到一个矩形信息
      this.mouseX = e.clientX - rect.left;
      this.mouseY = e.clientY - rect.top;
    },
    // 鼠标离开事件
    handleMouseLeave() {
      this.mouseX = this.center.x;
      this.mouseY = this.center.y;
    },
  },
};
</script>

<style lang="less" scoped>
@import "~@/styles/var.less";
@import "~@/styles/mixin.less";
.carousel-item-container {
  width: 100%;
  height: 100%;
  color: #fff;
  position: relative;
  overflow: hidden;
  .carousel-img {
    width: 110%;
    height: 110%;
    position: absolute;
    left: 0;
    top: 0;
    transition: 0.3s;
  }
  .title,
  .desc {
    position: absolute;
    color: #fff;
    left: 30px;
    white-space: nowrap;
    overflow: hidden;
    letter-spacing: 3px;
    opacity: 0;
    /* 文字描边 防止背景色和文字颜色相同是看不到文字 */
    text-shadow: 1px 0 0 rgba(0, 0, 0, 0.5), -1px 0 0 rgba(0, 0, 0, 0.5),
      0 1px 0 rgba(0, 0, 0, 0.5), 0 -1px 0 rgba(0, 0, 0, 0.5);
  }
  .title {
    font-size: 2em;
    top: calc(50% - 40px);
  }
  .desc {
    font-size: 1.2em;
    top: calc(50% + 20px);
    color: lighten(@gray, 20%);
  }
}
</style>