import Router from 'vue-router';
import PageNotFound from '../components/PageNotFound.vue';
import LoginPage from '../components/LoginPage.vue'
import GameComponent from '../components/GameComponent';
import RegisterPage from '../components/RegisterPage';
import LeaderBoard from '../components/LeaderBoard'

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
                component: GameComponent
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


export default router;