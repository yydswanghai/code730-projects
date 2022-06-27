import Vuex from "vuex";
import Vue from "vue";
import banner from "./banner";
import setting from "./setting";
import about from "./about";
import project from "./project";

if(!window.Vuex){
    Vue.use(Vuex);
}

const store = new Vuex.Store({
    modules: {
        setting,
        banner,
        about,
        project,
    }
})

export default store;
