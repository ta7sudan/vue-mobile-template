import Vue from 'vue';
import Vuex from 'vuex';
import {
	SET_POSTS_TOTAL,
	ADD_POSTS,
	SET_ABOUT } from './mutation-types';
import apis from '../lib/apis';
import { apizHelper as h, trimHtml, addTableWrapper } from '../lib/util';

Vue.use(Vuex);

// 暂时还不需要分模块
const store = new Vuex.Store({
	strict: DEBUG,
	state: {
		// 命名没起好...不过为了兼容性算了不改了..
		total: 0,
		posts: [],
		about: ''
	},
	getters: {
		// O(n^2)插入
		pageMap(state) {
			const map = {};
			for (const post of state.posts) {
				const page = post.page;
				if (!map[page]) {
					map[page] = [];
				}
				if (map[page].some(item => item.id === post.id)) {
					continue;
				}
				map[page].push(post);
			}
			return map;
		}
	},
	mutations: {
		[SET_POSTS_TOTAL](state, n) {
			state.total = n;
		},
		// O(n^2)插入
		[ADD_POSTS](state, posts) {
			for (const post of posts) {
				if (state.posts.some(item => item.id === post.id)) {
					continue;
				}
				state.posts.push(post);
			}
		},
		[SET_ABOUT](state, content) {
			state.about = content;
		}
	},
	// 基本上所有接口数据都会做缓存, 但是目前因为是session范围的缓存,
	// 所以暂时不考虑缓存失效的策略, 另一方面数据对实时性要求不高, 即便
	// 后台更新了, 在一次session中前端内容没有更新也没太大关系
	actions: {
		async getHomePosts({ commit, getters: { pageMap } }, page) {
			if (!pageMap[page]) {
				const { data } = await h(apis.getHomePosts({
					page
				}, {
					limit: 10
				}));
				data.posts.forEach(post => {
					if (!post.parsed) {
						post.content = addTableWrapper(post.content, 'table-wrapper');
						post.trimedHtml = trimHtml(post.content, {
							limit: 200,
							suffix: '...'
						}).html;
						post.parsed = true;
					}
				});
				commit(SET_POSTS_TOTAL, data.total);
				commit(ADD_POSTS, data.posts);
			}
			return pageMap[page];
		},
		async getProfile({ commit, state }) {
			if (state.about) {
				return state.about;
			}
			const { data: { content }} = await h(apis.getProfile());
			commit(SET_ABOUT, addTableWrapper(content, 'table-wrapper'));
			return content;
		}
	}
});

export * from './mutation-types';

export default store;