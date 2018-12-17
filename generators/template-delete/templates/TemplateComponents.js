// This is a generated file
// TODO run eslint on the generated file
<% for (var pathKey in TemplateComponents) {%>
import <%= TemplateComponents[pathKey] %> from '<%= pathKey %>';
<% } %>

export default {
  <% for (var pathKey in TemplateComponents) {%>
    <%= TemplateComponents[pathKey] %><%- template.templateName != TemplateComponents[pathKey] ? "," : "" %>
  <% } %>
}
