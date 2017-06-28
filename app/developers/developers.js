'use strict';

angular.module('myApp.developers', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
	
	$routeProvider
		.when('/developers/register', {
			templateUrl: 'developers/register.html',
			controller: 'DevelopersCtrl'
		})
}])

.controller('DevDialogCtrl', ['Token', '$http', '$scope', '$state', '$mdDialog', '$mdEditDialog', function(Token, $http, $scope, $state, $mdDialog, $mdEditDialog){

	// $http.defaults.headers.common.Authorization = Token.getData()
	$scope.selected = [];
	$scope.hide = function() {
  		$mdDialog.hide();
    };

    $scope.cancel = function() {
    	$mdDialog.cancel();
    };

    $scope.answer = function(answer) {
    	$mdDialog.hide(answer);
    };  

    // $http.get('http://localhost:8000/leads/')
    // 	.then(function(result){
    // 		$scope.leads = result.data
    // 	})

    $http.get('http://localhost:8000/clients/')
    	.then(function(result){
    		$scope.clients = result.data
    	})

    $scope.addDevelopers = function(){
		// var data = {
		// 	'name': $scope.name,
		// 	'start_date': $scope.start_date,
		// 	'client': $scope.client,
		// 	'lead': $scope.lead,
		// 	'description': $scope.description
		// }
		// $http.post('http://localhost:8000/projects/', data)
		// 	.then(function(){
		// 		$state.go('projects', null, {reload:true})
		// 		$mdDialog.cancel();
		// 	})
		for (var i = 0; i < $scope.selected.length; i++) {
			var membership = {
				'start_date': new Date().toISOString().slice(0, 10),
				'role': 'Click here to assign role',
				'developer': $scope.selected[i].id,
				'project': $scope.project.id
			}
			// console.log($scope.selected[i])
			$http.post('http://localhost:8000/devmembership/', membership)
				.then(function(){
					$mdDialog.hide();
					$state.go('project_detail', null, {reload: true})
				})
		}
		console.log($scope.selected)
	}

	
}])

.controller('DevelopersCtrl', ['Token', '$http', '$scope', '$location', function(Token, $http, $scope, $location) {
	

	$scope.goToRegistration = function(){
		$location.path('developers/register')
	}
	
}]);