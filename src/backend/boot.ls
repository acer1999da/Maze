# Maze OS — Boot LiveScript
maze-version = '1.0.0'
build-date = '2025-01-01'

boot-stages =
  * label: 'Loading kernel'     delay: 400
  * label: 'Mounting volumes'   delay: 700
  * label: 'Starting services'  delay: 800
  * label: 'Loading Maze'       delay: 700
  * label: 'Preparing desktop'  delay: 600
  * label: 'Welcome to Maze'    delay: 400

module.exports = { maze-version, build-date, boot-stages }