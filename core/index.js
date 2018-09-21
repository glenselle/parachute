require('@google-cloud/debug-agent').start();
require('babel-register')({
    presets: ['env']
})
require('./src/server')
