/* eslint-disable*/
"use strict";
const path = require("path");
const assert = require("yeoman-assert");
const helpers = require("yeoman-test");
const fs = require('fs-extra');

describe("generator-av:template-delete", () => {
  beforeAll(() => {
    return helpers
      .run(path.join(__dirname, "../generators/template-delete"))
      .inTmpDir(function(dir) {
        // `dir` is the path to the new temporary directory
        fs.copySync(
        path.join(__dirname, "../generators/template-create/templates"),
        `${dir}/src/templates/global/TestPage/`)
      });
  });

  it("removes the template", () => {
    assert.noFile([
      "src/templates/global/TestPage/aem-component/.content.xml",
      "src/templates/global/TestPage/aem-component/child-page-components.xml",
      "src/templates/global/TestPage/aem-tmpl/.content.xml",
      "src/templates/global/TestPage/.content.xml",
      "src/templates/global/TestPage/config.js",
      "src/templates/global/TestPage/index.vue"
    ]);
  });
});

function runTemplateCreate() {
  const localConfig = {
    appName: "aem-app",
    templateContainer: {
      basePagePaths: [
        "core/wcm/components/page/v2/page",
        "/apps/aem-app/src/templates/global/BasePage/aem-component"
      ],
      TemplateComponents: {}
    }
  };
  const prompts = {
    "template.templateName": "TestPage",
    "template.title": "Test Page Template",
    "template.description": "A template for Test Page Template.",
    "template.category": "global",
    "template.allowedPaths": "/content(/*)",
    "template.ranking": 100,
    "template.slingType": "sling:resourceType",
    "template.resourcePath":
      "/apps/aem-app/src/templates/global/TestPage/aem-component",
    "component.slingType": "sling:resourceSuperType",
    "component.resourcePath":
      "/apps/aem-app/src/templates/global/BasePage/aem-component"
  };
  return helpers
    .run(path.join(__dirname, "../generators/template-create"))
    .withLocalConfig(localConfig)
    .withPrompts(prompts)
    .withArguments(["TestPage"]);
}
