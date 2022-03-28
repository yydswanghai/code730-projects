import { reactive, readonly } from "vue";
/**
 * 标签
 */
const state = reactive({
    visitedViews: [],// 用户访问过的页面 就是标签栏导航显示的一个个 tag 数组集合
    cachedViews: []// 实际 keep-alive 的路由。可以在配置路由的时候通过 meta.noCache 来设置是否需要缓存这个路由 默认都缓存。
})

export const tagsViewStore = readonly(state)

export async function addView(view) {
    /* add visited */
    if(state.visitedViews.some(v => v.path === view.path)) return
    state.visitedViews.push(
        Object.assign({}, view, {
            title: view.meta.title || 'no-name'
        })
    )
    /* add cached */
    if (state.cachedViews.includes(view.name)) return
    if(!view.meta.noCache){
        state.cachedViews.push(view.name)
    }
}

export async function delView(view) {
    /* del visited */
    for (const [i, v] of state.visitedViews.entries()) {
        if(v.path === view.path){
            state.visitedViews.splice(i, 1)
            break
        }
    }
    /* del cached */
    const index = state.cachedViews.indexOf(view.name)
    index > -1 && state.cachedViews.splice(index, 1)

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

export async function delAllViews(view) {
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

export async function updateVisitedView(view) {
    for (const v of state.visitedViews) {
        if(v.path === view.path){
            v = Object.assign(v, view)
            break
        }
    }
}