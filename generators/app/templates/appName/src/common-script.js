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

export function initialize_VueApps() {
  $('[id^=app]').each(VueApp);
}

export function initialize_VueComponents() {
  vueComponents.forEach(obj => Vue.component(obj.vue_componentName, obj.config));
}

function VueApp() {
    var VueApp = new Vue({
        el: this,
        template: this.outerHTML,
        components: {...vueComponents}
    });
}
export class VueAEMComponent {
  constructor(el, config) {
    var vue_componentName = el.attributes.is.value;
    var outerHTML = new String(el.outerHTML);
    var vue_template = outerHTML.replace(/is=".*?"/, "").toString(); // avoid "maximum-call-stack-size-exceeded"
    config = config || {};
    config.template = vue_template;
    this.vue_componentName = vue_componentName;
    this.config = config;
    vueComponents.push(this);
    console.log(vueComponents);
  }
}
