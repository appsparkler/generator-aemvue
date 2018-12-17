/*eslint-disable*/
module.exports = function() {
  const {templateName} = this.options;
  const YoRC = this.config.getAll();
  const TemplateComponents = YoRC.templateContainer.TemplateComponents;
  const templatePaths = TemplateComponents.keys();
  //
  let answers = {};
  const PROMPTS = [
    // tmeplate to delete
    {
      type: "list",
      name: "templatePath",
      message: "Please select the template you would like to delete",
      choices: templatePaths
    }
  ];
  //
  return PROMPTS;
};
