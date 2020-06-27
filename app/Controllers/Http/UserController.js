'use strict'

const User = use('App/Models/User')

class UserController {

  async index({auth, response}){
    const user = await auth.getUser()
    if(!user){
      return response.status(401).send({error: 'Not authorized'})
    }
    const users = await User.all()
    return users
  }

  async show({params, auth, response}){
    const user = await auth.getUser()
    if(!user){
      return response.status(401).send({error: 'Not authorized'})
    }

    const userShow = await User.findOrFail(params.id)
    return userShow
  }

  async store({request}){
    const userData = request.all()
    const user = await User.create(userData)
    return user
  }

  async update({auth, params, response, request}){
    const user_auth = await auth.getUser()
    if(user_auth.id == params.id){
      const data = request.all()
      const user = await User.find(params.id)
      user.merge(data)
      await user.save()
      return user
    } else {
      return response.status(401).send({error: 'Not authorized'})
    }
  }

  async destroy({auth, params, response}){
    const user = await auth.getUser()
    if(user.id == params.id){
      const userFind = await User.find(params.id)
      await userFind.delete()
    } else {
      return response.status(401).send({error: 'Not authorized'})
    }

  }

}

module.exports = UserController
