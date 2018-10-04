const chalk = require('chalk');
const cliui = require('cliui');

const blue = chalk.hex('#08B2E3');
const red = chalk.hex('#EE6352');
const gray = chalk.hex('#999999');

const success = blue.bold('Success');

const ui = {
    listPorts: {
        timer: null,
        start: function() {
            ui.listPorts.timer = new Date().getTime();
            console.log(`${gray('(1/2)')} 🔎  Checking for ports...`);            
        },
        complete: function(lines) {
            var time = new Date().getTime() - ui.listPorts.timer;
            console.log(portsTable(lines, time));
        }
    },

    closePort: {
        timer: null,
        start: function() {
            ui.closePort.timer = new Date().getTime();            
            console.log(`${gray('(1/3)')} 🔎  Checking for an active process...`);
        },
        found: function(pid) {
            console.log(`${gray('(2/3)')} 🤺  Killing process ${pid}...`);
        },
        complete: function(port) {
            var time = new Date().getTime() - ui.closePort.timer;            
            console.log(`${gray('(3/3)')} 👍  ${success} port ${port} is now free`);
            console.log(gray(`${chalk.black.hidden('.    ')} ⚡️  Completed in ${time}ms`));
            console.log('');
        },
        noActiveProcess: function(port) {
            var time = new Date().getTime() - ui.closePort.timer;  
            console.log(`${chalk.black.hidden('.    ')} 👍  No active process found - port ${port} is free`);
            console.log(gray(`${chalk.black.hidden('.    ')} ⚡️  Completed in ${time}ms`));
            console.log('');
        }
    }
};

module.exports = ui;



/*
 * Private API
 */

function portsTable(lines, time) {
    var table = cliui({ width: 80 });
    
    table.div(
        col({ text: `${gray('(2/2)')} ⛵️  ${success} found ${blue.bold(lines.length)} active ports`, width: 80, padding: [] })
    );

    table.div(
        col({ text: gray(`${chalk.black.hidden('.    ')} ⚡️  Completed in ${time}ms`), width: 80, padding: [0, 0, 1, 0] })
    );

    table.div(
        col({ text: 'port' }),
        col({ text: 'command', width: 24 }),
        col({ text: 'pid' }),
        col({ text: 'type' }),
        col({ text: 'fd' }),
    );

    table.div(
        col({ text: '--------------------------------------------------------------------------', width: 80 })
    );

    lines.forEach((line) => {
        table.div(
            col({ text: line.port }),
            col({ text: line.command, width: 24 }),
            col({ text: line.pid }),
            col({ text: line.type }),
            col({ text: line.fileDescriptor }),
        );
    })

    table.div(
        col({ width: 80 })
    );

    return table.toString();
}

function col({text, width, padding}) {
    return {
        text: text || '',
        width: width || 14,
        padding: padding || [0, 3, 0, 3]
    };
}