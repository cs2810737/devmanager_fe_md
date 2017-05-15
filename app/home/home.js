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

.controller('HomeCtrl', ['Billables', 'Clients', 'Credentials', 'Projects', '$http', '$scope', '$location', function(Billables, Clients, Credentials, Projects, $http, $scope, $location) {
	
	$.get("http://localhost:8000/billables", function(data){
		// console.log(JSON.stringify(data))
		Billables.setData(data)
	})

	$.get("http://localhost:8000/clients", function(data){
		// console.log(JSON.stringify(data))
		Clients.setData(data)
	})

	$.get("http://localhost:8000/projects", function(data){
		// console.log(JSON.stringify(data))
		Projects.setData(data)
	})

	$scope.login = function(){
		var credentials = {
			username: document.getElementsByName('loginForm')[0].username.value,
			password: document.getElementsByName('loginForm')[0].password.value
		}
		Credentials.setData(credentials)
		$(document).ready(function(){
			$.post("http://localhost:8000/api-token-auth/", credentials, function(auth) {
				$.ajax({
					type: "GET",
					url: "http://localhost:8000/developers/"+credentials.username,
					headers: {
						'Content-Type':'multipart/form-data'
					},
					beforeSend: function(xhr) {
					  xhr.setRequestHeader("Authorization", "Bearer " + auth.token);
					},
					success: function(data){
					  // $scope.billables = data.billables
					  // console.log(JSON.stringify(data.billables))
					  Billables.setData(data.billables)
					  // $location.path('billables/'+credentials.username)
					  $location.path('home/')
					}
				});
			});
		})
		// window.location.href='http://localhost:8000/api-auth/login/'
	}
}]);