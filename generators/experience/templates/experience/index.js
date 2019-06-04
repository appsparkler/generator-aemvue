import $ from 'jquery';
import Vue from 'vue';
//
import <%= answers.component.name %>ComponentConfig from './<%= answers.component.name %>Config'
global.vueComponents = global.vueComponents || [];
setup_<%= answers.component.name %>Components();

// private functions
function setup_<%= answers.component.name %>Components() {
    $('[is^=<%= answers.component.name %>]').each(generate_<%= answers.component.name %>Component);
}

function generate_<%= answers.component.name %>Component() {
    vueComponents.push(new <%= answers.component.name %>ComponentConfig(this));
}
