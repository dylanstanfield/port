const process = require('child_process');

const service = {
    getActivePorts: function() {
        return execute('lsof -PiTCP -sTCP:LISTEN')
            .then((result) => parseActivePorts(result.stdout))
            .catch((err) => console.error(err));
    },

    getProcessForPort: function(port) {
        return service.getActivePorts()
            .then((lines) => {
                const data = lines.find((line) => line.port == port);
                return data ? data.pid : null;
            });
    },

    killProcess: function(pid) {
        return execute('kill -9 ' + pid)
            .then(() => pid);
    }
};

module.exports = service;


/*
 * Private API
 */

function execute(command) {
    return new Promise((resolve, reject) => {
        process.exec(command, (err, stdout, stderr) => {
            if (err) reject(err);
            else resolve({ stdout, stderr });
        });
    });
}

function _byPortAscending(a, b) {
    return parseInt(a.port) - parseInt(b.port);
}

function parseActivePorts(output) {
    const rows = output.split('\n').filter(empty);
    rows.shift();

    const processes = rows.map((row) => {
        const data = row.split(' ').filter(empty);

        return {
            command: data[0].trim(),
            pid: data[1],
            user: data[2],
            fileDescriptor: data[3],
            type: data[4],
            device: data[5],
            size_off: data[6],
            node: data[7],
            name: data[8] + ' ' + data[9],
            port: data[8].split(':').pop()
        };
    });
    return processes.sort(_byPortAscending);
}

function empty(data) { return !!data; }