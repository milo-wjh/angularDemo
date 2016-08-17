var app = angular.module('myApp', ['ui.router', 'ui.bootstrap', 'ngAnimate', 'providers', 'pasvaz.bindonce']);
app.config(['$stateProvider', '$urlRouterProvider', '$httpProvider', function($stateProvider, $urlRouterProvider, $httpProvider) {
	// $httpProvider.defaults.headers.post = {
 //    'Content-Type': 'application/x-www-form-urlencoded'
 //  }

	$urlRouterProvider.otherwise('index');
	$stateProvider
	.state('index', {
		url: '/index',
		templateUrl: 'template/list/list.html'
	})
	.state('company', {
		url: '/company',
		templateUrl: 'template/company.html',
		controller: 'companyCtrl'
	})
	.state('dec', {
		url: '/dec/:id',
		templateUrl: 'template/list/dec.html',
		controller: 'decCtrl'
	})
	.state('login', {
		url:'/login',
		templateUrl: 'template/form/login.html',
		controller: 'loginCtrl'
	})
	.state('register', {
		url: '/register',
		templateUrl: 'template/form/register.html',
		controller: 'registerCtrl'
	})
}])

