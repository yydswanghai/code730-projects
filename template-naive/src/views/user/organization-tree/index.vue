<template>
    <div class="tree-container">
        <NTree
            block-line
            :data="data"
            :default-expanded-keys="defaultExpandedKeys"
            :render-switcher-icon="renderSwitcherIcon"
            selectable
        />
    </div>
</template>

<script>
import { ref } from "vue"
import { repeat } from "seemly"
import { ChevronForward } from "@vicons/ionicons5"
import { renderIcon } from '@/utils/'

function createData(level = 4, baseKey = "") {
    if (!level)
        return void 0;
    return repeat(6 - level, void 0).map((_, index) => {
        const key = "" + baseKey + level + index;
        return {
        label: createLabel(level),
        key,
        children: createData(level - 1, key)
        };
    });
}
function createLabel(level) {
    if (level === 4)
        return "道生一";
    if (level === 3)
        return "一生二";
    if (level === 2)
        return "二生三";
    if (level === 1)
        return "三生万物";
    return "";
}

export default {
    name: 'OrganizationTree',
    components: {
        ChevronForward,
    },
    setup(){
        return {
            data: createData(),
            defaultExpandedKeys: ref(['40', '41']),
            renderSwitcherIcon: renderIcon(ChevronForward)
        }
    }
}

</script>
<style lang="less" scoped>
.tree-container{
    background: aliceblue;
}
</style>