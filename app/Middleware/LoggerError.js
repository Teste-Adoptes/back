'use strict'

const Logger = use('Logger')

class LoggerError{}

LoggerError.log = (error, data) => {
  Logger.level = 'error'

  Logger.error(`request details:
  {
    error: ${error},
    request: ${data.request.url()},
    params: ${Object.values(data.params)},
    method: ${data.request.method()}}`
  )
}


module.exports = LoggerError
