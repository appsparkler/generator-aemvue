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
      default: "/content/.+"
    },
    // template.ranking
    {
      type: "input",
      name: "template.ranking",
      message: "What is the ranking for this template?",
      default: 100
    },
    // TODO SETUP the template.resourceType PROMPT (it is missing)
    // TODO RENAME the template.resourceType key to template.resource
    // template.slingType
    {
      type: "list",
      name: "template.slingType",
      message: "please select sling type for this CQ Template:",
      choices: ["sling:resourceSuperType", "sling:resourceType"],
      default: "sling:resourceType"
    },

    // COMPONENT PROMPTS
    // component.slingType
    {
      type: "list",
      name: "component.slingType",
      message: "please select the sling-type for this template:",
      choices: ['sling:resourceSuperType', 'sling:resourceType'],
      default: 'sling:resourceSuperType'
    },
    // component.resourceType (2 prompts to get answer)
    {
      type: "list",
      name: "component.resourceType",
      message:
        "please select the resource for this template component:",
      choices: templateContainerConfig.basePagePaths.concat(["others"]),
      default: templateContainerConfig.basePagePaths[1]
    },
    {
      when(answers) {
        if (answers.component.resourceType === "others") {
          return true;
        } else {
          return false;
        }
      },
      type: "input",
      // TODO - RENAME the component.reosurceType key component.resource
      name: "component.resourceType",
      message: "please specify the sling:resourceType for this component?"
    }
  ];

  return PROMPTS;
};
