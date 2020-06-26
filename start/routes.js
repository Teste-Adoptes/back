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


/*
|--------------------------------------------------------------------------
| Route: -> Controller: SessionController
|--------------------------------------------------------------------------
*/
Route.post('/login', 'SessionController.login').validator('Login')
Route.post('/logout', 'SessionController.logout')

/*
|--------------------------------------------------------------------------
| Route: /cadastro -> Controller: UserController
|--------------------------------------------------------------------------
*/
Route.resource('cadastro', 'UserController').apiOnly()
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
