<template>
  <div v-loading="loading" class="home-container" ref="container" @wheel="handleWheel">
    <ul class="carousel-container" :style="{ marginTop }" @transitionend="handleTransitionEnd">
      <!-- 有v-for指令的会先运行v-for然后运行其他指令 -->
      <li v-for="item in data" :key="item.id">
        <CarouselItem :carousel="item" />
      </li>
    </ul>
    <div @click="switchTo(index-1)" v-show="index >= 1" class="icon icon-up">
      <Icon type="arrowUp" />
    </div>
    <div @click="switchTo(index+1)" v-show="index < data.length - 1" class="icon icon-down">
      <Icon type="arrowDown" />
    </div>
    <!-- 指示器 -->
    <ul class="indicator">
      <li
        @click="switchTo(i)" 
        :class="{
          active: i === index,
        }"
        v-for="(item, i) in data"
        :key="item.id"
      ></li>
    </ul>
  </div>
</template>

<script>
import CarouselItem from "./CarouselItem";
import Icon from "@/components/Icon";
import {mapState} from "vuex";

export default {
  // 混入配置
  components: {
    CarouselItem,
    Icon,
  },
  data() {
    return {
      index: 0, // 当前显示的是第几张轮播图(相当于数组里面的索引)
      containerHeight: 0, // 整个容器高度
      switching: false, // 是否正在切换中
    };
  },
  created(){
    this.$store.dispatch("banner/fetchBanner")
  },
  mounted() {
    this.handleResize();
    // window事件在组件注册后，在组件销毁的时候一定要移除
    window.addEventListener("resize", this.handleResize);
  },
  destroyed() {
    window.removeEventListener("resize", this.handleResize);
  },
  computed: {
    marginTop() {
      return -this.index * this.containerHeight + "px";
    },
    ...mapState("banner", ["loading", "data"])
  },
  methods: {
    // 获取容器高度
    handleResize() {
      this.containerHeight = this.$refs.container.clientHeight;
    },
    // 切换轮播图
    switchTo(i){
      this.index = i;
    },
    // 鼠标滚轮事件
    handleWheel(e){
      // deltaY Y轴滚动距离
      if(this.switching){
        return;
      }
      if(e.deltaY < -5 && this.index > 0){// 往上滚动
        this.switching = true;
        this.index--;
      }else if(e.deltaY > 5 && this.index < this.data.length - 1){// 往下滚动
        this.switching = true;
        this.index++;
      }
    },
    // 过渡效果结束事件
    handleTransitionEnd(){
      this.switching = false;// 切换完成后改为false 表示可以切换
    }
  },
};
</script>

<style lang="less" scoped>
@import "~@/styles/mixin.less";
@import "~@/styles/var.less";
.home-container {
  width: 100%;
  height: 100%;
  overflow: hidden;
  position: relative;
  ul {
    margin: 0;
    padding: 0;
    list-style: none;
  }
}
.carousel-container {
  width: 100%;
  height: 100%;
  transition: .5s;
  li {
    width: 100%;
    height: 100%;
  }
}
.icon {
  .self-center();
  font-size: 30px;
  color: @gray;
  cursor: pointer;
  @gap: 25px;
  transform: translateX(-50%);
  &.icon-up {
    top: @gap;
    animation: jump-up 2s infinite;
  }
  &.icon-down {
    top: auto;
    bottom: @gap;
    animation: jump-down 2s infinite;
  }
  @jump: 5px;
  @keyframes jump-up {
    0% {
      transform: translate(-50%, @jump);
    }
    50% {
      transform: translate(-50%, -@jump);
    }
    100% {
      transform: translate(-50%, @jump);
    }
  }
  @keyframes jump-down {
    0% {
      transform: translate(-50%, -@jump);
    }
    50% {
      transform: translate(-50%, @jump);
    }
    100% {
      transform: translate(-50%, -@jump);
    }
  }
}
.indicator {
  .self-center();
  transform: translateY(-50%);
  left: auto;
  right: 20px;
  li {
    width: 8px;
    height: 8px;
    background: @words;
    border: 1px solid #fff;
    margin: 5px 0;
    border-radius: 50%;
    cursor: pointer;
    box-sizing: border-box;
    transition: 0.5s;
    &.active {
      background: #fff;
    }
  }
}
</style>