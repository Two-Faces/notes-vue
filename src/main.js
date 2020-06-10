import Vue from 'vue'
import router from './routes';
import store from './store';
import App from './App.vue';
import VModal from 'vue-js-modal';
Vue.use(VModal, { dialog: true })

Vue.config.productionTip = false

new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App),
});
