import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from "../components/Home";
import About from "../components/About";
import Gares from "../components/Gares";
import Objects from "../components/Objects";

const originalPush = VueRouter.prototype.push;
VueRouter.prototype.push = function push(location) {
    return originalPush.call(this, location).catch(err => err)
};

Vue.use(VueRouter)

const routes = [
    {
        path: '/',
        name: 'Home',
        component: Home
    },
    {
        path: '/gares',
        name: 'Gares',
        component: Gares
    },
    {
        path: '/objets-trouves',
        name: 'Objets',
        component: Objects
    },
    {
        path: '/about',
        name: 'About',
        component: About
    },
]

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
})

export default router
