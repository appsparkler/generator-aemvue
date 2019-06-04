module.exports = function() {
  let dataEvents = 0;
  const { exec } = require('child_process');
  const path = require('path')
  const appConfig = require(path.resolve('appConfig.json'));
  const appName = appConfig.appName;
  const pathToAEMProjectFolder = appConfig.pathToAEMProjectFolder;
  const AEMUIAPPSPath = path.resolve(pathToAEMProjectFolder, appName, 'ui.apps');
  const mvnInstallExe = exec(`mvn -PautoInstallPackage clean install -o`, {
    cwd: AEMUIAPPSPath
  });


  mvnInstallExe.stdout.on('data', function (data) {
    const buildMsg = 'Maven is building and deploying your project.  Please wait...';
    if (!dataEvents) console.log(buildMsg);
    dataEvents = 1;
  });

  mvnInstallExe.stderr.on('data', function (data) {
    console.log('stderr: ' + data.toString());
  });

  mvnInstallExe.on('exit', function (code) {
    console.log('child process exited with code ' + code.toString());
  });
}
