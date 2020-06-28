'use strict'

const User = use('App/Models/User')


const LoggerInfo = use('App/Middleware/LoggerInfo')
const LoggerError = use('App/Middleware/LoggerError')

class UserController {

  async index({auth, response, request, params}){
    try{
      const user = await auth.getUser()
      if(!user){
        return response.status(401).send({error: 'Not authorized'})
      }
      const users = await User.all()
      await LoggerInfo.log({request: request, params: params})
      return users
    } catch(error){
      await LoggerError.log(e, request)
    }
  }

  async show({params, auth, response, request}){
    try{
      const user = await auth.getUser()
      if(!user){
        return response.status(401).send({error: 'Not authorized'})
      }
      const userShow = await User.findOrFail(params.id)
      await LoggerInfo.log({request: request, params: params})
      return userShow
    } catch(e){
      await LoggerError.log(e, {request: request, params: params})
    }
  }

  async store({request, params}){
    try{
      const userData = request.all()
      const user = await User.create(userData)
      //LoggerInfo.logDetails( '', {user: user, request: request})
      await LoggerInfo.log({request: request, params: params})
      return user
    } catch(e) {
      await LoggerError.log(e, {request: request, params: params})
    }
  }

  async update({auth, params, response, request}){
    try{
      const user_auth = await auth.getUser()
      if(user_auth.id == params.id){
        const data = request.all()
        const user = await User.find(params.id)
        user.merge(data)
        await user.save()
        await LoggerInfo.log({request: request, params: params})
        return user
      } else {
        //LoggerError.log(request, user)
        return response.status(401).send({error: 'Not authorized'})
      }
    } catch(e){
      await LoggerError.log(e, {request: request, params: params})
    }
  }

  async destroy({auth, params, response, request}){
    try{
      const user = await auth.getUser()
      if(user.id == params.id){
        const userFind = await User.find(params.id)
        await LoggerInfo.log({request: request, params: params})
        await userFind.delete()
      } else {
        return response.status(401).send({error: 'Not authorized'})
      }
    } catch(e){
      await LoggerError.log(e, {request: request, params: params})
    }
  }

}

module.exports = UserController
