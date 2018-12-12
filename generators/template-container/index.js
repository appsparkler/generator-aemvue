/* eslint-disable*/
"use strict";
const Generator = require("yeoman-generator");
const chalk = require("chalk");
const yosay = require("yosay");
const GET_PROMPTS = require("./PROMPTS");

module.exports = class extends Generator {
  constructor(args, opts) {
    super(args, opts);
    this.argument("templateName", {
      type: String,
      required: true
    });
  }

  initializing() {
    welcomeTheUser.call(this);
  }

  async prompting() {
    await setAnswersForPrompts.call(this);
  }

  default() {
    setResourceType.call(this);
  }

  writing() {
    copyTemplateJCR.call(this);
    copyFolderJCR.call(this);
    copyComponentJCR.call(this);
    copyConfigFile.call(this);
    copyVueComponentFile.call(this);
  }

  end() {
    userFarewell.call(this);
  }
};

// private functions
function copyConfigFile() {
  let {subFolder, templateName} = this.answers.template;

  this.fs.copyTpl(
    this.templatePath("index.vue"),
    this.destinationPath(
      `./src/templates/${subFolder}/${templateName}/index.vue`
    ),
    this.answers
  );
}

function copyVueComponentFile() {
  let {subFolder, templateName} = this.answers.template;

  this.fs.copyTpl(
    this.templatePath("config.js"),
    this.destinationPath(
      `./src/templates/${subFolder}/${templateName}/config.js`
    ),
    this.answers
  );
}
function welcomeTheUser() {
  this.log(
    yosay(
      `Welcome to the AEM VUE (AV) ${chalk.bgGreen.black(
        "::CONTAINER TEMPLATE::"
      )} generator!!!`
    )
  );
}

function userFarewell() {
  this.log(
    yosay(
      `Thank you for working with AEM VUE (AV) ${chalk.bgGreen.black(
        "::TEMPLATE::"
      )} generator!!!  Have a good day!!!`
    )
  );
}

async function setAnswersForPrompts() {
  const PROMPTS = GET_PROMPTS.call(this);
  this.answers = await this.prompt(PROMPTS);
}

function copyTemplateJCR() {
  let {subFolder, templateName} = this.answers.template;

  this.fs.copyTpl(
    this.templatePath("aem-tmpl/_content.xml"),
    this.destinationPath(
      `./src/templates/${subFolder}/${templateName}/aem-tmpl/.content.xml`
    ),
    this.answers
  );
}

function copyComponentJCR() {
  let {subFolder, templateName} = this.answers.template;

  this.fs.copyTpl(
    this.templatePath("aem-component/_content.xml"),
    this.destinationPath(
      `./src/templates/${subFolder}/${templateName}/aem-component/.content.xml`
    ),
    this.answers
  );
}

function copyFolderJCR() {
  const {templateName} = this.options;
  const {subFolder} = this.answers.template;
  this.fs.copy(
    this.templatePath("_content.xml"),
    this.destinationPath(
      `./src/templates/${subFolder}/${templateName}/.content.xml`
    )
  );
}

function setResourceType() {
  let appName = this.config.get("appName");
  let {subFolder, templateName} = this.answers.template;
  this.answers.template.resourceType = `/apps/${appName}/src/templates/${subFolder}/${templateName}/aem-component`;
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
