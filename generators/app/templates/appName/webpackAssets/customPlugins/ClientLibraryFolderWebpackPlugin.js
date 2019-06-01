const {
  readdirSync: readDir,
  lstatSync: get_folderItemStats,
  copySync: copy,
  moveSync: move,
  removeSync: deleteFile,
  writeFileSync: write_file
} = require('fs-extra');
const {
  resolve: resolvePath,
  join: joinPath
} = require('path');
const { sync: get_glob } = require('glob');
const get_directories = folderPath => readDir(folderPath)
  .filter(folderItem => get_folderItemStats(resolvePath(folderPath, folderItem)).isDirectory());

function process_clientLibraryFolders(pathToDir) {
    pathToDir = resolvePath(pathToDir);
    const clientLibContentXMLFile = '.content.xml'
    const dirs = get_directories(pathToDir);
    //
    dirs.forEach(copyFiles_toDir.bind(null, clientLibContentXMLFile, pathToDir));
    deleteFiles_fromDir.call(null, pathToDir, clientLibContentXMLFile)
    dirs.forEach(write_clientLibMapFile.bind(null, pathToDir, 'js'));
    dirs.forEach(write_clientLibMapFile.bind(null, pathToDir, 'css'));
}

function write_clientLibMapFile(pathToDir, type, fileName) {
  const globPattern = joinPath(`**/*.${type}`);
  const globOptions = {
    cwd: joinPath(pathToDir, fileName)
  };
  const matchingFilePaths = get_glob(globPattern, globOptions);
  const txtFilePath = joinPath(pathToDir, fileName, `${type}.txt`);
  matchingFilePaths.forEach(filePath => write_file(txtFilePath, filePath));
}

function copyFiles_toDir(clientLibContentXMLFile, pathToDir, dir) {
    copy(joinPath(pathToDir, clientLibContentXMLFile), joinPath(pathToDir, dir, clientLibContentXMLFile));
}

function deleteFiles_fromDir(pathToDir, fileName) {
    const filePath = joinPath(pathToDir, fileName);
    deleteFile(filePath);
}

class ClientLibFolderWebpackPlugin {
  apply(compiler) {
      compiler.hooks.afterEmit.tap('ClientLibFolderWebpackPlugin', compilation => {
        // vendor and common chunks
        process_clientLibraryFoldersForCommonAndVendorChunks();
        process_clientLibraryFoldersForAllPublishLibs();
      })
  }
};

module.exports = ClientLibFolderWebpackPlugin;

function process_clientLibraryFoldersForAllPublishLibs() {
  try {
    const publishLibsGlobArray = get_glob('dist/**/publishLibs');
    publishLibsGlobArray.forEach(folder => process_clientLibraryFolders(folder));
  } catch (e) {
      console.error(e)
  }
}

function process_clientLibraryFoldersForCommonAndVendorChunks() {
  process_clientLibraryFolders('dist/chunk-vendors');
  process_clientLibraryFolders('dist/chunk-common');
}
