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

.controller('ClientDialogCtrl', ['$http', '$scope', '$state', '$mdDialog', function($http, $scope, $state, $mdDialog){
	$scope.hide = function() {
  		$mdDialog.hide();
    };

    $scope.cancel = function() {
    	$mdDialog.cancel();
    };

    $scope.answer = function(answer) {
    	$mdDialog.hide(answer);
    };
    

    $scope.putClient = function(){
		var data = {
			'name': $scope.name,
			'phone_number': $scope.phone,
			'email': $scope.email,
			'address': $scope.address
		}
		$http.post('http://localhost:8000/clients/', data)
			.then($state.go('clients'))
	}
}])

.controller('ClientsCtrl', ['$http', '$scope', '$state', '$mdDialog', function($http, $scope, $state, $mdDialog){

	$http.get('http://localhost:8000/clients')
		.then(function(result){
			console.log(result.data)
			$scope.clients = result.data
		})
	
	$scope.showCreateClientDialog = function(ev) {
		$mdDialog.show({
			controller: 'ClientDialogCtrl',
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

	// $scope.clients = Clients.getData()
	$scope.goToClients = function(){
		$location.path('clients')
	}

	//create a new billable
	
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