'use strict'

/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| Http routes are entry points to your web application. You can create
| routes for different URLs and bind Controller actions to them.
|
| A complete guide on routing is available here.
| http://adonisjs.com/docs/4.1/routing
|
*/

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use('Route')



Route.group(() => {

	/*
	|--------------------------------------------------------------------------
	| Rota: -> Controller: SessionController
	|--------------------------------------------------------------------------
	*/
  Route.post('/login', 'SessionController.login').validator('Login')
  Route.post('/logout', 'SessionController.logout')

  /*
	|--------------------------------------------------------------------------
	| Rota: /api/users -> Controller: UserController
	|--------------------------------------------------------------------------
  */
  Route.resource('users', 'UserController').apiOnly()
    .validator(new Map([
      [['users.store'], ['CreateUser']],
      [['users.update'], ['UpdateUser']]
    ]))
    .middleware(new Map([
      [['users.index'], ['auth']],
      [['users.show'], ['auth']],
      [['users.update'], ['auth']],
      [['users.destroy'], ['auth']]
    ]))


}).prefix('api')
