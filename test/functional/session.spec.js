'use strict'

const Factory = use('Factory')
const { test, trait } = use('Test/Suite')('Tests Session')

trait('Test/ApiClient')
trait('Auth/Client')

const Token = use('App/Models/Token')

test('user login with valid data', async ({client}) => {
	const user = await Factory.model('App/Models/User').create()

  const data = {
		email: user.email,
		password: 'password123'
  }
	const response = await client.post('/login')
									.send(data)
                  .end()
  response.assertStatus(200)
}).timeout(0)

test('user login with not valid data', async ({client}) => {
  const user = Factory.model('App/Models/User').create()
  const data = {}
  const response = await client.post('/login')
                  .send(data)
                  .end()
  response.assertStatus(400)
  response.assertJSONSubset([
    {
      message: 'email is mandatory',
      field: 'email',
      validation: 'required'
    },
    {
      message: 'password is mandatory',
      field: 'password',
      validation: 'required'
    }
  ])
}).timeout(0)

test('logout user', async ({client}) => {
	const user = await Factory.model('App/Models/User', ).create()
	const response = await client.post('/logout')
									.loginVia(user, 'jwt')
									.end()
  response.assertStatus(204)
}).timeout(0)
