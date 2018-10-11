const chalk = require('chalk');
const service = require('../service');

module.exports = {
    command: 'clear',
    options: [{
        name: 'port',
        position: 1,
        required: true
    }],
    description: 'Kill the process running on a given port',
    action: clear,
}

function clear({ port }) {
    service.getProcessForPort(port)
        .then((pid) => {
            if(!pid) {
                _print(`No active process found`, port);
                process.exit();
            }

            service.killProcess(pid)
                .then(() => _print(`Cleared`, port));
        });
}

/*
 * Private API
 */

function _print(message, port) {
    console.log(`\n${ message } ${ chalk.hex('#999999')(`{ port: ${ port } }`) }\n`)
}