module.exports = function() {
  const fs = require('fs-extra');
  const path = require('path');
  const appConfig = require(path.resolve('.yo-rc.json'))['generator-aemvue'];
  const appName = appConfig.appName;
  const pathToAEMAppDist = path.join(appConfig.pathToAEMProjectFolder, `/${appName}/ui.apps/src/main/content/jcr_root/apps/${appName}`, 'dist');
  //
  fs.removeSync(pathToAEMAppDist);
  fs.copySync('dist', pathToAEMAppDist);
}
