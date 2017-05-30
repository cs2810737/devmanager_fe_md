'use strict';

angular.module('myApp.developers', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
	
	$routeProvider
		.when('/developers/register', {
			templateUrl: 'developers/register.html',
			controller: 'DevelopersCtrl'
		})
}])

.controller('DevDialogCtrl', ['Token', '$http', '$scope', '$state', '$mdDialog', function(Token, $http, $scope, $state, $mdDialog){

	// $http.defaults.headers.common.Authorization = Token.getData()

	$scope.hide = function() {
  		$mdDialog.hide();
    };

    $scope.cancel = function() {
    	$mdDialog.cancel();
    };

    $scope.answer = function(answer) {
    	$mdDialog.hide(answer);
    };  

    $http.get('http://localhost:8000/leads/')
    	.then(function(result){
    		$scope.leads = result.data
    	})

    $http.get('http://localhost:8000/clients/')
    	.then(function(result){
    		$scope.clients = result.data
    	})

    $scope.addDeveloper = function(){
		var data = {
			'name': $scope.name,
			'start_date': $scope.start_date,
			'client': $scope.client,
			'lead': $scope.lead,
			'description': $scope.description
		}
		$http.post('http://localhost:8000/projects/', data)
			.then(function(){
				$state.go('projects', null, {reload:true})
				$mdDialog.cancel();
			})
	}
}])

.controller('DevelopersCtrl', ['Token', '$http', '$scope', '$location', function(Token, $http, $scope, $location) {
	

	$scope.goToRegistration = function(){
		$location.path('developers/register')
	}
}]);