const parse = require('minimist');

const ui = require('./ui');
const service = require('./service');

const argv = parse(process.argv.slice(2));



ui.listPorts.start();
service.listPorts().then((data) => ui.listPorts.complete(data));


