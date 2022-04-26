/**
 * Price Modifier
 * Copyright since 2021 JB Stoker and Contributors
 * <JB Stoker> Property
 *

 * @author    JB Stoker
 * @copyright Since 2021 JB Stoker
 * @license   https://opensource.org/licenses/MIT
 */

/**
 * Three mode available:
 *  build = production mode
 *  build:analyze = production mode with bundler analyzer
 *  dev = development mode
 */
module.exports = () => (
  process.env.NODE_ENV === 'production' ?
    require('./.webpack/prod.js')() :
    require('./.webpack/dev.js')()
);
