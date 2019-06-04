const path = require('path');
const get_generatedPages = require('./webpackAssets/utils/get_pages.js');
let vueConfig = {};
let { isDev, isProd } = process.env;

// ASSETS DIR
// vueConfig.assetsDir = '[name]/[contenthash:8]';
vueConfig.assetsDir = '[name]/[chunkhash:8]';
vueConfig.assetsDir = '[name]/[chunkhash:8]-[contenthash:8]';
// if(isProd) vueConfig.assetsDir = '[path]';

// PAGES
vueConfig.pages = get_pages();

// DEV SERVER
vueConfig.devServer = {};
vueConfig.devServer.proxy = 'http://localhost:4502';

// CONFIGURE WEBPACK
vueConfig.configureWebpack = {
    plugins: [],
    resolve: {
        modules: [
            path.resolve(__dirname, 'src'),
            'node_modules'
        ],
        alias:{
        vue$: 'vue/dist/vue.esm.js',
        '$': 'jquery'
        }
    },
    devServer: {
        writeToDisk: true
    },
    optimization: {
        splitChunks: {
            minSize: 1,
        }
    }
};

// CONFIGURE WEBPACK -- PLUGINS
if(isDev) vueConfig.configureWebpack.plugins.push(get_PluginToHotReloadIncludedPugs());
if(isProd) vueConfig.configureWebpack.plugins.push(...get_HTMLWebpackPluginsToCompilePugs());
if(isProd) vueConfig.configureWebpack.plugins.push(get_pluginToCopyAppFolders());
if(isProd) vueConfig.configureWebpack.plugins.push(get_clientLibraryFolderWebpackPlugin());
if(isProd) vueConfig.configureWebpack.plugins.push(copy_toAEMApps());

// UNUTILIZED : if(isProd) vueConfig.configureWebpack.plugins.push(get_pluginToGenerateManifest());

// CHAIN WEBPACK
vueConfig.chainWebpack = (...args) => {
    add_ruleForVuePlusPugs.apply(null, args);
    modify_ruleForFonts.apply(null, args);
    modify_ruleForImages.apply(null, args);
    modify_ruleForSVG.apply(null, args);
    configure_resolve.apply(null, args);
};

module.exports = vueConfig;

// abstracted methods
function configure_resolve(config) {
  config.resolve.alias
    .set('@', path.resolve(__dirname, 'src'));
}

function modify_ruleForSVG(config) {
    const svgRule = config.module.rule('svg');
    svgRule
      .use('file-loader')
        .loader('file-loader')
          .options({
              // name: '[name]/[contenthash:8]/img/[name].[hash:8].[ext]'
              name: 'chunk-vendors/[contenthash:8]/resources/svg/[name].[hash:8].[ext]'
            })
          .end()
        .end()
      .end()
    /* config.module.rule('svg')
    {
      test: /\.(svg)(\?.*)?$/,
      use: [
        {
          loader: 'file-loader',
          options: {
            name: '[name]/[contenthash:8]/img/[name].[hash:8].[ext]'
          }
        }
      ]
    }
    */
}

function modify_ruleForImages(config) {
    const imageRule = config.module.rule('images');
    imageRule
        .use('url-loader')
        .loader('url-loader')
        .options({
            limit: 4096,
            fallback: {
                loader: 'file-loader',
                options: {
                    // name: '[name]/[contenthash:8]/img/[name].[hash:8].[ext]'
                    // name: 'chunk-vendors/[contenthash:8]/resources/fonts/[name].[hash:8].[ext]'
                    name: 'chunk-vendors/[contenthash:8]/resources/images/[name].[hash:8].[ext]'
                }
            }
        })
        .end()
        .end()
        .end()
    /* config.module.rule('images')
    {
      test: /\.(png|jpe?g|gif|webp)(\?.*)?$/,
      use: [
        {
          loader: 'url-loader',
          options: {
            limit: 4096,
            fallback: {
              loader: 'file-loader',
              options: {
                name: '[name]/[contenthash:8]/img/[name].[hash:8].[ext]'
              }
            }
          }
        }
      ]
    },
    */
}

function modify_ruleForFonts(config) {
    const fontRule = config.module.rule('fonts');
    fontRule
        .use('url-loader')
        .loader('url-loader')
        .options({
            limit: 4096,
            fallback: {
                loader: 'file-loader',
                options: {
                    // name: 'fonts/[name].[hash:8].[ext]'
                    name: 'chunk-vendors/[contenthash:8]/resources/fonts/[name].[hash:8].[ext]'

                }
            }
        })
        .end()
        .end()
}

