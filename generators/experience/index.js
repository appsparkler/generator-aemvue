/* eslint-disable*/
"use strict";
const Generator = require("yeoman-generator");
const chalk = require("chalk");
const yosay = require("yosay");
const GET_PROMPTS = require("./GET_PROMPTS");
const changeCase = require('change-case');

module.exports = class extends Generator {

  initializing() {
    welcome_theUser.call(this);
  }

  async prompting() {
    await set_AnswersForPrompts.call(this);
  }

  configuring() {
    set_config.call(this);
  }

  default() {}

  writing() {
    // scaffold_app.call(this);
  }

  end() {
    // conduct_userFarewell.call(this);
  }
};

// private functions
function set_config() {
  const { xp } = this.answers;
  let experienceConfig = this.config.get("experiences") || {};
  experienceConfig[this.answers.xp.component.category] = experienceConfig[this.answers.xp.component.category] || {};
  experienceConfig[this.answers.xp.component.category][this.answers.xp.component.name] = {
    name: xp.component.name,
    title: xp.component.title,
    description: xp.component.description,
    chunks: [
      "chunk-vendors",
      "chunk-common",
      `experiences/global/${xp.component.name}/publishLibs`
    ]
  };
  console.log(experienceConfig);
  this.config.set("experiences", experienceConfig);
  // console.log(experienceConfig);

  // this.config.set(
  //   'pathToAEMProjectFolder',
  //   this.answers.app.pathToAEMProject
  // );
  /*
  "experiences": {
        "global": {
          "xt-navbar": {
            "name": "xt-navbar",
            "title": "XT Navbar",
            "description": "This is the XT Navbar Experience.",
            "chunks": [
              "chunk-vendors",
              "chunk-common",
              "experiences/global/xt-navbar/publishLibs"
            ]
          },
          "xt-container": {
            "name": "xt-container",
            "title": "XT Container",
            "description": "This is the XT Responsive Container Experience.",
            "chunks": [
              "chunk-vendors",
              "chunk-common",
              "experiences/global/xt-container/publishLibs"
            ]
          }
        }
      }
    }

  this.config.set("templates", {
    "global": {
      "BasePage": {
        "name": "BasePage",
        "title": "The Base Template Page",
        "description": "This is the Base Template Page which loads all the vendor and common scripts along with the HTML document",
        "chunks": [
          "chunk-vendors",
          "chunk-common",
          "templates/global/BasePage/publishLibs"
        ]
      }
    }
  });
    */
}

function scaffold_app() {
  const path = require('path');
  const templatePaths = [
    '/src/chunk-vendors/.content.xml',
    '/src/chunk-common/.content.xml',
    '/src/clientlibs/authoring/js/listeners/edtiable-added.js',
    '/src/templates/global/BasePage/BasePage-cmp/customheaderlibs.html',
    'package.json',
    '/src/templates/global/BasePage/BasePage-cmp/customfooterlibs.html',
    '/src/templates/global/BasePage/BasePage-tmpl/.content.xml',
    '/src/templates/global/BasePage/publishLibs/.content.xml',
    '/.env',
    '/.env.development',
    '/.env.production',
    '/.gitignore'
  ];
  this.fs.copy(
    this.templatePath("appName"),
    this.destinationPath()
  );
  // Copy All DOT (.) files
  this.fs.copy(
    this.templatePath('appName/**/.*'),
    this.destinationRoot()
  );
  templatePaths.forEach(key => {
    this.fs.copyTpl(
      this.templatePath(path.join('appName', key)),
      path.join(this.destinationRoot(), key),
      this
    )
  });
  /*
  this.fs.copyTpl(
    this.templatePath(path.join('appName', filePaths.chunkCommonClientLib)),
    this.destinationPath(filePaths.chunkCommonClientLib),
    this
  )
  this.fs.copyTpl(
    this.templatePath("appName", filePaths.editableAddedFile),
    this.destinationPath(filePaths.editableAddedFile),
    this
  )
  */
}

function welcome_theUser() {
  this.log(
    yosay(
      ` Welcome to the
        ${chalk.bgGreen.black(
          "EXPERIENCE BUILDER..."
        )}
      `
    )
  );
}

function conduct_userFarewell() {
  this.log(
    yosay(
      `Thank you for scaffolding your app with
        ${chalk.bgGreen.black(
          "AEM-VUE-GENERATOR"
        )}
        ...
      `
    )
  );
  this.spawnCommandSync('git', ['init']);
  if(this.answers.ui.installNodeModules)  this.log('Please wait while we install your node_modules...');
  if(this.answers.ui.installNodeModules) this.npmInstall();
}

async function set_AnswersForPrompts() {
  const PROMPTS = GET_PROMPTS.call(this);
  this.answers = await this.prompt(PROMPTS);
  // change the case of the comonent to camelCase.
  // this.answers.xp.component.name = changeCase.camelCase(this.answers.xp.component.name);
}

/*
	Initializing();
	prompting();
	configuring();
	default();
	writing();
	conflicts();
	install();
	end();
*/
