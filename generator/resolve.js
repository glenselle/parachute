const path = require('path')

// if resolving parachute fails, assume local development and resolve accordingly
function getCorePath () {
  try {
    const parachuteWD = require.resolve('parachute').split('index.js')[0]
    return path.join(parachuteWD, 'core/')
  } catch (err) {
    return path.resolve(path.join(__dirname, './../core'))
  }
}

module.exports = getCorePath()
