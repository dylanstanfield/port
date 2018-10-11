#!/usr/bin/env node

const argv = require('minimist')(process.argv.slice(2));
const _ = require('lodash');
const commands = require('./commands');

const command = _.find(commands, { command: argv._[0] });

if(command) {
    const args = _parseArgs(command, argv);
    return command.action(args);
} else {
    const { help, h, version, v } = argv;
    if(help || h) return cli.help(commands);
    if(version || v) return cli.version();

    console.log('Command not found');
}

function _parseArgs({ options }, argv) {
    const args = { _: argv._ };

    options.forEach(({ name, shortcut, position, required }) => {
        args[name] = argv[name] || argv[shortcut] || argv._[position];

        if(required && !args[name]) {
            console.log(`Required param not provided: ${ name }`)
            process.exit();
        }
    });

    return args;
}