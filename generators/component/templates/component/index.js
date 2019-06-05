import $ from 'jquery';
import Vue from 'vue';
//
import <%= answers.cmp.component.className %>ComponentConfig from './<%= answers.cmp.component.className %>Config'
global.vueComponents = global.vueComponents || [];
setup_<%= answers.cmp.component.name %>Components();

// private functions
function setup_<%= answers.cmp.component.name %>Components() {
    $('[is^=xp-<%= answers.cmp.component.category %>-<%= answers.cmp.component.name %>]').each(generate_<%= answers.cmp.component.name %>Component);
}

function generate_<%= answers.cmp.component.name %>Component() {
    vueComponents.push(new <%= answers.cmp.component.className %>ComponentConfig(this));
}
