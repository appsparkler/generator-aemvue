/*eslint-disable*/
module.exports = function() {
  const {templateName} = this.options;
  const templateContainerConfig = this.config.get("templateContainer");
  //
  let answers = {};
  const PROMPTS = [
    // template.templateName
    {
      type: "input",
      name: "template.templateName",
      message: "What is the name for this template (the template-folder-name)?",
      default: `${templateName}`
    },
    // template.title
    {
      type: "input",
      name: "template.title",
      message: "What is the title for this template?",
      default: `${templateName} Template`
    },
    // template.description
    {
      type: "input",
      name: "template.description",
      message: "Please describe this template.",
      default(answers) {
        return `A template for ${answers.template.title}.`;
      }
    },
    // template.subFolder
    {
      type: "list",
      name: "template.subFolder",
      message: "Please provide template sub-folder?",
      choices: ["global", "content"],
      default: "global"
    },
    // template.allowedPaths
    {
      type: "input",
      name: "template.allowedPaths",
      message:
        "What paths are allowed to access this template (comma-seperated for multiple items)?",
      default: "/content(/*)"
    },
    // template.ranking
    {
      type: "input",
      name: "template.ranking",
      message: "What is the ranking for this template?",
      default: 100
    },
    // template.slingType
    {
      type: "list",
      name: "template.slingType",
      message: "please select type?",
      choices: ["sling:superResourceType", "sling:resourceType"],
      default: "sling:resourceSuperType"
    },
    // component.resourceType
    {
      type: "list",
      name: "component.resourceType",
      message:
        "please select the sling-resource-super-type for this component?",
      choices: templateContainerConfig.basePagePaths,
      default: templateContainerConfig.basePagePaths[1]
    }
  ];

  return PROMPTS;
};
