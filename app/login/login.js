'use strict';

angular.module('myApp.login', ['ngRoute', 'ui.router'])

// .config(['$stateProvider', function($stateProvider) {
// 	$stateProvider
// 		.state('login',{
// 			templateUrl: 'login/login.html',
// 			controller: 'LoginCtrl'
// 		})
// }])

.controller('LoginCtrl', ['Token', 'User', '$http', '$scope', '$state', function(Token, User, $http, $scope, $state) {
	

	// $scope.tester = function(){
	// 	console.log('tester')
	// }
	$scope.login = function(){
		var credentials = {
			username: $scope.vm.username,
			password: $scope.vm.password
		}
		$http.get("http://localhost:8000/users/"+$scope.vm.username)
			.then(function(result){
				console.log(result.data)
				User.setData(result.data)
			})

		$http.post("http://localhost:8000/api-token-auth/", credentials)
			.then(function(auth){
				Token.setData("Bearer " + auth.token)
				// $http.defaults.headers.common.Authorization = "Bearer " + auth.token;
			}).then($state.go('home', {username: credentials.username}))
	}
}]);