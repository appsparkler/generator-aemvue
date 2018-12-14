
// TODO - iterate over the TemplateCompnents Object from .yo-rc.json
<% for (var pathKey in TemplateComponents) {%>
import <%= TemplateComponents[pathKey] %> from '<%= pathKey %>';
<% } %>

export default {
  <% for (var pathKey in TemplateComponents) {%>
    <%= TemplateComponents[pathKey] %><%- template.templateName != TemplateComponents[pathKey] ? "," : "" %>
  <% } %>
}
