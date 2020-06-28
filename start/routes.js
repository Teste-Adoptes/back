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
      [['cadastro.store'], ['CreateUser']],
      [['cadastro.update'], ['UpdateUser']]
    ]))
    .middleware(new Map([
      [['cadastro.index'], ['auth']],
      [['cadastro.show'], ['auth']],
      [['cadastro.update'], ['auth']],
      [['cadastro.destroy'], ['auth']]
    ]))

  Route.get('product/search',
    'ProductController.search')
  .middleware('auth')
  .as('product/search')

  Route.resource('product', 'ProductController').apiOnly()
  .middleware('auth')
  .except(['index', 'show'])

}).prefix('api')
