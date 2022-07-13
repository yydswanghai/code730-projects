import { defineStore } from 'pinia'
import { RouteLocationNormalized } from 'vue-router'

export type RouteItem = Partial<RouteLocationNormalized> & {
    fullPath: string
    name: string
}

export type ITagsViewState = {
    tagsList: RouteItem[]// 标签页
}

/* 不需要出现在标签页中的路由 */
const whiteList = ['Redirect', 'Login'];

function retainAffixRoute(list: RouteItem[]) {
    return list.filter(it => it?.meta?.affix ?? false);
}

/**
 * 标签
 */
export const useTagsViewStore = defineStore({
    id: 'tags-view',
    state: (): ITagsViewState => ({
        tagsList: [],
    }),
    actions: {
        /* 初始化标签页 */
        initTags(routes: RouteItem[]){
            this.tagsList = routes;
        },
        /* 添加标签页 */
        addTags(route: RouteItem){
            if (whiteList.includes(route.name)) return false;
            const isExists = this.tagsList.some(it => it.fullPath == route.fullPath);
            if (!isExists) {// 不存在则添加
                this.tagsList.push(route);
            }
            return true;
        },
        /* 关闭其他 */
        closeOtherTags(route: RouteItem){
            this.tagsList = this.tagsList.filter(it => it.fullPath == route.fullPath);
        },
        /* 关闭全部 */
        closeAllTags(){
            // 重新赋值，仅有设置了 meta:{ affix: true } 的保留
            this.tagsList = retainAffixRoute(this.tagsList)
            localStorage.removeItem(this.$id)
        },
    }
});

export function initTagsViewStore(route: RouteItem) {
    const instance = useTagsViewStore();

    // 初始化
    const localTags = localStorage.getItem(instance.$id);
    const cacheRoutes: RouteItem[] = localTags ? JSON.parse(localTags) : [route];
    instance.initTags(cacheRoutes);

    // 订阅数据变化，变化时存储
    instance.$subscribe((mutation, state) => {
        localStorage.setItem(instance.$id, JSON.stringify(state.tagsList));
    });

    // 在页面关闭或刷新之前，保存数据
    window.addEventListener('beforeunload', () => {
        localStorage.setItem(instance.$id, JSON.stringify(instance.$state.tagsList));
    });
}