function get_pluginToCopyAppFolders() {
    try {
        const CopyPlugin = require('copy-webpack-plugin');
        const plugin = new CopyPlugin([
            // templates
            {
                from: 'src/templates/**/*?.*',
                transformPath: path => path.replace('src\\', ''),
                ignore: ['**/*.pug', '**/*.vue'],
                force: true
            },
            // experiences
            {
                from: 'src/experiences/**/*?.*',
                transformPath: path => path.replace('src\\', ''),
                ignore: ['**/*.pug', '**/*.vue'],
                force: true
            },
            // .content.xml files
            {
                from: 'src/**/.content.xml',
                transformPath: path => path.replace('src\\', ''),
                force: true
            },
            // chunk-common
            {
                from: 'src/**/chunk-common/*?.*',
                transformPath: path => path.replace('src\\', ''),
                force: true
            },
            // chunk-vendors
            {
                from: 'src/**/chunk-vendors/*?.*',
                transformPath: path => path.replace('src\\', ''),
                force: true
            },
            // clientlibs
            {
                from: 'src/clientlibs/**/*?.*',
                transformPath: path => path.replace('src\\', ''),
                force: true
            },
            // HTLTemplates
            {
              from: 'src/HTLTemplates',
              to: 'HTLTemplates'
            }
        ], {
            copyUnmodified: true
        });
        return plugin;
    } catch (e) {
        throw "error in getting plugin to copy App Folders " + e;
    }
}

function get_pages() {
    try {
        const pages = get_generatedPages(isDev);
        if(isDev) pages['FEAppIndex'] = {
            // entry for the page
            entry: path.resolve('src/feApp/index.js'),
            // the source template
            template: path.resolve('src/feApp/index.pug'),
            // output as dist/index.html
            filename: isDev ? 'index.html' : 'recycle-bin/feApp/index.html',
            // when using title option,
            // template title tag needs to be <title><%= HtmlWebpackPlugin.options.title %></title>
            title: 'AEM FE Dev App',
            // chunks to include on this page, by default includes
            // extracted common chunks and vendor chunks.
            chunks: [
              'chunk-vendors',
              'chunk-common',
              'FEAppIndex'
            ]
        };
        return pages;
    } catch (e) {
        throw "Error in getting pages : " + e;
    }
}

function get_HTMLWebpackPluginsToCompilePugs() {
    const HtmlWebpackPlugin = require('html-webpack-plugin');
    const glob = require('glob');
    const plugins = [];
    try {
        glob.sync('src/**/*.pug').forEach(templatePath => {
            const destPath = templatePath.replace('src/', '').replace('.pug', '.html');
            plugins.push(new HtmlWebpackPlugin({
                template: templatePath,
                filename: destPath,
                base: 'dist',
                inject: false
            }));
        });
    } catch (e) {
        throw e;
    }
    return plugins;
}

function add_ruleForVuePlusPugs(webpackConfig) {
    const pugRule = webpackConfig.module.rule('pug');
    pugRule.uses.clear();
    pugRule
        .test(/\.pug$/)
        .oneOf('pug-vue')
        .resourceQuery(/vue/)
        .use('pug-plain-loader')
        .loader('pug-plain-loader')
        .options({ basedir: path.resolve('src') })
        .end()
        .end()
        .oneOf('pug-template')
        .use('raw')
        .loader('raw-loader')
        .end()
        .use('pug-plain')
        .loader('pug-plain-loader')
        .options({ basedir: path.resolve('src') })
        .end()
        .end()
}

function get_PluginToHotReloadIncludedPugs() {
    try {
        if(process.env.isDev) {
            const LiveReloadPlugin = require("webpack-livereload-plugin");
            return new LiveReloadPlugin({
                appendScriptTag: true
            });
        }
    } catch (e) {

    }
}

function get_pluginToGenerateManifest() {
    try {
        const ManifestPlugin = require('webpack-manifest-plugin');
        return new ManifestPlugin({
            filter(fd) {
                if(fd.isChunk) return true;
                else return false;
            }
        });
    } catch (e) {
        console.log('error in get_pluginToGenerateManifest : ' + e);
    }
}

function get_clientLibraryFolderWebpackPlugin() {
  return new (require('./webpackAssets/customPlugins/ClientLibraryFolderWebpackPlugin.js'))();
}

function copy_toAEMApps() {
  try {
      const EventHooksPlugin = require('event-hooks-webpack-plugin');
      return new EventHooksPlugin({
        done() {
          try {
              require('./webpackAssets/utils/setup_AEMApp.js')();
              require('./webpackAssets/utils/executeMavenBuild.js')();
          } catch (e) {
              console.error(e);
          }
        }
      })
  } catch (e) {

  }
}
