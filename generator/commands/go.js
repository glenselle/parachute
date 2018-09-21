const inquirer = require('inquirer')
const path = require('path')
const fs = require('fs-extra')

module.exports = function(dir, cmd) {
  const src = path.resolve(path.join(__dirname, '../../core/'))
  const cwd = path.resolve(path.join(__dirname, '../../'))

  if (!dir) {
    const question = {
      type: 'input',
      name: 'dest',
      message: 'Specify an output directory path (or blank for cwd):'
    }

    inquirer
      .prompt([question])
      .then(answers => {
        copyDirectory(src, answers.dest || cwd)
      })
  } else {
    const dest = path.resolve(dir || cwd)
    copyDirectory(src, dest)
  }
}

function copyDirectory(src, dest) {
  const copy = fs.copy(src, dest).then(() => {
    console.log('Finished copying files')
  })

  fs.ensureDir(dest)
    .then(copy)
    .catch(err => {
      console.error('There was an error creating the project directory')
    })
}
