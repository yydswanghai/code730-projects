import Vuex from "vuex";
import Vue from "vue";
import loginUser from "./loginUser"
import createPersistedState from 'vuex-persistedstate';// vuex 持久化插件

Vue.use(Vuex);

const store = new Vuex.Store({
    modules: {
        loginUser,
    },
    plugins: [createPersistedState()],
    strict: true, // 开启严格模式，只允许通过mutation改变状态
})

window.store = store;

export default store;