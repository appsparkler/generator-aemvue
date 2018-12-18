/* eslint-disable*/
"use strict";
const Generator = require("yeoman-generator");
const chalk = require("chalk");
const yosay = require("yosay");
const fs = require("fs-extra");
const GET_PROMPTS = require("./GET_PROMPTS");

module.exports = class extends Generator {
  constructor(args, opts) {
    super(args, opts);
  }

  initializing() {
    welcomeTheUser.call(this);
  }

  async prompting() {
    await setAnswersForPrompts.call(this);
  }

  configuring() {
    setConfig.call(this);
    // TODO RESET/REWRITE  TemplateComponents.js after deleting template
  }

  default() {}

  writing() {
    delteTemplateFolder.apply(this);
    reWriteTemplateComponentsFile.apply(this);
    // TODO UPDATE TemplateComponents.js file after deleting template folder.
  }

  end() {
    userFarewell.call(this);
  }
};

// private functions
function delteTemplateFolder() {
  const templatePath = this.answers.templatePath;
  fs.removeSync(this.destinationPath(`src/${templatePath}`));
}

function copyChildComponentsFile() {
  const {category, templateName} = this.answers.template;
  this.fs.copy(
    this.templatePath("aem-component/child-page-components.html"),
    this.destinationPath(
      `./src/templates/${category}/${templateName}/aem-component/child-page-components.html`
    )
  );
}

function setConfig() {
  const YoRC = this.config.getAll();
  const {templatePath} = this.answers;
  const {TemplateComponents} = YoRC.templateContainer;
  delete TemplateComponents[templatePath];
  YoRC.templateContainer.TemplateComponents = TemplateComponents;
  //
  console.log(YoRC.templateContainer.TemplateComponents);
  this.config.set(YoRC);
}

function reWriteTemplateComponentsFile() {
  let TemplateComponents = this.config.getAll().templateContainer
    .TemplateComponents;
  let {answers} = this
  this.fs.copyTpl(
    this.templatePath("TemplateComponents.js"),
    this.destinationPath(
      `src/components/Functional/TemplateComponentDecider/TemplateComponents.js`
    ),
    {TemplateComponents, answers}
  );
}

function copyConfigFile() {
  let {category, templateName} = this.answers.template;

  this.fs.copyTpl(
    this.templatePath("index.vue"),
    this.destinationPath(
      `./src/templates/${category}/${templateName}/index.vue`
    ),
    this.answers
  );
}

function copyVueComponentFile() {
  let {category, templateName} = this.answers.template;

  this.fs.copyTpl(
    this.templatePath("config.js"),
    this.destinationPath(
      `./src/templates/${category}/${templateName}/config.js`
    ),
    this.answers
  );
}

function welcomeTheUser() {
  this.log(
    yosay(
      `Welcome to the AV ${chalk.bgRed.white(
        "::TEMPLATE DELETE::"
      )} generator!!!`
    )
  );
}

function userFarewell() {
  const {templatePath} = this.answers;
  this.log(
    yosay(`Template at path ${chalk.bgRed.white(templatePath)} is deleted...`)
  );
}

async function setAnswersForPrompts() {
  const PROMPTS = GET_PROMPTS.call(this);
  this.answers = await this.prompt(PROMPTS);
}

function copyTemplateJCR() {
  let {category, templateName} = this.answers.template;

  this.fs.copyTpl(
    this.templatePath("aem-tmpl/_content.xml"),
    this.destinationPath(
      `./src/templates/${category}/${templateName}/aem-tmpl/.content.xml`
    ),
    this.answers
  );
}

function copyComponentJCR() {
  let {category, templateName} = this.answers.template;

  this.fs.copyTpl(
    this.templatePath("aem-component/_content.xml"),
    this.destinationPath(
      `./src/templates/${category}/${templateName}/aem-component/.content.xml`
    ),
    this.answers
  );
}

function copyFolderJCR() {
  const {category, templateName} = this.answers.template;
  this.fs.copy(
    this.templatePath("_content.xml"),
    this.destinationPath(
      `./src/templates/${category}/${templateName}/.content.xml`
    )
  );
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
