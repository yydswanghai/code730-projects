import { defineStore } from 'pinia'

// 不需要出现在标签页中的路由
const whiteList = ['Redirect', 'login']

export const useTagsViewStore = defineStore({
    id: 'tags-view',
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
        // 关闭左侧
        closeLeftTags(route){
            const index = this.tagsList.findIndex(it => it.fullPath == route.fullPath)
            this.tagsList.splice(0, index)
        },
        // 关闭右侧
        closeRightTags(route){
            const index = this.tagsList.findIndex(it => it.fullPath == route.fullPath)
            this.tagsList.splice(index + 1)
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
            this.tagsList = []
        }
    }
})