const chai = require('chai');
chai.use(require('chai-string'));
require('../test/globals.webdriverio');
global.expect = chai.expect;
require('./globals.webdriverio.js');

const takeScreenshot = err => this.client.takeScreenshot().then(() => {
  throw err;
});

global.test = (name, instructions) => it(name, () => {
  return instructions().catch(takeScreenshot);
});

global.scenario = (name, tests, clientName, close = false) =>
  describe(name, () => {
    const PrestClient = require("./clients/" + clientName);
    const client = new PrestClient();
    before(() => this.client = client);
    tests(client);
    if (close) {
      after(() => this.client.close());
    }
  });
