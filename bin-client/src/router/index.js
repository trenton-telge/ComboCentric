import Vue from 'vue';
import Vuex from 'vuex';
import VueRouter from 'vue-router';
import Home from '../views/Home.vue'
import Register from "../views/Register.vue";
import Login from "../views/Login.vue";
import Profile from "../views/Profile.vue";
import Admin from "../views/Admin.vue";
import MakePost from "@/views/MakePost";
import FAQ from "@/views/FAQ";
Vue.use(Vuex);
Vue.use(VueRouter);
const routes = [
    {
        path: '/',
        alias: '/home',
        name: 'Home',
        component: Home
    },
    {
        path: '/register',
        name: 'Register',
        component: Register
    },
    {
        path: '/login',
        name: 'Login',
        component: Login
    },
    {
        path: '/profile',
        name: 'Profile',
        component: Profile
    },
    {
        path: '/admin',
        name: 'Admin',
        component: Admin
    },
    {
        path: '/makepost',
        name: 'MakePost',
        component: MakePost
    },
    {
        path: '/faq',
        name: 'FAQ',
        component: FAQ
    }
];

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
});

export default router;