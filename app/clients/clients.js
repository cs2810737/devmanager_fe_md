'use strict';

angular.module('myApp.clients', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider
	.when('/clients', {
		templateUrl: 'clients/clients.html',
		controller: 'ClientsCtrl'
	}).when('/clients/:id', {
		templateUrl: 'clients/client_detail.html',
		controller: 'ClientsCtrl'
	});
}])


.controller('ClientsCtrl', ['Billables', 'Credentials', '$http', '$scope', '$location', function(Billables, Credentials, $http, $scope, $location){
	$('#show_client_form').on('click', function(){
 		$scope.showClientForm()
	})

	$scope.showClientForm = function(){
		$('#divOnTop').fadeIn(500)		
	}
 
	$(function(){
		$('#includedContent').load('/clients/create-client.html')
	})
	
	$(document).ready(function(){
		$('#clientsTable').DataTable();
	});

	$scope.tester = function(){
        console.log('tester works');
    }

	// $scope.clients = Clients.getData()
	$scope.goToClients = function(){
		$location.path('clients')
	}

	$scope.showCreateClientDialog = function(ev) {
		// Appending dialog to document.body to cover sidenav in docs app
		var confirm = $mdDialog.prompt()
			.title('What would you name your dog?')
			.textContent('Bowser is a common name.')
			.placeholder('Dog name')
			.ariaLabel('Dog name')
			.initialValue('Buddy')
			.targetEvent(ev)
			.ok('Okay!')
			.cancel('I\'m a cat person');

		$mdDialog.show(confirm).then(function(result) {
			$scope.status = 'You decided to name your dog ' + result + '.';
		}, function() {
			$scope.status = 'You didn\'t name your dog.';
		});
	};
	//create a new billable
	$scope.putClient = function(form){
		// var data = {
		// 	'name': document.getElementsByName('putForm')[0].name.value,
		// 	'project': document.getElementsByName('putForm')[0].project.value,
		// 	'cost': document.getElementsByName('putForm')[0].cost.value,
		// 	'developer': $scope.billables[0].developer
		// }
		var data = {
			'name': 'name',
		}
		// console.log(data)
		$http.get('http://localhost:8000/clients')
			.then(function(response){
				// var data_id = response.data.length + 1
				$.ajax({
					url: 'http://localhost:8000/clients/',
					type: 'POST',
					data: data,
					success: function(data){
						// $location.path('billables/'+credentials.username)
						$location.path('/clients')
					}
				})
		})
	}
		//edit an existing billable
	$scope.editClient = function(billable_id){

	}

	$scope.deleteClient = function(billable){
		$.ajax({
			url: 'http://localhost:8000/billables/'+billable.id,
			type: 'DELETE',
			success: function(data){
				console.log('success')
			},
			error: function(error){
				console.log('error')
			}
		})
	}
}])