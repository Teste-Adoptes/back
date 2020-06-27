'use strict'


/** @type {import('@adonisjs/ignitor/src/Helpers')} */
const Helpers = use('Helpers')

const Url = require('url-parse')
const DATABASE_URL = new Url( process.env.DATABASE_URL )


module.exports = {

  connection: process.env.DB_CONNECTION || 'pg',

  pg: {
    client: 'pg',
    connection: {
      host: process.env.DB_HOST || DATABASE_URL.hostname,
      port: process.env.DB_PORT || DATABASE_URL.port,
      user: process.env.DB_USER || DATABASE_URL.username,
      password: process.env.DB_PASSWORD || DATABASE_URL.password,
      database: process.env.DB_DATABASE || DATABASE_URL.pathname.substr(1)
    },
    debug: process.env.DB_DEBUG || false
  }
}
