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

const Route = use('Route')

Route.get('/', () => {
  return { message: 'Bem vindo ao Banco de Dados CRM da OnNet, por favor catacte o gestor de TI para mais informações' }
})

//register new User
Route.post('/register', 'AuthController.register');

Route.post('/authenticate', 'AuthController.authenticate');

Route.group(() => {
  Route.resource('answer', 'AnswerController').apiOnly().except(['store']);
  Route.resource('user', 'UserController').apiOnly();
  Route.resource('city', 'CityController').apiOnly();
  Route.resource('interview', 'InterviewController').apiOnly();
  Route.resource('quest', 'QuestController').apiOnly();
  Route.resource('search', 'SearchController').apiOnly();
  Route.resource('searchQuest', 'SearchQuestController').apiOnly().except(['store', 'update']);

  //answer filter routes
  Route.get('answer/city/:id', 'FilterAnswerController.findByCity');
  Route.get('answer/interview/:id', 'FilterAnswerController.findByInterview');
  Route.get('answer/quest/:id', 'FilterAnswerController.findByQuest');

  //interview filter routes
  Route.get('interview/city/:id', 'FilterInterviewController.findByCity');
  Route.get('interview/search/:id', 'FilterInterviewController.findBySearch');
  Route.get('interview/user/:id', 'FilterInterviewController.findByUser');
  Route.get('interview/groupBy/user', 'FilterInterviewController.interviewsByUser');
  Route.get('interview/groupBy/city', 'FilterInterviewController.interviewsByCity');

  //searchQuest filter routes
  Route.get('searchQuest/search/:id', 'FilterSearchQuestController.findBySearch');
  Route.get('searchQuest/quest/:id', 'FilterSearchQuestController.findByQuest');
}).middleware(['auth']);
