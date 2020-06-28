'use strict'

const Factory = use('Factory')
const { test, trait } = use('Test/Suite')('Tests for products')

trait('Test/ApiClient')
trait('Auth/Client')

const Product = use('App/Models/Product')
const User = use('App/Models/User')
const Token = use('App/Models/Token')
const URL_BASE = '/api/product/'


test('Search product ', async ({client}) => {
  const user = await Factory.model('App/Models/User').create()
  const product = await Factory.model('App/Models/Product').createMany(10)

  const query = {
    name: product[0].name,
    description: '',
    category: '',
    page: 1
  }

  //&description=${query.description}&category=${query.category}

  const response = await client.get(`${URL_BASE}search?name=${query.name}

                  &page=${query.page}`)
                  .loginVia(user, 'jwt')
                  .end()

  response.assertStatus(200)
}).timeout(0)

test('Create product', async ({client}) => {
  const user = await Factory.model('App/Models/User').create()
  const data = {
    name: 'Notebook',
    description: 'Person computer',
    category: 'Computer',
    price: 1000.0,
    stock: 100
  }
  const response = await client.post(`${URL_BASE}`)
                  .loginVia(user, 'jwt')
                  .send(data)
                  .end()

  response.assertStatus(200)
  response.assertJSONSubset({
    name: data.name,
    description: data.description,
    category: data.category,
    price: data.price,
    stock: data.stock
  })
}).timeout(0)

test('Update product', async ({client}) => {
  const user = await Factory.model('App/Models/User').create()
  const product = await Factory.model('App/Models/Product').create()
  const data = {
    name: 'Notebook',
    description: 'Person computer',
    category: 'Computer',
    price: 1000.0,
    stock: 100
  }
  const response = await client.put(`${URL_BASE}${product.id}`)
                  .loginVia(user, 'jwt')
                  .send(data)
                  .end()

  response.assertStatus(200)
  response.assertJSONSubset({
    name: data.name,
    description: data.description,
    category: data.category,
    price: data.price,
    stock: data.stock
  })
}).timeout(0)

test('Delete product', async ({client}) => {
  const user = await Factory.model('App/Models/User').create()
  const product = await Factory.model('App/Models/Product').create()
  const response = await client.delete(`${URL_BASE}${product.id}`)
                  .loginVia(user, 'jwt')
                  .end()

  response.assertStatus(204)

}).timeout(0)
