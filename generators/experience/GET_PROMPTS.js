/*eslint-disable*/
module.exports = function() {
  const { camelCase } = require('change-case');
  const PROMPTS = [
    // COMPONENT
    {
      type: "input",
      name: "xp.component.category",
      message: "category?",
      required: true,
      filter: userInput => camelCase(userInput),
      default: 'global'
    },{
        type: "input",
        name: "xp.component.name",
        message: "name : ",
        required: true,
        filter: userInput => camelCase(userInput),
        default: 'Navbar'

    },{
        type: "input",
        name: "xp.component.title",
        message: "title?",
        required: true,
        default: 'Component Title'
    },{
        type: "input",
        name: "xp.component.description",
        message: "description?",
        required: true,
        default: 'Component Description'
    },{
        type: "input",
        name: "xp.component.group",
        message: "Experience group?",
        required: true,
        default: 'XT Experiences'
    },

    // DESIGN DIALOG
    {
        type: "input",
        name: "xp.designDialog.title",
        message: "Design dialog title?",
        required: true,
        default: 'DD Title'
    },{
        type: "input",
        name: "xp.designDialog.description",
        message: "Design dialog description?",
        required: true,
        default: 'DD description'
    },

    // EDIT DIALOG
    {
        type: "input",
        message: "Edit dialog title?",
        name: "xp.editDialog.title",
        default: 'ED Title'
    },{
        type: "input",
        message: "Edit dialog description?",
        name: "xp.editDialog.description",
        default: 'ED description...'
    }
  ];

  return PROMPTS;
};

// private functions
function validate_pathToAEMProject(userInputPath) {
  try {
      const fs = require('fs-extra');
      const path = require('path');
      const uiAppDirPath = path.resolve(userInputPath, 'ui.apps');
      const errMsgs = {
        invalidDir: "The directory is not valid",
        missingUIAppsDirs: "This directory doesn't have a ui.apps folder"
      };
      if(!fs.existsSync(userInputPath)) return errMsgs.invalidDir;
      else if(!fs.existsSync(uiAppDirPath)) return errMsgs.missingUIAppsDirs;
      else return true;
  } catch (e) {
      console.log(e);
  }
}
