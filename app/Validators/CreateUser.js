'use strict'

class CreateUser {
  get rules () {
    return {
      name: 'required|string',
      email: 'required|email|unique:users',
      password: 'required'
    }
  }

  get messages () {
    return {
      required: '{{ field }} is mandatory',
      email: 'E-mail invalid',
      string: '{{ field }} not string valid',
      'email.unique': 'E-mail already registered'
    }
  }

  get validateAll () {
    return true
  }

  async fails (errorMessages) {
  	return this.ctx.response.status(400).json(errorMessages)
  }
}

module.exports = CreateUser
