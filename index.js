#!/usr/bin/env node

const chalk = require('chalk')
const prompt = require('./generator/prompt')

console.log(chalk.white.bold(`\n\n\n
                       (((((/.  ,((((*
                  *((,.(,,(((((((      ((
                ((...(,,,,(((((((((.      (
              (....*,,,,,,(((((((((((       (
            (,....(,,,,,,,(((((((((((((
           (.....,,,,,,,,,,(((((((((((((       .
          (....../,,,,,,,,,/((((((,  .(((.(/.((
          (......*,,,,,*(((*((          *      /,
          /......(,,((                  (      (
          (.......,(         /          (     (
          (...((   .        , (         (     /
           (.(      *        /          (    (
            (                 (             .
              (        (       ((      .    (
                *,              /*     (   /
                   (      (      .     (
                     (            .    /  (
                       .,    /     ( /((///
                          (   , (...,..(/.(
                            ((...((*......,
                              (.............
                               (...........
                                (......*(
\n`))

const one = ['________', '________', '_______', '________', '________', '_____  __', '_______', '________', '_________']
const two = ['___  __ \\', '__    |', '__  __ \\', '__    |', '_  ____/', '__  / / /', '_  / / /', '__  __/', '__  ____/']
const three = ['__  /_/ /', '_  /| |', '_  /_/ /', '_  /| |', '  /    ', '__  /_/ /', '_  / / /', '__  /  ', '__  __/  ', ]
const four = ['_  ____/', '_  ___ |', '  _, _/', '_  ___ ', '/ /___  ', '_  __  /', ' / /_/ / ', '_  /   ', '_  /___',]
const five = ['/_/     ', '/_/  |_/', '_/ |_| ', '/_/  |_', '\\____/  ', '/_/ /_/  ', '\\____/  ', '/_/    ', '/_____/']

const mapFunc = (char, i) => {
  switch (i) {
    case 0:
      return chalk.red(char)
    case 1:
      return chalk.white(char)
    case 2:
      return chalk.blue(char)
    case 3:
      return chalk.red(char)
    case 4:
      return chalk.white(char)
    case 5:
      return chalk.blue(char)
    case 6:
      return chalk.red(char)
    case 7:
      return chalk.white(char)
    case 8:
      return chalk.blue(char)
  }

}

console.log(one.map(mapFunc).join(''))
console.log(two.map(mapFunc).join(''))
console.log(three.map(mapFunc).join(''))
console.log(four.map(mapFunc).join(''))
console.log(five.map(mapFunc).join(''))

require('./generator/prompt')
