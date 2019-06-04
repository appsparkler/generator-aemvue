const path = require('path');
const _ = require('underscore')
const appConfig = require(path.resolve('.yo-rc.json'))['generator-aemvue'];

module.exports = function (isDev) {
  try {
    var nodesForGeneratingPages = [
      "components",
      "experiences",
      "templates"
    ];
    var pages = {};
    nodesForGeneratingPages.forEach(
      path1 => {
        const componentTypeObj = appConfig[path1];
        Object.keys(componentTypeObj).forEach(
          path2 => {
            const categoryObj = appConfig[path1][path2]
            Object.keys(categoryObj).forEach(
              componentNode => {
                const component = appConfig[path1][path2][componentNode];
                pages[`${path1}/${path2}/${component.name}/publishLibs`] = {
                  entry: path.resolve(`src/${path1}/${path2}/${component.name}/index.js`),
                  filename: isDev ?
                  `${path1}/${path2}/${component.name}/index.html` :
                  `recycle-bin/${path1}/${path2}/${component.name}/index.html`,
                  title: component.title,
                  chunks: component.chunks
                }
              }
            )
          }
        )
      }
    )
    return pages;
  } catch (e) {
      console.error(e)
  }
}
