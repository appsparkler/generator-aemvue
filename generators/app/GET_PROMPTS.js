/*eslint-disable*/
module.exports = function() {
  const PROMPTS = [
    //
    {
        type: "input",
        name: "app.pathToAEMProject",
        message: "AEM project path?",
        validate: validate_pathToAEMProject.bind(this)
    },
    {
      type: "input",
      name: "app.name",
      message: "App name?",
      default: answers => answers.app.pathToAEMProject.match(/[a-z|A-Z]*?$/),
      required: true
    },
    {
        type: "confirm",
        name: "ui.installNodeModules",
        message: "Install Node modules after scaffolding?",
        default: true
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
