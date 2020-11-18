// * APP SETTINGS ==============================================================
// * General settings for the web application.
// * ===========================================================================

//* General settings
const GENERAL = {
  name:         'mPartial',
  description:  '',
}

//* Directory paths
const path   = require('path');
const root   =  process.cwd();
const client = path.resolve(__dirname, 'client');
const public = path.resolve(__dirname, 'public');
const app =  path.resolve(client, 'app');
const output = path.resolve(__dirname, 'build');

const PATHS = {
  cache: path.resolve(root, 'node_modules', '.cache'),
  settings: path.resolve(root, 'settings'),
  configs: {
    editor:    path.resolve(root, '.editorconfig'),
    babel:     path.resolve(client, '.babelrc'),
    tsconfig:  path.resolve(client, 'tsconfig.json'),
    postcss:   path.resolve(client, 'postcss.config.js'),
    stylelint: path.resolve(client, '.stylelintrc.json'),
    tslint:    path.resolve(client, 'tslint.json'),
  },
  entry:  path.resolve(client, 'index.tsx'),
  index: {
    input:  path.resolve(public, 'index.html'),
    output: path.resolve(output, 'index.html'),
  },
  devIndex: {
    input:  path.resolve(public, 'index.html'),
    output: path.resolve(output, 'index.html'),
  },
  htaccess: path.resolve(root, '.htaccess'),
  assets: path.resolve(client, 'assets'),
  utils: path.resolve(client, 'utils'),
  styles: path.resolve(client, 'styles'),
  app: path.resolve(client, 'app'),
  contexts: path.resolve(client, 'contexts'),
  pages: path.resolve(app, 'pages'),
  components: path.resolve(app, 'components'),
  app,
  root,
  client,
  output,
  static: path.resolve(output, 'static/'),
}

//console.log(PATHS)
//* Module export
module.exports = {
  GENERAL,
  PATHS,
};
