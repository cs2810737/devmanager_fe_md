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