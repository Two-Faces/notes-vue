import Vuex from 'vuex'
import Vue from 'vue';
Vue.use(Vuex);
import state from "./state";
import getters from './getters';
import mutations from "./mutations";
import actions from "./actions";

export default new Vuex.Store({
    state,
    getters,
    mutations,
    actions
});