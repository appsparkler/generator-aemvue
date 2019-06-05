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
    scaffold_component.call(this);
  }

  end() {
    // conduct_userFarewell.call(this);
  }
};

// private functions
function set_config() {
  const { cmp } = this.answers;
  let componentConfig = this.config.get("components") || {};
  componentConfig[this.answers.cmp.component.category] = componentConfig[this.answers.cmp.component.category] || {};
  componentConfig[this.answers.cmp.component.category][this.answers.cmp.component.name] = {
    name: cmp.component.name,
    title: cmp.component.title,
    description: cmp.component.description,
    chunks: [
      "chunk-vendors",
      "chunk-common",
      `components/global/${cmp.component.name}/publishLibs`
    ]
  };
  console.log(componentConfig);
  this.config.set("components", componentConfig);
}

function scaffold_component() {
  const path = require('path');
  // this.destinationRoot('componentTemplate');
  const { category, name } = this.answers.cmp.component;
  const className = this.answers.cmp.component.className = changeCase.pascalCase(`${category} ${name}`);
  this.answers.cmp.generatorConfig = this.config.getAll();
  const templatePaths = [
    {from: '.content.xml', to: '.content.xml'},
    {from: 'componentTemplate.pug', to: `${name}.pug`},
    {from: 'configFile.js', to: `${className}Config.js`},
    {from: 'index.js', to: `index.js`},
    {from: 'styles.scss', to: `styles.scss`},
    {from: 'styles.scss', to: `styles.scss`},
    {from: 'publishLibs/.content.xml', to: `publishLibs/.content.xml`},
    {from: '_cq_editConfig/.content.xml', to: `_cq_editConfig/.content.xml`},
    {from: '_cq_design_dialog/.content.xml', to: `_cq_design_dialog/.content.xml`},
    {from: '_cq_dialog/.content.xml', to: `_cq_dialog/.content.xml`},
    {from: '_cq_htmlTag/.content.xml', to: `_cq_htmlTag/.content.xml`}
  ];
  const { answers } = this;
  // this.fs.copy(
  //   this.templatePath("component"),
  //   this.destinationPath(`src/components/${answers.cmp.component.category}/${answers.cmp.component.name}`)
  // );
  // Copy All DOT (.) files
  // this.fs.copy(
  //   this.templatePath('component/**/.*'),
  //   this.destinationPath(`src/components/${answers.cmp.component.category}/${answers.cmp.component.name}`)
  // );
  templatePaths.forEach(key => {
    this.fs.copyTpl(
      this.templatePath(path.join('component', key.from)),
      path.join(
          this.destinationRoot(),
          'src/components',
          answers.cmp.component.category,
          answers.cmp.component.name,
          key.to
      ),
      this
    )
  });
  // this.fs.copyTpl(
  //   this.templatePath(path.join('component', 'componentTemplate.pug')),
  //   path.join(
  //     this.destinationRoot(),
  //     'src/components',
  //     answers.cmp.component.category,
  //     answers.cmp.component.name,
  //     `${answers.cmp.component.name}.pug`
  //   ),
  //   this
  // )

  // /*
  // this.fs.copyTpl(
  //   this.templatePath(path.join('appName', filePaths.chunkCommonClientLib)),
  //   this.destinationPath(filePaths.chunkCommonClientLib),
  //   this
  // )
  // this.fs.copyTpl(
  //   this.templatePath("appName", filePaths.editableAddedFile),
  //   this.destinationPath(filePaths.editableAddedFile),
  //   this
  // )
  // */
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
  // this.answers.cmp.component.name = changeCase.camelCase(this.answers.cmp.component.name);
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
