import Vue from "vue";
import Vuex from 'vuex';
Vue.use(Vuex);

const state = {
        user: {
            firstName: null,
            lastName: null,
            lastLogin: null,
            email: null,
            password: null,
            token: null
        }
    },
    actions = {
        setUser({commit}, user){
            commit('setUser', user);
        }
    },
    mutations = {
        setUser:(state, user) => {
            Vue.set(state, 'user', user)
        }
    },
    getters = {
        getUser: (state) => state.user
    };
export default {
    state,
    actions,
    mutations,
    getters
}