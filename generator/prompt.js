const vorpal = require('vorpal')()

const chalk = require('chalk')
const cliInput = require('./cliInput')


let prompt

vorpal
  .command('go', 'Generates a new base project')
  .action(function() {
    prompt = new Prompt(this)
  })

vorpal
  .delimiter('Parachute:')
  .show()

  vorpal.exec('go')

  module.exports = prompt
