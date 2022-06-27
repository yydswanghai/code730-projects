import { getBanners } from "@/api/banner"

export default {
    namespaced: true,
    state: {
        loading: false,
        data: [],
    },
    mutations: {
        setLoading(state, payload){
            state.loading = payload;
        },
        setData(state, payload){
            state.data = payload;
        }
    },
    actions: {
        async fetchBanner(ctx){
            if(ctx.state.data.length){
               return;// 如果data有值，则不需要重复请求数据 
            }
            ctx.commit("setLoading", true);
            const resp = await getBanners();
            ctx.commit("setData", resp)
            ctx.commit("setLoading", false);
        }
    }
}