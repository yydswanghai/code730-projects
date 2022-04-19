import { defineStore } from 'pinia'

// 不需要出现在标签页中的路由
const whiteList = ['Redirect', 'Login']

function retainAffixRoute(list) {
    return list.filter(it => it?.meta?.affix ?? false)
}

export const useTagsViewStore = defineStore({
    id: 'TAGS-VIEW',
    state: () => ({
        tagsList: [],
    }),
    actions: {
        // 初始化标签页
        initTags(routes){
            this.tagsList = routes
        },
        // 添加标签页
        addTags(route){
            if (whiteList.includes(route.name)) return false
            const isExists = this.tagsList.some(it => it.fullPath == route.fullPath)
            if (!isExists) {// 不存在则添加
                this.tagsList.push(route)
            }
            return true
        },
        // 关闭其他
        closeOtherTags(route){
            this.tagsList = this.tagsList.filter(it => it.fullPath == route.fullPath)
        },
        // 关闭当前页
        closeCurrentTag(route){
            const index = this.tagsList.findIndex(it => it.fullPath == route.fullPath)
            this.tagsList.splice(index, 1)
        },
        // 关闭全部
        closeAllTags(){
            this.tagsList = retainAffixRoute(this.tagsList)
            localStorage.removeItem(this.$id)
        },
        // 关闭左侧-暂时不用
        closeLeftTags(route){
            const index = this.tagsList.findIndex(it => it.fullPath == route.fullPath)
            this.tagsList.splice(0, index)
        },
        // 关闭右侧-暂时不用
        closeRightTags(route){
            const index = this.tagsList.findIndex(it => it.fullPath == route.fullPath)
            this.tagsList.splice(index + 1)
        },
    }
})


export function initTagsViewStore(route) {
    const instance = useTagsViewStore()

    // init
    const localTags = localStorage.getItem(instance.$id)
    const cacheRoutes = localTags ? JSON.parse(localTags) : [route]
    instance.initTags(cacheRoutes)

    // 订阅数据变化，变化时存储
    instance.$subscribe((mutation, state) => {
        localStorage.setItem(instance.$id, JSON.stringify(state.tagsList))
    })

    // 在页面关闭或刷新之前，保存数据
    window.addEventListener('beforeunload', () => {
        localStorage.setItem(instance.$id, JSON.stringify(instance.$state.tagsList))
    })
}