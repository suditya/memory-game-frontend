import Router from 'vue-router';
import PageNotFound from '../components/PageNotFound.vue';
import LoginPage from '../components/LoginPage.vue'
import CardComponent from '../components/CardComponent';
import RegisterPage from '../components/RegisterPage';
import LeaderBoard from '../components/LeaderBoard'
/**
 * Add a route property ```meta: { authorize: [ <roles> ] }``` with <roles> authorized to access the route
 * Let authorize be empty to allow access to all authenticated users
 */

const router = new Router(
    {
        mode: 'history',
        routes: [
            {
                name: 'login',
                path: '/login',
                component: LoginPage
            },
            {
                name: 'home',
                path: '/',
                component: CardComponent
            },
            {
                name:'register',
                path:'/register',
                component:RegisterPage
            },
            {
                name:'LeaderBoard',
                path:'/leaderboard',
                component:LeaderBoard
            },
            {
                name: 'page-not-found',
                path: '*',
                component: PageNotFound
            }
        ]
    }
);

// // Global auth guard
// router.beforeEach(( to, from, next ) => {
//     // Right now, role-based authorization is NOT supported
//     if( to.meta.authorize && !isAuthenticated() ) {
//         next({
//             name: 'login'
//         });
//     } else {
//         next();
//     }
// });

export default router;