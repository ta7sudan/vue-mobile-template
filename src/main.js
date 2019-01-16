import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import apis from './lib/apis';{{if hasSecan}}
import guard from './lib/guard';{{/if}}
import NProgress from 'accessible-nprogress';
import 'accessible-nprogress/dist/accessible-nprogress.css';
import './lib/mixins';

{{if hasSecan}}guard();{{/if}}
window.NProgress = NProgress;

if (DEBUG) {
	Vue.config.performance = true;
	window.router = router;
}

Vue.config.productionTip = false;

new Vue({
	router,
	apis,
	store,
	render: h => h(App)
}).$mount('#app');
