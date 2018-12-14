/* eslint-disable*/
"use strict";
const path = require("path");
const assert = require("yeoman-assert");
const helpers = require("yeoman-test");

describe("generator-hello-1:template-container", () => {
  let ctx;
  beforeAll(() => {
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
        "/apps/aem-app/src/templates/global/BasePage/aem-component",
    };
    ctx = helpers
      .run(path.join(__dirname, "../generators/template-container"))
      .withLocalConfig(localConfig)
      .withPrompts(prompts)
      .withArguments(["TestPage"]);
    return ctx;
  });

  it("creates the Folder JCR .content.xml file", () => {
    assert.file(["src/templates/global/TestPage/.content.xml"]);
  });

  it("creates the Template JCR .content.xml file", () => {
    assert.file(["src/templates/global/TestPage/aem-tmpl/.content.xml"]);
  });

  it("creates the Component JCR .content.xml file", () => {
    assert.file(["src/templates/global/TestPage/aem-component/.content.xml"]);
  });

  it("creates the Vue Template File", () => {
    assert.file(["src/templates/global/TestPage/index.vue"]);
  });

  it("creates the Vue Template File", () => {
    assert.file(["src/templates/global/TestPage/config.js"]);
  });

  it("creates the Template Component File", () => {
    assert.file([
      "src/templates/global/TestPage/aem-component/child-page-components.html"
    ]);
  });

  it("creates the Template Component JS File", () => {
    assert.file([
      "src/components/Functional/TemplateComponentDecider/TemplateComponents.js"
    ]);
  });

  it("sets the correct answers object from prompts", () => {
    const {answers} = ctx;
    assert.objectContent(answers, {
      'template.resourcePath': '/apps/aem-app/src/templates/global/TestPage/aem-component',
      'component.resourcePath': '/apps/aem-app/src/templates/global/BasePage/aem-component'
    });
  });
});
