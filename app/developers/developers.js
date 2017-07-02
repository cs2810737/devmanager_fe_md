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

    // $scope.assignRole = function(event, developer){
    // 	event.stopPropagation()
    // 	var promise = $mdEditDialog.small({
    // 		modelValue: developer.role,
    // 		placeholder: 'Role',
    // 		save: function(input){
    // 			developer.role = input.$modelValue
    // 		},
    // 		targetEvent: event,
    // 		validators: {
    // 			'md-maxlength': 64
    // 		}
    // 	})

    // 	promise.then(function(ctrl){
    // 		var input = ctrl.getInput()
    // 	}).then()
    // }
    $scope.assignRole = function(event, unassignedDev){
    	event.stopPropagation()
    	var promise = $mdEditDialog.small({
    		modelValue: unassignedDev.role,
    		placeholder: 'Role',
    		save: function(input){
    			unassignedDev.role = input.$modelValue
                console.log(unassignedDev)
    		},
    		targetEvent: event,
    		validators: {
    			'md-maxlength': 30
    		}
    	})

    	promise.then(function(ctrl){
    		var input = ctrl.getInput()

    		// input.$viewChangeListeners.push(function(){
    		// 	input.$setValidity('test', input.$modelValue !== 'test')
    		// })
    	}).then(function(){
            console.log(unassignedDev)
        })
    }
    $scope.addDevelopers = function(){
		for (var i = 0; i < $scope.selected.length; i++) {
			var membership = {
				'start_date': new Date().toISOString().slice(0, 10),
				'role': $scope.selected[i].role,
				'developer': $scope.selected[i].id,
				'project': $scope.project.id
			}
			console.log(membership)
			// $http.post('http://localhost:8000/devmembership/', membership)
			// 	.then(function(){
			// 		$mdDialog.hide();
			// 		$state.go('project_detail', null, {reload: true})
			// 	})
		}
		console.log($scope.selected)
	}

	
}])

.controller('DevelopersCtrl', ['Token', '$http', '$scope', '$location', function(Token, $http, $scope, $location) {
	

	$scope.goToRegistration = function(){
		$location.path('developers/register')
	}
	
}]);