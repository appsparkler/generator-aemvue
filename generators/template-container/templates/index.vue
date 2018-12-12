<template lang="pug">
div.vue-template-component.<%= template.templateName %>-template
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
