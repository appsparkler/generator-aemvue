/*eslint-disable*/
module.exports = function() {
  const changeCase = require('change-case');
  const PROMPTS = [
    // COMPONENT
    {
      type: "input",
      name: "xp.component.category",
      message: "Please enter the category under which you would like to create this experience: ",
      required: true
    },{
        type: "input",
        name: "xp.component.name",
        message: "Please enter the name of your experience: ",
        required: true,
    },{
        type: "input",
        name: "xp.component.title",
        message: "Please update a title for your experience (Ex. Navbar, Footer..): ",
        required: true
    },{
        type: "input",
        name: "xp.component.group",
        message: "Please enter the component-group for this experience: ",
        required: true
    },

    // DESIGN DIALOG
    {
        type: "input",
        name: "xp.designDialog.title",
        message: "Please enter the design-dialog title for this experience \n   (leave blank if a design dialog is not required...): ",
        required: true
    },{
        type: "input",
        name: "xp.designDialog.description",
        message: "Please enter the description for the design-dialog: ",
        required: true
    },

    // EDIT DIALOG
    {
        type: "input",
        message: "Please enter the title for the edit-dialog \n    (leave blank if a edit dialog is not required): ",
        name: "xp.editDialog.title",
        required: true
    },{
        type: "input",
        message: "Please enter the description for the edit-dialog : ",
        name: "xp.editDialog.description",
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
