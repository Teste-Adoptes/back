'use strict'

const Factory = use('Factory')
const { test, trait } = use('Test/Suite')('Tests for User')

trait('Test/ApiClient')
trait('Auth/Client')

const User = use('App/Models/User')
const Token = use('App/Models/Token')
const URL_BASE = '/api/cadastro/'


test('Get single user', async ({client}) => {
  const user = await Factory.model('App/Models/User').create()
  const response = await client.get(`${URL_BASE}${user.id}`)
                  .loginVia(user, 'jwt')
                  .end()
  response.assertStatus(200)
  response.assertJSONSubset({
    name: user.name,
    email: user.email
  })
}).timeout(0)

test('Get all users', async ({client}) => {
  const user_loged = await Factory.model('App/Models/User').create()
  const users = await Factory.model('App/Models/User').createMany(10)
  const response = await client.get(`${URL_BASE}`)
                  .loginVia(user_loged, 'jwt')
                  .end()
  response.assertStatus(200)
}).timeout(0)

test('Store user', async ({client}) => {
  const data = {
    name: 'Bruno',
    email: 'test@test.com',
    password: '123456'
  }
  const response = await client.post(`${URL_BASE}`)
                  .send(data)
                  .end()
  response.assertStatus(200)
  response.assertJSONSubset({
    name: data.name,
    email: data.email
  })
}).timeout(0)

test('Update user', async ({client}) => {
  const user = await Factory.model('App/Models/User').create()
  const data = {
    name: 'Bruno',
    email: 'test1@test.com',
    password: '123456'
  }
  const response = await client.put(`${URL_BASE}${user.id}`)
                  .loginVia(user, 'jwt')
                  .send(data)
                  .end()
  response.assertStatus(200)
  response.assertJSONSubset({
    name: data.name,
    email: data.email
  })
}).timeout(0)

test('Destroy user', async ({client}) => {
  const user = await Factory.model('App/Models/User').create()
  const response = await client.delete(`${URL_BASE}${user.id}`)
                  .loginVia(user, 'jwt')
                  .end()
  response.assertStatus(204)
}).timeout(0)


