'use strict'
/* jshint esversion: 6, asi: true, node: true */
/*
 * index.js
 *
 * WebSSH2 - Web to SSH2 gateway
 * Bill Church - https://github.com/billchurch/WebSSH2 - May 2017
 *
 */

var config = require('./server/app').config
var server = require('./server/app').server

var configHttps = require('./server/appHttps').config
var serverHttps = require('./server/appHttps').server

server.listen({ host: config.listen.ip, port: config.listen.port})

console.log('WebSSH2 service listening on ' + config.listen.ip + ':' + config.listen.port)

serverHttps.listen({ host: configHttps.listen.ip, port: configHttps.listen.port})

console.log('WebSSH2 https service listening on ' + configHttps.listen.ip + ':' + configHttps.listen.port)

server.on('error', function (err) {
  if (err.code === 'EADDRINUSE') {
    config.listen.port++
    console.warn('WebSSH2 Address in use, retrying on port ' + config.listen.port)
    setTimeout(function () {
      server.listen(config.listen.port)
    }, 250)
  } else {
    console.log('WebSSH2 server.listen ERROR: ' + err.code)
  }
})

serverHttps.on('error', function (err) {
  if (err.code === 'EADDRINUSE') {
    config.listen.port++
    console.warn('WebSSH2 Address in use, retrying on port ' + config.listen.port)
    setTimeout(function () {
      server.listen(config.listen.port)
    }, 250)
  } else {
    console.log('WebSSH2 server.listen ERROR: ' + err.code)
  }
})
