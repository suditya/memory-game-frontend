import Vue from 'vue'
import App from '../src/App.vue'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'jquery/src/jquery.js'
import 'bootstrap/dist/js/bootstrap.min.js'
import Router from 'vue-router';
import router from '../src/router';

Vue.config.productionTip = false

Vue.use( Router );

new Vue({
  render: h => h(App),
  router
}).$mount('#app')
