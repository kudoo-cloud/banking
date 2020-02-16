const bunyan = require('bunyan'),
      bunyantcp = require('bunyan-logstash-tcp');

export const log = bunyan.createLogger({
    name: 'example',
    streams: [{
        level: 'debug',
        stream: process.stdout
    },{
        level: 'debug',
        type: "raw",
        stream: bunyantcp.createStream({
            host: '127.0.0.1',
            port: 5000
        })
    }],
    level: 'debug'
});