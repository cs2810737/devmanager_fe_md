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
  // 'ngTable',
]).
config(['$locationProvider', '$urlRouterProvider', '$stateProvider', function($locationProvider, $urlRouterProvider, $stateProvider) {
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

	
}])

.factory('Billables', function(){
	var billables
	return {
		setData: function(data){
			billables = data
		},
		getData: function(){
			return billables
		}
	}
})

.factory('Clients', function(){
	var clients
	return {
		setData: function(data){
			clients = data
		},
		getData: function(){
			return clients
		}
	}
})

.factory('Credentials', function(){
	var credentials
	return {
		setData: function(data){
			credentials = data
		},
		getData: function(){
			return credentials
		}
	}
})

.factory('Projects', function(){
	var projects
	return {
		setData: function(data){
			projects = data
		},
		getData: function(){
			return projects
		}
	}
})