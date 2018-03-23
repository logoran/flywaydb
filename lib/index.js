'use strict';

let path = require('path');
let spawn = require('child_process').spawn;
let resolver = require('../jlib/resolver');

function operate(cmd, configFile) {
    let cwd = process.cwd(),
        config = require(path.resolve(configFile)),
        configArgs = Object.keys(config),
        args,
        child;

    args = (resolver.argsPrefix ? resolver.argsPrefix : [])
        .concat([cmd])
        .concat(
            configArgs
            .filter(x => !!config[x])
            .map(x => `-${x}=${config[x].replace(/\s/g, '\\ ')}`)
        );

    child = spawn(resolver.bin, args, {
        cwd: cwd,
        stdio: 'inherit',
        windowsVerbatimArguments: true // Super Weird, https://github.com/nodejs/node/issues/5060
    });

    child.on('close', code => {
        process.exit(code);
    });
}

module.exports = operate;