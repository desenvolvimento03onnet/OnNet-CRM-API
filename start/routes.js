'use strict'

const Route = use('Route')

Route.get('/', () => {
  return { message: 'Bem vindo ao Banco de Dados CRM da OnNet, por favor catacte o gestor de TI para mais informações' }
})

//register new User
Route.post('/register', 'AuthController.register');
Route.post('/authenticate', 'AuthController.authenticate');
Route.resource('/permission', 'PermissionController').apiOnly();

Route.group(() => {
  Route.resource('answer', 'AnswerController').apiOnly().except(['store']);
  Route.resource('city', 'CityController').apiOnly();
  Route.resource('interview', 'InterviewController').apiOnly();
  Route.resource('quest', 'QuestController').apiOnly();
  Route.resource('search', 'SearchController').apiOnly();
  Route.resource('searchQuest', 'SearchQuestController').apiOnly().except(['store', 'update']);
  Route.resource('user', 'UserController').apiOnly();
  Route.resource('userPermission', 'UserPermissionController').apiOnly().except(['store', 'update']);

  //answer filter routes
  Route.get('answer/countRates/:id', 'FilterAnswerController.countRates');

  //interview filter routes
  Route.get('interview/groupBy/user', 'FilterInterviewController.interviewsByUser');
  Route.get('interview/groupBy/city', 'FilterInterviewController.interviewsByCity');
  // Route.get('interview/historic/avarage/client', 'FilterInterviewController.avarageByClient');
  Route.get('interview/historic/avarage/city', 'FilterInterviewController.avarageByCity');
  Route.get('interview/historic/all', 'FilterInterviewController.interviewsHistoric');

  //quest filter routes
  Route.get('quest/exceptSearch/:id', 'FilterQuestController.findExceptSearch');

  //search filter routes
  Route.get('search/exceptQuest/:id', 'FilterSearchController.findExceptQuest');

  //searchQuest filter routes
  Route.get('searchQuest/search/:id', 'FilterSearchQuestController.findBySearch');
  Route.get('searchQuest/quest/:id', 'FilterSearchQuestController.findByQuest');

}).middleware(['auth']);
