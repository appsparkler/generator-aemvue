import $ from 'jquery'
import Vue from 'vue'
import '@fortawesome/fontawesome-free/css/all.css'

Vue.config.comments = true;
Vue.config.ignoredElements = ['cq', 'sly'];
Vue.config.warnHandler = function(msg, vm, trace) {
  console.log(msg);
};
Vue.config.productionTip = false;
Vue.config.devTools = true;

global.vueComponents = global.vueComponents || [];

export const initialize_VueApps = () => {
  $('[id^=app]').each(VueApp);
}

export const initialize_VueComponents = () => {
  vueComponents.forEach(obj => {
    Vue.component(obj.config.name, obj.config);
  });
}
// private functions
function VueApp() {
  var VueApp = new Vue({
      el: this,
      template: this.outerHTML
  });
}
