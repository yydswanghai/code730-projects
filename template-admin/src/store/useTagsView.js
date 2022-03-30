import { reactive, readonly } from "vue";
/**
 * @description 标签
 */
const state = reactive({
    visitedViews: [],// 用户访问过的页面 就是标签栏导航显示的一个个 tag 数组集合
    cachedViews: []// 实际 keep-alive 的路由。可以在配置路由的时候通过 meta.noCache 来设置是否需要缓存这个路由 默认都缓存。
})

export const tagsViewStore = readonly(state)

/**
 * 仅添加tag
 */
export async function addVisitedView(view) {
    // 如果存在则返回，否则添加进去
    if(state.visitedViews.some(v => v.path === view.path)) return
    state.visitedViews.push(
        Object.assign({}, view, {
            title: view.meta.title || 'no-name'
        })
    )
}
/**
 * 添加tag并缓存
 */
export async function addView(view) {
    /* add visited */
    addVisitedView(view)
    /* add cached */
    if (state.cachedViews.includes(view.name)) return
    if(!view.meta.noCache){
        state.cachedViews.push(view.name)
    }
}

/**
 * 删除缓存tag
 */
export async function delCachedView(view) {
    const index = state.cachedViews.indexOf(view.name)
    index > -1 && state.cachedViews.splice(index, 1)
}
/**
 * 删除tag和缓存的tag
 */
export async function delView(view) {
    /* del visited */
    for (const [i, v] of state.visitedViews.entries()) {
        if(v.path === view.path){
            state.visitedViews.splice(i, 1)
            break
        }
    }
    /* del cached */
    delCachedView(view)

    return {
        visitedViews: [...state.visitedViews],
        cachedViews: [...state.cachedViews]
    }
}

export async function delOthersViews(view) {
    /* del other visited */
    state.visitedViews = state.visitedViews.filter(v => {
        return v.meta.affix || v.path === view.path
    })
    /* del other cached */
    const index = state.cachedViews.indexOf(view.name)
    if (index > -1) {
        state.cachedViews = state.cachedViews.slice(index, index + 1)
    } else {
    // if index = -1, there is no cached tags
        state.cachedViews = []
    }

    return {
        visitedViews: [...state.visitedViews],
        cachedViews: [...state.cachedViews]
    }
}
/**
 * 清空所有tag，重置缓存
 */
export async function delAllViews() {
    /* del all visited */
    // keep affix tags
    const affixTags = state.visitedViews.filter(tag => tag.meta.affix)
    state.visitedViews = affixTags
    /* del all cached */
    state.cachedViews = []

    return {
        visitedViews: [...state.visitedViews],
        cachedViews: [...state.cachedViews]
    }
}
/**
 * 更新 visitedViews
 */
export async function updateVisitedView(view) {
    for (let item of state.visitedViews) {
        if(item.path === view.path){
            item = Object.assign(item, view)
            break
        }
    }
}