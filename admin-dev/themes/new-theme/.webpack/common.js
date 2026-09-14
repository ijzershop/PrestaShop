// The installer links this wrapper into PrestaShop and saves its pristine Git
// config under external/.deployment. Evaluate that source in the original module
// location so __dirname, require() and node_modules keep their upstream meaning.
const fs = require('fs');
const path = require('path');
const Module = require('module');

// The second location also supports the installer's explicit CopyMode.
const childRoot = fs.existsSync(path.join(__dirname, '..', '.deployment', 'webpack-common.upstream.js'))
  ? path.resolve(__dirname, '..')
  : path.resolve(__dirname, '../../../../external/modernesmid_webshop');
const shopRoot = path.resolve(childRoot, '../..');
const originalFilename = path.join(shopRoot, 'admin-dev/themes/new-theme/.webpack/common.js');
const upstream = new Module(originalFilename, module);
upstream.filename = originalFilename;
upstream.paths = Module._nodeModulePaths(path.dirname(originalFilename));
upstream._compile(
  fs.readFileSync(path.join(childRoot, '.deployment/webpack-common.upstream.js'), 'utf8'),
  originalFilename,
);

const config = upstream.exports;
config.entry.msthemeconfig_admin = './js/msthemeconfig';
config.entry.msthemeconfig_offergrid = './js/msthemeconfig_grid';
// Resolve relative imports and loader include paths at their deployed locations.
config.resolve = {...config.resolve, symlinks: false};
module.exports = config;
