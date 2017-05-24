'use strict';

angular.module('myApp.projects', ['ngRoute'])

.config(['$stateProvider', function($stateProvider) {
	$stateProvider
		.state('projects', {
			url: '/projects',
			templateUrl: 'projects/projects.html',
			controller: 'ProjectsCtrl'
		})
		.state('project_detail', {
			url: '/project/detail/',
			templateUrl: 'projects/project_detail.html',
			controller: 'ProjectCtrl',
			params: {
				project: null
			}
		})
		.state('create_project', {
			url: '/project/add',
			templateUrl: 'projects/create-project.html',
			controller: 'ProjectsCtrl',
		})
}])

.controller('ProjectDialogCtrl', ['Token', '$http', '$scope', '$state', '$mdDialog', function(Token, $http, $scope, $state, $mdDialog){

	// $http.defaults.headers.common.Authorization = Token.getData()

	$scope.hide = function() {
  		$mdDialog.hide();
    };

    $scope.cancel = function() {
    	$mdDialog.cancel();
    };

    $scope.answer = function(answer) {
    	$mdDialog.hide(answer);
    };  

    $http.get('http://localhost:8000/leads/')
    	.then(function(result){
    		$scope.leads = result.data
    	})

    $http.get('http://localhost:8000/clients/')
    	.then(function(result){
    		$scope.clients = result.data
    	})

    $scope.putProject = function(){
		var data = {
			'name': $scope.name,
			'start_date': $scope.start_date,
			'client': $scope.client,
			'lead': $scope.lead,
			'description': $scope.description
		}
		$http.post('http://localhost:8000/projects/', data)
			.then(function(){
				$state.go('projects', null, {reload:true})
				$mdDialog.cancel();
			})
	}
}])

.controller('ProjectsCtrl', ['Token','$http', '$scope', '$location', '$state', '$mdDialog', function(Token, $http, $scope, $location, $state, $mdDialog) {
	
	// $http.defaults.headers.common.Authorization = Token.getData()

	$http.get('http://localhost:8000/projects/')
		.then(function(result){
			// console.log(JSON.stringify(result.data))
			$scope.projects = result.data
		})

	$scope.showCreateProjectDialog = function(ev) {
		$mdDialog.show({
			controller: 'ProjectDialogCtrl',
			templateUrl: 'projects/create-project.html',
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

	$scope.viewProject = function(project_id){
		$http.get('http://localhost:8000/projects/'+project_id)
			.then(function(result){
				$state.go('project_detail', {project: result.data})
			})
		
	}

	$scope.deleteProject = function(ev, project){
		var confirm = $mdDialog.confirm()
			.title('Are you sure you would you like to delete project '+project.name)
			.textContent('Careful, you cannot undo this action.')
			.ariaLabel('Lucky day')
			.targetEvent(ev)
			.ok('Yes, delete project \'' + project.name + '\'')
			.cancel('No, cancel delete operation')

		$mdDialog.show(confirm)
			.then(function(){
				$http.delete('http://localhost:8000/projects/'+ project.id)
					.then(function(){
						$scope.deletion_message = 'Successfully deleted project \'' + project.name +'\''
						$state.go('clients', null, {reload: true})
					})
				}, function(){
					$scope.action_message = 'Cancelled deletion'
				})
	}
}])





.controller('ProjectCtrl', ['BillFormData','User', '$http', '$scope', '$location', '$stateParams', '$state', '$mdDialog',function(BillFormData, User, $http, $scope, $location, $stateParams, $state, $mdDialog) {
	
	$scope.developers = $stateParams.project.developers
	$scope.billables = $stateParams.project.billables
	var grand_total_programmer_cost = 0, total_billable_cost = 0
	for (var i = 0; i < $scope.developers.length; i++) {
		// $scope.developers[i].cost = $scope.developers[i].hourly_rate *  $scope.developers[i].hours_worked
		grand_total_programmer_cost = grand_total_programmer_cost + $scope.developers[i].monthly_wage
	}
	for (var i = 0; i < $scope.billables.length; i++) {
		total_billable_cost = total_billable_cost + $scope.billables[i].cost
	}
	$scope.grand_total_programmer_cost = grand_total_programmer_cost
	$scope.total_billable_cost = total_billable_cost
	
	// $scope.addBillable = function(){
	// 	$state.go('create_billable')
	// }

	var formData = {
        	project: {
        		name: $stateParams.project.name,
        		id: $stateParams.project.id
        	}
        }

    BillFormData.setData(formData)
	$scope.showCreateBillableDialog = function(ev) {
        // Appending dialog to document.body to cover sidenav in docs app
        
        $mdDialog.show({
            controller: 'BillableDialogCtrl',
            templateUrl: 'developers/billables/create-billable.html',
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
	
}])