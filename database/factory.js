'use strict'

/*
|--------------------------------------------------------------------------
| Factory
|--------------------------------------------------------------------------
|
| Factories are used to define blueprints for database tables or Lucid
| models. Later you can use these blueprints to seed your database
| with dummy data.
|
*/

/** @type {import('@adonisjs/lucid/src/Factory')} */
const Factory = use('Factory')
const faker = require('faker')
faker.locale = "pt_BR";

Factory.blueprint('App/Models/User', () => {
	return {
		name: faker.name.findName(),
		email: faker.internet.email(),
		password: 'password123'
	}
})


