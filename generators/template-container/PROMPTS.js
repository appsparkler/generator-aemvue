/*eslint-disable*/
module.exports = function() {
  const {templateName} = this.options;
  const templateContainerConfig = this.config.get("templateContainer");
  //
  let answers = {};
  const PROMPTS = [
    {
      type: "input",
      name: "template.templateName",
      message: "What is the name for this template (the template-folder-name)?",
      default: `${templateName}`
    },
    {
      type: "input",
      name: "template.title",
      message: "What is the title for this template?",
      default: `${templateName} Template`
    },
    {
      type: "input",
      name: "template.description",
      message: "Please describe this template.",
      default(answers) {
        return `A template for ${answers.template.title}.`;
      }
    },
    {
      type: "list",
      name: "template.subFolder",
      message: "Please provide template sub-folder?",
      choices: ["global", "content"],
      default: "global"
    },
    {
      type: "input",
      name: "template.allowedPaths",
      message:
        "What paths are allowed to access this template (comma-seperated for multiple items)?",
      default: "/content(/*)"
    },
    {
      type: "input",
      name: "template.ranking",
      message: "What is the ranking for this template?",
      default: 100
    },
    {
      type: "list",
      name: "template.slingType",
      message: "please select type?",
      choices: ["sling:resourceType", "sling:superResourceType"],
      default: "sling:resourceType"
    },
    // component promptForTemplateDetails_V2
    {
      type: "list",
      name: "component.resourceType",
      message: "please select the sling-resource-super-type for this component?",
      choices: templateContainerConfig.basePagePaths,
      default: templateContainerConfig.basePagePaths[1]
    }
  ];
  return PROMPTS;
};
