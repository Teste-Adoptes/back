'use strict'

class Login {
  get rules () {
    return {
      email: 'required|string',
      password: 'required'
    }
  }

  get messages () {
  	return {
  		required: '{{ field }} is mandatory',
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

module.exports = Login
