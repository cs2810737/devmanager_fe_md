'use strict';

angular.module('myApp.clients', ['ngRoute'])

.config(['$stateProvider', function($stateProvider) {
	$stateProvider
		.state('clients',{
			url: '/clients',
			templateUrl: 'clients/clients.html',
			controller: 'ClientsCtrl'
		})
		.state('client_detail', {
			url: 'client/detail',
			templateUrl: 'clients/client_detail.html',
			controller: 'ClientsCtrl'
		})
}])


.controller('ClientsCtrl', ['$http', '$scope', '$location', '$mdDialog', function($http, $scope, $location, $mdDialog){
	
	$scope.showCreateClientDialog = function(ev) {
		$mdDialog.show({
			controller: DialogController,
			templateUrl: 'clients/create-client.html',
			parent: angular.element(document.body),
			targetEvent: ev,
			clickOutsideToClose:true
    	})
        .then(function(answer) {
        	$scope.status = 'You said the information was "' + answer + '".';
        }, function() {
        	$scope.status = 'You cancelled the dialog.';
        });
  	};

  	function DialogController($scope, $mdDialog) {
  		$scope.hide = function() {
  			$mdDialog.hide();
    	};

    	$scope.cancel = function() {
      		$mdDialog.cancel();
    	};

    	$scope.answer = function(answer) {
      		$mdDialog.hide(answer);
    	};
  	}

	// $scope.clients = Clients.getData()
	$scope.goToClients = function(){
		$location.path('clients')
	}

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