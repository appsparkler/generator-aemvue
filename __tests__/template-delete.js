/* eslint-disable*/
"use strict";
const path = require("path");
const assert = require("yeoman-assert");
const helpers = require("yeoman-test");
const fs = require("fs-extra");

describe("generator-av:template-delete", () => {
  beforeAll(() => {
    const localConfig = {
      appName: "aemarch13",
      templateContainer: {
        basePagePaths: [
          "core/wcm/components/page/v2/page",
          "/apps/aemarch13/src/templates/BasePage/aem-component"
        ],
        TemplateComponents: {
          "templates/InsightsPage": "InsightsPage",
          "templates/HomePage": "HomePage"
        }
      }
    };
    return helpers
      .run(path.join(__dirname, "../generators/template-delete"))
      .withLocalConfig(localConfig)
      .inTmpDir(function(dir) {
        fs.copySync(
          path.join(__dirname, "../generators/template-create/templates"),
          `${dir}/src/templates/global/TestPage/`
        );
      })
      .withPrompts({templatePath: "/templates/global/TestPage"});
  });

  it("removes the template files", () => {
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
