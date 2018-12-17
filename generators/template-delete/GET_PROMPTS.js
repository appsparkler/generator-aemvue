/*eslint-disable*/
module.exports = function() {
  const YoRC = this.config.getAll();
  const TemplateComponents = YoRC.templateContainer.TemplateComponents;
  const templatePaths = Object.keys(TemplateComponents);
  //
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
