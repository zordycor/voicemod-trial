import Vue from "vue";
import App from "./App.vue";
import store from "./store";
import "./assets/sass/base.scss";
import clickOutside from "./directives/clickOutside";
import filters from "./filters";

Vue.config.productionTip = false;

Vue.filter("capitalize", filters.capitalizeText);
Vue.directive("click-outside", clickOutside);

new Vue({
  store,
  render: h => h(App)
}).$mount("#app");
