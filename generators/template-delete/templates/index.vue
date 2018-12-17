<template lang="pug">
div.vue-template-component.<%= template.templateName %>-template
  pre.bg-primary.text-white.m-5.p-5.text-center
    h1 <%= template.title %>
    p <%= template.description %>
</template>

<script>
import <%= template.templateName %>Config from "./config";
//
export default {
  data() {
    return {
      config: <%= template.templateName %>Config
    };
  }
};
</script>

<style lang="scss">
</style>
