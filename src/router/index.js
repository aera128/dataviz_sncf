import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from "../components/pages/Home";
import About from "../components/pages/About";
import Map from "../components/pages/Map";
import Stats from "../components/pages/Stats";
import Station from "../components/pages/Station";

const originalPush = VueRouter.prototype.push;
VueRouter.prototype.push = function push(location) {
    return originalPush.call(this, location).catch(err => err)
};

Vue.use(VueRouter)

const routes = [
    {
        path: '/',
        name: 'Home',
        component: Home,
    },
    {
        path: '/map',
        name: 'Map',
        component: Map
    },
    {
        path: '/stats',
        name: 'stats',
        component: Stats
    },
    {
        path: '/station/',
        name: 'station',
        component: Station
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
