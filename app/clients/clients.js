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
				.then(function(){
					$state.go('clients', null, {reload:true})
					$mdDialog.cancel();
				})
	}
}])

.controller('ClientsCtrl', ['Token','$http', '$scope', '$state', '$mdDialog', function(Token, $http, $scope, $state, $mdDialog){

	// $http.defaults.headers.common.Authorization = Token.getData()

	$http.get('http://localhost:8000/clients')
		.then(function(result){
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

	$scope.goToClients = function(){
		$location.path('clients')
	}

	$scope.editClient = function(billable_id){

	}

	$scope.deleteClient = function(ev, client){
		var confirm = $mdDialog.confirm()
			// .title('Are you sure you would you like to delete user '+client.name)
			.textContent('Remove client '+client.name+'?')
			.ariaLabel('Lucky day')
			.targetEvent(ev)
			.ok('Delete')
			.cancel('Cancel')

		$mdDialog.show(confirm)
			.then(function(){
				$http.delete('http://localhost:8000/clients/'+ client.id)
					.then(function(){
						$scope.deletion_message = 'Successfully deleted user '+client.name
						$state.go('clients', null, {reload: true})
					})
				}, function(){
					$scope.action_message = 'Cancelled deletion'
				})
	}
}])