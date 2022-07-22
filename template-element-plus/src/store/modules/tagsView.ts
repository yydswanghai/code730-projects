import { defineStore } from 'pinia'
import { RouteLocationNormalizedLoaded } from 'vue-router'
import { PageEnum } from '@/enums/pageEnum'

export type IRouteItem = Partial<RouteLocationNormalizedLoaded> & {
    fullPath: string
    name: string
}

export type ITagsViewState = {
    tagsList: IRouteItem[]// 标签页
}

/* 不需要出现在标签页中的路由 */
const whiteList: string[] = [PageEnum.REDIRECT_NAME, PageEnum.LOGIN_NAME];

/* 返回所有路由里 meta:{ affix: true } 的 `标签` */
function retainAffixRoute(list: IRouteItem[]) {
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
        initTags(routes: IRouteItem[]){
            this.tagsList = routes;
        },
        /* 添加标签页 */
        addTags(route: IRouteItem){
            if (whiteList.includes(route.name)) return false;
            const isExists = this.tagsList.some(it => it.fullPath == route.fullPath);
            if (!isExists) {// 不存在则添加
                this.tagsList.push(route);
            }
            return true;
        },
        /* 关闭其他 */
        closeOtherTags(route: IRouteItem){
            this.tagsList = this.tagsList.filter(it => it.fullPath == route.fullPath);
        },
        // 关闭当前页
        closeCurrentTag(route: IRouteItem){
            const index = this.tagsList.findIndex(it => it.fullPath == route.fullPath);
            this.tagsList.splice(index, 1);
        },
        /* 关闭全部 */
        closeAllTags(){
            // 重新赋值，仅有设置了 meta:{ affix: true } 的保留
            this.tagsList = retainAffixRoute(this.tagsList);
            localStorage.removeItem(this.$id);
        },
    }
});

export function initTagsViewStore(route: IRouteItem) {
    const instance = useTagsViewStore();

    // 初始化
    const localTags = localStorage.getItem(instance.$id);
    const cacheRoutes: IRouteItem[] = localTags ? JSON.parse(localTags) : [route];
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