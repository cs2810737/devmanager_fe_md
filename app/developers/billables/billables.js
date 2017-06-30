'use strict';

angular.module('myApp.billables', ['ngRoute','ui.router', 'ngMaterial'])

.config(['$routeProvider','$stateProvider', function($routeProvider, $stateProvider) {
	$stateProvider
		.state('billables', {
            url: '/billables/',
			templateUrl: 'developers/billables/billables.html',
			controller: 'BillablesCtrl'
		})
		.state('project_detail.create_billable', {
            url: 'billables/create/',
			templateUrl: 'developers/billables/create-billable.html',
            controller: 'BillableDialogCtrl'
  		})
	}])

.controller('BillableDialogCtrl', ['BillFormData', 'User', '$http', '$scope', '$state', '$mdDialog', '$stateParams', function(BillFormData, User, $http, $scope, $state, $mdDialog, $stateParams){
    // var formData = BillFormData.getData()
    // $scope.user = User.getData()
    // $scope.developer_id = $scope.user.id
    // $scope.developer_name = $scope.user.username
    // $scope.project_name = formData.project.name
    // $scope.project_id = formData.project.id
    $scope.hide = function() {
        $mdDialog.hide();
    };

    $scope.cancel = function() {
        $mdDialog.cancel();
    };

    $scope.answer = function(answer) {
        $mdDialog.hide(answer);
    };
    // console.log(User.getData())
    // console.log($stateParams.username)
    // var username = User.getData()

    $scope.recordPayment = function(){
        var data = {
            date_made: new Date().toISOString().slice(0, 10),
            amount: $scope.amount,
            comment: $scope.comment,
            billable: $scope.billable.id,
            project: $scope.project_id
        }
        console.log(data)
        $http.post('http://localhost:8000/payments/', data)
            .then(function(){
                $scope.hide()
            })
    }
    
    $scope.putBillable = function(){
        var data = {
            'name': $scope.name,
            'cost': $scope.cost,
            'recurring': ($scope.recurring == undefined ? false : $scope.recurring),
            'reg_date': new Date().toISOString().slice(0, 10),
            'project': $scope.project_id,
            'developer': 1,
            'description': $scope.description
        }
        console.log(data)
        // $http.get('http://localhost:8000/users/'+username)
        //     .then(function(result){
        //         console.log(result.data.id)
        //         data.developer = result.data.id
        //     })
            
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

    
}])