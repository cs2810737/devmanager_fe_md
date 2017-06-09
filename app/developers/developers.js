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
	console.log($scope.unassignedDevs)
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

	$scope.editComment = function(event, unassignedDev){
		event.stopPropagation()

		var promise = $mdEditDialog.large({
			clickOutsideToClose: true,
			modelValue: unassignedDev.role,
			placeholder: 'Role',
			save: function(input){
				unassignedDev.role = input.$modelValue
			},
			targetEvent: event,
			validators: {
				'md-maxlength': 30
			}
		})

		promise.then(function(ctrl){
			var input = ctrl.getInput()
			input.$viewChangeListeners.push(function(){
				// input.$setValidity()
			})
		})
	}
}])

.controller('DevelopersCtrl', ['Token', '$http', '$scope', '$location', function(Token, $http, $scope, $location) {
	

	$scope.goToRegistration = function(){
		$location.path('developers/register')
	}
}]);