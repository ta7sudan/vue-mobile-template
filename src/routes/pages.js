import Home from '../views/home.vue';

export default [
	{
		path: '/',
		redirect: '/home/1'
	},
	{
		path: '/home',
		redirect: '/home/1'
	},
	{
		name: 'home',
		path: '/home/:page',
		props(route) {
			return {
				page: parseInt(route.params.page, 10)
			};
		},
		component: Home
	},
	{
		name: 'about',
		path: '/about',
		component: () => import(/* webpackChunkName: "about" */ '../views/about.vue')
	}
];