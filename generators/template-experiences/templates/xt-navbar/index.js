import $ from 'jquery';
import Vue from 'vue';
//
import XTNavbarComponentConfig from './xt-navbar-config'
global.vueComponents = global.vueComponents || [];
setup_XTNavbarComponents();

// private functions
function setup_XTNavbarComponents() {
    $('[is^=xt-navbar]').each(generate_xtNavbarComponent);
}

function generate_xtNavbarComponent() {
    vueComponents.push(new XTNavbarComponentConfig(this));
}
