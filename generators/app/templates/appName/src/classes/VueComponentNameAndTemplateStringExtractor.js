export default class VueComponentNameAndTemplateExtractor {
  constructor(el) {
    const outerHTML = new String(el.outerHTML);
    this.name = el.attributes.is.value;
    this.template = outerHTML.replace(/is=".*?"/, "").toString()
  }
}
