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
            console.log(user) // Point 1
            console.log(state.user) // Point 2
            Vue.set(state, 'user', user)
            /*state.user.firstName = user.firstName;
            state.user.lastName = user.lastName;
            state.user.lastLogin = user.lastLogin;
            state.user.email = user.email;
            state.user.password = user.password;
            state.user.token = user.token;*/
            //console.log(state.user) // Point 3
            console.log(state.user);
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