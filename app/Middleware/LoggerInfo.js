'use strict'

const Logger = use('Logger')

class LoggerInfo{}

LoggerInfo.log = (data) => {
  Logger.level = 'info'

  Logger.info(`request details:
    {request: ${data.request.url()},
    params: ${Object.values(data.params)},
    method: ${data.request.method()}}`
  )
}

module.exports = LoggerInfo
