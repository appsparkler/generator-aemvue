/* eslint-disable*/
"use strict";
const Generator = require("yeoman-generator");
const chalk = require("chalk");
const yosay = require("yosay");
const GET_PROMPTS = require("./GET_PROMPTS");

module.exports = class extends Generator {
  constructor(args, opts) {
    super(args, opts);
    this.argument("appName", {
      type: String,
      required: true
    });
  }

  // paths() {
  //   this.destinationRoot(this.options.appName);
  // }

  initializing() {
    welcomeTheUser.call(this);
  }

  async prompting() {
    await setAnswersForPrompts.call(this);
  }

  configuring() {
    this.destinationRoot(`${this.options.appName}-webapp`);
    setConfig.call(this);
  }

  default() {}

  writing() {
    create_appContainer.call(this);
    // copyFolderJCR.call(this);
    // copyTemplateJCR.call(this);
    // copyComponentJCR.call(this);
    // copyConfigFile.call(this);
    // copyVueComponentFile.call(this);
    // copyChildComponentsFile.call(this);
    // reWriteTemplateComponentsFile.call(this);
  }

  end() {
    userFarewell.call(this);
  }
};

// private functions
function setConfig() {
  this.config.set('appName', this.options.appName);
  this.config.set('pathToAEMProjectFolder', this.answers.app.pathToAEMProject);
  // YoRC.appName = this.options.appName;
  // YoRC.pathToAEMProjectFolder = this.answers.app.pathToAEMProject;
  // const templateName = this.answers.template.templateName;
  // const category = this.answers.template.category;
  // const templatePath = `templates/${category}/${templateName}`;
  // const TemplateComponents = YoRC.templateContainer.TemplateComponents;
  // TemplateComponents[templatePath] = templateName;
  // YoRC.templateContainer.TemplateComponents = TemplateComponents;
  // console.log(YoRC);
  // this.config.set(YoRC);
}

function create_appContainer() {
  this.fs.copy(
    this.templatePath("appName"),
    this.destinationPath()
  );
}

function welcomeTheUser() {
  this.log(
    yosay(
      ` Welcome to the
        ${chalk.bgGreen.black(
          "AEM-VUE-GENERATOR !!!"
        )}
      `
    )
  );
}

function reWriteTemplateComponentsFile() {
  var TemplateComponents = this.config.getAll().templateContainer.TemplateComponents;
  var template = this.answers.template;
  this.fs.copyTpl(
    this.templatePath("TemplateComponents.js"),
    this.destinationPath(`src/components/Functional/TemplateComponentDecider/TemplateComponents.js`),
    {TemplateComponents, template }
  );
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
