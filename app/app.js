'use strict';

// Declare app level module which depends on views, and components
angular.module('myApp', [
  'ngRoute',
  'ui.router',
  'myApp.login',
  'myApp.sideBar',
  'myApp.projects',
  'myApp.developers',
  'myApp.billables',
  'myApp.home',
  'myApp.clients',
  'myApp.version',
  'ngMaterial',
  'ngAnimate',
  'ngAria',
  'ngMessages',
  'ngTable',
]).
config(['$locationProvider', '$urlRouterProvider', '$stateProvider', '$httpProvider', function($locationProvider, $urlRouterProvider, $stateProvider, $httpProvider) {
  $locationProvider.hashPrefix('!');

  // $routeProvider.otherwise({redirectTo: 'login'})
  $urlRouterProvider.otherwise('/login')
  var loginState = {
	name: 'login',
	url: '/login',
	templateUrl: '/login/login.html',
	controller: 'LoginCtrl'
  }
  $stateProvider.state(loginState)

  $httpProvider.interceptors.push('authInterceptor')
}])

.factory('User', function(){
  var user
  return {
	setData: function(data){
	  user = data
	},
	getData: function(){
	  return user
	}
  }
})

.factory('BillFormData', function(){
  var billFormData
  return {
	setData: function(data){
	  billFormData = data
	},
	getData: function(data){
	  return billFormData
	}
  }
})

.factory('Token', function(){
  var token
  return {
	setData: function(data){
	  token = data
	},
	getData: function(){
	  return token
	}
  }
})

.factory('authInterceptor', function($rootScope, $q, $window){
	return {
		request: function(config){
			config.headers = config.headers || {}
			if ($window.sessionStorage.token) {
				config.headers.Authorization = 'Bearer ' + $window.sessionStorage.token
			}
			return config
		},
		response: function(response){
			if (response.status === 401) {
				// handle case where user is unauthenticated
			}
			return response || $q.when(response)
		}
  	}
})