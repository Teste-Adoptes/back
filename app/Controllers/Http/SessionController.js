'use strict'

const Token = use('App/Models/Token')
const LoggerInfo = use('App/Middleware/LoggerInfo')
const LoggerError = use('App/Middleware/LoggerError')

class SessionController {

  async login({request, auth, params}){
    try{
      const {email, password} = request.all()
      const token = await auth.attempt(email, password)
      await LoggerInfo.log({request: request, params: params})
      return token
    } catch(e){
      LoggerError.log(e, {request: request, params: params})
    }
  }

  async logout({auth, response, request, params}){
    try{
      const user = await auth.getUser()
      if(!user){
        return response.status(401).send({ error: 'Not authorized' })
      }
      await LoggerInfo.log({request: request, params: params})
      await Token.query().where('user_id', user.id).delete()
    } catch(e){
      LoggerError.log(e, {request: request, params: params})
    }
  }
}

module.exports = SessionController
