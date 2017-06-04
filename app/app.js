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
  'md.data.table'
]).
config(['$locationProvider', '$urlRouterProvider', '$stateProvider', '$httpProvider', '$mdThemingProvider', function($locationProvider, $urlRouterProvider, $stateProvider, $httpProvider, $mdThemingProvider) {
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

  var darkBlue = {
  	'50': '#3868bd',
    '100': '#325daa',
    '200': '#2d5296',
    '300': '#274882',
    '400': '#213d6f',
    '500': '#1b325b',
    '600': '#152747',
    '700': '#0f1c34',
    '800': '#091220',
    '900': '#04070c',
    'A100': '#4775c8',
    'A200': '#5a84ce',
    'A400': '#6e93d4',
    'A700': '#000000',
    'contrastDefaultColor': 'light',
    'contrastDarkColors': ['50', '100', '200', '300', '400', 'A100'],
    'contrastLightColors': undefined

  }
  var redBrown = {
  	'50': '#37180c',
    '100': '#4c2110',
    '200': '#622a14',
    '300': '#773319',
    '400': '#8c3c1d',
    '500': '#a14522',
    '600': '#cb572a',
    '700': '#d66539',
    '800': '#da754e',
    '900': '#df8663',
    'A100': '#cb572a',
    'A200': '#b64e26',
    'A400': '#a14522',
    'A700': '#e39679',
    'contrastDefaultColor': 'dark',
    'contrastDarkColors': undefined,
    'contrastLightColors': ['50', '100', '200', '300', '400', 'A100']
  }

  $mdThemingProvider.definePalette('darkBlue', darkBlue)
  $mdThemingProvider.definePalette('redBrown', redBrown)
  $mdThemingProvider.theme('default')
  	.primaryPalette('darkBlue', {
  		'default': '500',
  		'hue-1': '100',
  		'hue-2': '600',
  		'hue-3': 'A100'
  	})
  	.accentPalette('redBrown', {
  		'default': '500',
  		'hue-1': '100',
  		'hue-2': '600',
  		'hue-3': 'A100'
  	})
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