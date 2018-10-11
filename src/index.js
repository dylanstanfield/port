#!/usr/bin/env node

const argv = require('minimist')(process.argv.slice(2));
const _ = require('lodash');
const chalk = require('chalk');

const commands = require('./commands');
const package = require('../package.json');

const command = _.find(commands, { command: argv._[0] });

if(command) {
    const args = _parseArgs(command, argv);
    return command.action(args);
} else {
    const { help, h, version, v } = argv;
    if(help || h) return _help();
    if(version || v) return _version();

    console.log(`Command not found`);
}

function _parseArgs({ options }, argv) {
    const args = { _: argv._ };

    options.forEach(({ name, position, required }) => {
        args[name] = argv._[position];

        if(required && !args[name]) {
            console.log(`Required param not provided: ${ name }`)
            process.exit();
        }
    });

    return args;
}

function _help() {
    const green = chalk.hex('#5BC769');

    console.log(``);
    console.log(green(`  $ ${ chalk.bold('port') } <command> [options]`));
    console.log(``);
    console.log(`  ${ chalk.dim('Commands:') }`);
    console.log(``);
    commands.map(({ command, description, options }) => {
        console.log(`    ${ green(`$ port ${ command } ${ options.map(({ name, required }) => { return required ? '<' + name + '>' : '[' + name + ']' }).join(' ') }`) }`);
        console.log(`      ${ description }`);
    });
    console.log(``);
}

function _version() {
    console.log(`\nv${ package.version }\n`);
}