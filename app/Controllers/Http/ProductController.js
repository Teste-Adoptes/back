'use strict'

const Product = use('App/Models/Product')
const LoggerInfo = use('App/Middleware/LoggerInfo')
const LoggerError = use('App/Middleware/LoggerError')

class ProductController {

  async search({request,response, auth, params}){
    try{
    const user = await auth.getUser()
    if(user){
      let name = request.input('name') || ''
      let description = request.input('description') || ''
      let category = request.input('category') || ''
      let page = request.input('page') || 1

      const products = await Product
                      .query()
                      .where('name', 'like', `${name.trim()}%`)
                      .andWhere('description', 'like', `${description.trim()}%`)
                      .andWhere('category', 'like', `${category.trim()}%`)
                      .paginate(page)
      await LoggerInfo.log({request: request, params: params})
      return products.toJSON()
    } else {
      return response.status(401).send({error: 'Not authorized'})
    }
    } catch(e){
      await LoggerError.log(e, {request: request, params: params})
    }
  }

  async store({request, response, auth, params}){
    try{
      const user = await auth.getUser()
      if(user){
        const data = request.all()
        const product = await Product.create(data)
        await LoggerInfo.log({request: request, params: params})
        return product
      } else {
        return response.status(401).send({error: 'Not authorized'})
      }
    } catch(e){
      await LoggerError.log(e, {request: request, params: params})
    }
  }

  async update({request, response, params, auth}){
    try{
      const user = await auth.getUser()
      if(user){
        const data = request.all()
        const product = await Product.find(params.id)
        product.merge(data)
        await product.save()
        await LoggerInfo.log({request: request, params: params})
        return product
      } else {
        return response.status(401).send({error: 'Not authorized'})
      }
    } catch(e){
      await LoggerError.log(e, {request: request, params: params})
    }
  }

  async destroy({request, response, params, auth}){
    try{
      const user = await auth.getUser()
      if(user){
        const product = await Product.find(params.id)
        await product.delete()
        await LoggerInfo.log({request: request, params: params})
      } else {
        return response.status(401).send({error: 'Not authorized'})
      }
    } catch(e){
      await LoggerError.log(e, {request: request, params: params})
    }
  }
}

module.exports = ProductController
