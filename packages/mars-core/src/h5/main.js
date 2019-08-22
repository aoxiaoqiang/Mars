/**
 * @file main
 * @author mars
 */

import App from './app.vue';

// let App = appApi;
window.getApp = function () {
    return App;
};

/* globals Vue */
import Vue from 'vue';
import basicComponents from './components.js';

// 引入公共样式
import './mars-base.css'; 
import initAOPEvents from './AOP.js';
import MarsApp from './MarsApp.vue';
import router from './router.js';
import initGlobalApi from './globalApi.js';

import {tabBars, pageTitleMap, routes, appWin} from './config';

Vue.use(basicComponents);
Vue.config.productionTip = false;

Vue.prototype.currentRoute = [];

Vue.prototype.$mpUpdated = function (fn) {
    return this.$nextTick(fn);
};

let props = {
    tabBars,
    homePage: routes[0].path,
    navigationBarBackgroundColor: '#000000',
    navigationBarTextStyle: 'white',
    navigationBarTitleText: '',
    navigationStyle: 'default',
    backgroundTextStyle: 'dark',
    backgroundColor: '#ffffff',
    enablePullDownRefresh: false,
    onReachBottomDistance: 50,
    navigationBarHomeColor: 'dark',
    showNavigationBorder: true,
    useTransition: true,
    supportPWA: false,
    ...appWin
};

window.getCurrentPages = function () {
    return Vue.prototype.currentRoute;
};
const vm = new Vue({
    router,
    data: {
        pageTitleMap
    },
    render: h => h(MarsApp, {
        props
    })
}).$mount('#app');

// 初始化 $api
initGlobalApi(Vue, vm);

// 将初始化后的$api赋值给getApp
App.$api = vm.$api;

// 初始化AOP注册事件
initAOPEvents(vm);
