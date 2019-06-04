import $ from 'jquery';
import Vue from 'vue';
//
import <%= answers.component.camelCaseName %>ComponentConfig from './<%= answers.component.camelCaseName %>Config'
global.vueComponents = global.vueComponents || [];
setup_<%= answers.component.camelCaseName %>Components();

// private functions
function setup_<%= answers.component.camelCaseName %>Components() {
    $('[is^=<%= answers.component.camelCaseName %>]').each(generate_<%= answers.component.camelCaseName %>Component);
}

function generate_<%= answers.component.camelCaseName %>Component() {
    vueComponents.push(new <%= answers.component.camelCaseName %>ComponentConfig(this));
}
