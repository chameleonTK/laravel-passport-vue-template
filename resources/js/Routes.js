import Vue from 'vue';
import VueRouter from 'vue-router';
Vue.use(VueRouter);

import AuthService from './services/AuthService.js';
import LoginPage from './pages/LoginPage.vue';
import HomePage from './pages/HomePage.vue';
 

const routes = [
    {
        path: '/login',
        component: LoginPage,
        name: "Login",
        meta: {
            requires_guest: true,
        }
    },

    {
        path: '/home',
        component: HomePage,
        name: "Home",
        meta: {
            requires_auth: true,
        }
    },
    {
        path: '/403',
        component: ForbidenPage,
        name: "Forbiden",
        meta: {
            title: '403 | หวังโต๊ะกังเยาวราช',
        }
    },
    {
        path: "/404", 
        name: "Notfound",
        component: NotFoundPage,
        meta: {
            title: '404 | หวังโต๊ะกังเยาวราช',
        }
    },
    {
        path: "*", 
        beforeEnter: (to, from, next) => { 
            next('/login');
        }
    }
];

 const router = new VueRouter({
     mode: 'history',
     routes: routes
 });

router.beforeEach((to, from, next) => {
    
    Vue.nextTick(() => {
        document.title = to.meta.title || "";
        
        _.each(to.matched, (record) => {
            if (!_.isNil(record.meta.role)) {
                document.body.classList.add("content-"+record.meta.role);
            }
        });
        
    });


    if (to.matched.some(record => record.meta.requires_auth) ) {
        if (!AuthService.check()) {
            router.push({name: "Login"});
            return;
        }
    }


    if (to.matched.some(record => record.meta.requires_guest) ) {
        if (AuthService.check()) {
            router.push({name: "Home"});
            return;
        }
    }

    next();
    return;

});

export default router;