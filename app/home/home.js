'use strict';

angular.module('myApp.home', ['ngRoute'])

.config(['$stateProvider', function($stateProvider) {
	$stateProvider
		.state('home',{
			url: '/home',
			templateUrl: 'home/home.html',
			controller: 'HomeCtrl'
		})
}])

.controller('HomeCtrl', ['$http', '$scope', '$location', '$state', '$stateParams', function($http, $scope, $location, $state, $stateParams) {
	
	$scope.goToBillables = function(){
        $state.go('billables')
    }

	$scope.goToClients = function(){
        $state.go('clients')
    }

    $scope.goToProjects = function(){
        $state.go('projects')
    }
}]);