'use strict';

angular.module('myApp.developers', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
	
	$routeProvider
		.when('/developers/register', {
			templateUrl: 'developers/register.html',
			controller: 'DevelopersCtrl'
		})
}])

.controller('DevelopersCtrl', ['Token', '$http', '$scope', '$location', function(Token, $http, $scope, $location) {
	

	$scope.goToRegistration = function(){
		$location.path('developers/register')
	}
}]);