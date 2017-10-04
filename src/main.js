import Vue from 'vue';
import VueRouter from 'vue-router';
import VueResource from "vue-resource";
import App from './App';
import goods from 'components/goods/goods.vue'
import ratings from 'components/ratings/ratings.vue'
import seller from 'components/seller/seller.vue'

import "common/stylus/index.styl"
import "../static/css/reset.css"

Vue.use(VueRouter);
Vue.use(VueResource);

/* eslint-disable no-new */
let app = Vue.extend(App);

let router = new VueRouter({
	linkActiveClass : 'active'
});

router.map({
	'/goods' : {
		component : goods
	},
	'/ratings' : {
		component : ratings
	},
	'/seller' : {
		component : seller
	}
});
router.redirect({
	'/' : 'goods'
});

router.start(app, "#app");
