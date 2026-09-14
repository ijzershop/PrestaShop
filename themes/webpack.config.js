const fs = require('fs');
const path = require('path');
const Module = require('module');

const childRoot = fs.existsSync(path.join(__dirname, '..', '.deployment', 'webpack-themes.upstream.js'))
  ? path.resolve(__dirname, '..')
  : path.resolve(__dirname, '../external/modernesmid_webshop');
const originalFilename = path.resolve(childRoot, '../../themes/webpack.config.js');
const upstream = new Module(originalFilename, module);
upstream.filename = originalFilename;
upstream.paths = Module._nodeModulePaths(path.dirname(originalFilename));
upstream._compile(
  fs.readFileSync(path.join(childRoot, '.deployment/webpack-themes.upstream.js'), 'utf8'),
  originalFilename,
);

module.exports = (env, argv) => {
  const config = upstream.exports(env, argv);
  config.resolve = {...config.resolve, symlinks: false};
  return config;
};
