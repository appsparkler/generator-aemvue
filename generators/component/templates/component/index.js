import $ from 'jquery';
import Vue from 'vue';
//
import <%= answers.xp.component.className %>ComponentConfig from './<%= answers.xp.component.className %>Config'
global.vueComponents = global.vueComponents || [];
setup_<%= answers.xp.component.name %>Components();

// private functions
function setup_<%= answers.xp.component.name %>Components() {
    $('[is^=xp-<%= answers.xp.component.category %>-<%= answers.xp.component.name %>]').each(generate_<%= answers.xp.component.name %>Component);
}

function generate_<%= answers.xp.component.name %>Component() {
    vueComponents.push(new <%= answers.xp.component.className %>ComponentConfig(this));
}
