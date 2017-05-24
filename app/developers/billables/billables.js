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
		.state('create_billable', {
            url: 'billables/create/',
			templateUrl: 'developers/billables/create-billable.html',
            controller: 'BillableDialogCtrl'
  		})
	}])

.controller('BillableDialogCtrl', ['BillFormData', 'User', '$http', '$scope', '$state', '$mdDialog', function(BillFormData, User, $http, $scope, $state, $mdDialog){
    var formData = BillFormData.getData()
    $scope.user = User.getData()
    $scope.developer_id = $scope.user.id
    $scope.developer_name = $scope.user.username
    $scope.project_name = formData.project.name
    $scope.project_id = formData.project.id
    $scope.hide = function() {
        $mdDialog.hide();
    };

    $scope.cancel = function() {
        $mdDialog.cancel();
    };

    $scope.answer = function(answer) {
        $mdDialog.hide(answer);
    };

    $scope.putBillable = function(){
        var data = {
            'name': $scope.name,
            'cost': $scope.cost,
            'recurring': $scope.recurring,
            'reg_date': $scope.reg_date,
            'project': $scope.project_id,
            'developer': $scope.developer_id,
            'description': $scope.description
        }
        console.log(data)
        $http.post('http://localhost:8000/billables/', data)
            .then(function(){
                $state.go('projects', null, {reload:true})
                $mdDialog.cancel();
            })
    }
}])

.controller('BillablesCtrl', ['Token', '$http', '$scope', '$location', '$state', '$mdDialog', function(Token, $http, $scope, $location, $state, $mdDialog){

    
    // $http.get("http://localhost:8000/billables/")
    //     .then(function(data){
    //         Billables.setData(data.billables)
    //     })
    
    

	//create a new billable
	$scope.putBillable = function(form){

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