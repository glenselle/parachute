const chalk = require('chalk')
const fs = require('fs-extra')
const path = require('path')
const program = require('commander')

const commands = {
  go: require('./commands/go')
}

const corePath = require('./resolve')

program
  .version('1.0.0')
  .command('go [dir]')
  .action(commands.go)

program.parse(process.argv)
