'use strict'

class UpdateUser {
  get rules () {
    return {
      name: 'string',
      email: 'string',
      password: 'string'
    }
  }

  get messages () {
    return {
      string: '{{ field }} not string valid'
    }
  }

  get validateAll () {
    return true
  }

  async fails (errorMessages) {
  	return this.ctx.response.status(400).json(errorMessages)
  }
}

module.exports = UpdateUser
