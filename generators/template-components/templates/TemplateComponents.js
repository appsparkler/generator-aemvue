// This is a generated file
<% for (var pathKey in TemplateComponents) {%>
import <%= TemplateComponents[pathKey] %> from '<%= pathKey %>';
<% } %>

export default {
  <% for (var pathKey in TemplateComponents) {%>
    <%= TemplateComponents[pathKey] %><%- answers.templateName != TemplateComponents[pathKey] ? "," : "" %>
  <% } %>
}
