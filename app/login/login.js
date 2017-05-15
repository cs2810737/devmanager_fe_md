'use strict';

angular.module('myApp.login', ['ngRoute', 'ui.router'])

// .config(['$stateProvider', function($stateProvider) {
// 	$stateProvider
// 		.state('login',{
// 			templateUrl: 'login/login.html',
// 			controller: 'LoginCtrl'
// 		})
// }])

.controller('LoginCtrl', ['Billables','Credentials', '$http', '$scope', '$state', function(Billables, Credentials, $http, $scope, $state) {
	

	// $scope.tester = function(){
	// 	console.log('tester')
	// }
	$scope.login = function(){
		var credentials = {
			username: $scope.vm.username,
			password: $scope.vm.password
		}

		$http.post("http://localhost:8000/api-token-auth/", credentials)
			.then(function(auth){
				$http.defaults.headers.common.Authorization = "Bearer " + auth.token;
			}).then(function(){
				$http.get("http://localhost:8000/developers/"+credentials.username)
					.then(function(data){
						// Billables.setData(data.billables)
					})
				$http.get("http://localhost:8000/projects/"+credentials.username)
					.then(function(data){
						Projects.setData(data.billables)
					})
				$http.get("http://localhost:8000/billables/")
					.then(function(data){
						Billables.setData(data.billables)
					})
			}).then($state.go('home'))
	}
}]);