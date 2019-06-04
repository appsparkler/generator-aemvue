import $ from 'jquery';
import Vue from 'vue';
//
import <%= modifiedAnswers.name %>ComponentConfig from './<%= modifiedAnswers.name %>Config'
global.vueComponents = global.vueComponents || [];
setup_<%= modifiedAnswers.name %>Components();

// private functions
function setup_<%= modifiedAnswers.name %>Components() {
    $('[is^=<%= modifiedAnswers.name %>]').each(generate_<%= modifiedAnswers.name %>Component);
}

function generate_<%= modifiedAnswers.name %>Component() {
    vueComponents.push(new <%= modifiedAnswers.name %>ComponentConfig(this));
}
