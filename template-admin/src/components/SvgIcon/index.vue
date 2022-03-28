<template>
  <svg :class="svgClass" aria-hidden="true">
    <use :xlink:href="href" :fill="color" />
  </svg>
</template>

<script>
import { computed } from 'vue'
export default {
    name: 'SvgIcon',
    props: {
        iconName: {
            type: String,
            required: true
        },
        iconClass: {
            type: String,
            default: ''
        },
        color: {
            type: String,
            default: ''
        },
    },
    setup(props){
        return {
            href: computed(() => `#icon-${props.iconName}`),
            svgClass: computed(() => {
                if (props.iconClass) {
                    return `svg-icon ${props.iconClass}`
                }
                    return 'svg-icon'
            })
        }
    }
}
</script>

<style scoped>
.svg-icon {
  width: 1em;
  height: 1em;
  position: relative;
  fill: currentColor;
  vertical-align: -2px;
}
</style>