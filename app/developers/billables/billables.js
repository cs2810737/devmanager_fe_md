'use strict';

angular.module('myApp.billables', ['ngRoute','ui.router', 'ngMaterial'])

.config(['$routeProvider','$stateProvider', function($routeProvider, $stateProvider) {
	$stateProvider
		.state('billables', {
			// templateUrl: 'billables/billables.html',
            // url: '/billables/:username',
            url: '/billables/',
			templateUrl: 'developers/billables/billables.html',
			controller: 'BillablesCtrl'
		})
		.state('billables.create', {
            url: 'billables/create/',
			templateUrl: 'developers/billables/create-billable.html',
  		})
	}])

.controller('BillablesCtrl', ['Billables', 'Credentials', '$http', '$scope', '$location', '$state', function(Billables, Credentials, $http, $scope, $location, $state){

    
    $http.get("http://localhost:8000/billables/")
        .then(function(data){
            Billables.setData(data.billables)
        })
    
    $scope.showBillableForm = function(){
        console.log('herh')
        $state.go('create')
    }

    $scope.billables = Billables.getData();

    

    $scope.showCreateBillableDialog = function(ev) {
        // Appending dialog to document.body to cover sidenav in docs app
        
    };



    

	//create a new billable
	$scope.putBillable = function(form){
        
		// var data = {
		// 	'name': document.getElementsByName('putForm')[0].name.value,
		// 	'project': document.getElementsByName('putForm')[0].project.value,
		// 	'cost': document.getElementsByName('putForm')[0].cost.value,
		// 	'developer': $scope.billables[0].developer,
  //           'recurring': document.getElementsByName('putForm')[0].recurring.value
  //   	}
        var data = {
            'name': 'billable_test',
            'project': 1,
            'cost': 10000,
            'developer': 1,
            'recurring': true,
            'description': 'bullshit'
        }
    	console.log('data')
    	$http.get('http://localhost:8000/billables')
    		.then(function(response){
    			// var data_id = response.data.length + 1
                console.log('reches here2')
                // console.log(Credentials.getData().username)
    			$.ajax({
    				url: 'http://localhost:8000/billables/',
    				type: 'POST',
    				data: data,
    				success: function(data){
    					// $location.path('billables/'+credentials.username)
    					$http.get("http://localhost:8000/developers/"+Credentials.getData().username)
    						.then(function(response){
    							$scope.billables = response.data.billables

    						})
    						.then(function(){
    							$location.path('billables/'+Credentials.getData().username)
    						})
    					}
    				})
    		})
    	}
    	//edit an existing billable
    $scope.editBillable = function(billable_id){

  	}

    $scope.deleteBillable = function(billable){
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