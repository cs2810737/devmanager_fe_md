'use strict';

angular.module('myApp.developers', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
	
	$routeProvider
		.when('/developers/register', {
			templateUrl: 'developers/register.html',
			controller: 'DevelopersCtrl'
		})
}])

.controller('DevelopersCtrl', ['Billables', 'Credentials', '$http', '$scope', '$location', function(Billables, Credentials, $http, $scope, $location) {
	

	$scope.goToRegistration = function(){
		$location.path('developers/register')
	}
}]);