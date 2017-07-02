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
			url: '/project/:project_id',
			templateUrl: 'projects/project_detail.html',
			controller: 'ProjectCtrl',
			params: {
				project_id: null
			}
		})
		.state('create_project', {
			url: '/project/add',
			templateUrl: 'projects/create-project.html',
			controller: 'ProjectsCtrl',
			parent: 'projects'
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

    // $scope.project = {}

    $scope.putProject = function(){
    	var start_date = new Date($scope.project.start_date).toISOString().slice(0, 10)
		var data = {
			'name': $scope.project.name,
			'start_date': start_date,
			'client': $scope.project.client,
			'lead': $scope.project.lead,
			'description': $scope.project.description,
			// 'billables': [],
			// 'developers': []
		}

		$http.post('http://localhost:8000/projects/', data)
			.then(function(){
				$state.go('projects', null, {reload:true})
				$mdDialog.cancel();
			})
		console.log(data)
	}
		
}])

.controller('ProjectsCtrl', ['Token','$http', '$scope', '$location', '$state', '$mdDialog', '$window', '$stateParams', function(Token, $http, $scope, $location, $state, $mdDialog, $window, $stateParams) {
	
	// $http.defaults.headers.common.Authorization = Token.getData()
	$http.defaults.headers.common.Authorization = "Bearer " + $window.sessionStorage.token;
	console.log($window.sessionStorage.token)

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

	$scope.viewProject = function(project){
		$state.go('project_detail', {project_id: project.id, username: $stateParams.username})
		
		
	}

	$scope.deleteProject = function(ev, project){
		var confirm = $mdDialog.confirm()
			// .title('Are you sure you would you like to delete project '+project.name)
			.textContent('Delete project '+project.name+'?')
			.ariaLabel('Lucky day')
			.targetEvent(ev)
			.ok('Delete')
			.cancel('Cancel')

		$mdDialog.show(confirm)
			.then(function(){
				$http.delete('http://localhost:8000/projects/'+ project.id)
					.then(function(){
						$scope.deletion_message = 'Successfully deleted project \'' + project.name +'\''
						$state.go('projects', null, {reload: true})
					})
				}, function(){
					$scope.action_message = 'Cancelled deletion'
				})
	}
}])





.controller('ProjectCtrl', ['BillFormData','User', '$http', '$scope', '$location', '$stateParams', '$state', '$mdDialog', '$mdEditDialog', function(BillFormData, User, $http, $scope, $location, $stateParams, $state, $mdDialog, $mdEditDialog) {
	$http.get('http://localhost:8000/projects/'+$stateParams.project_id+'/')
		.then(function(result){

			$scope.project = result.data
			$scope.project_name = $scope.project.name
			$scope.developers = $scope.project.developers
			$scope.billables = $scope.project.billables

			// console.log(JSON.stringify($scope.developers))

			var allDevIds = []
			var unassignedDevIds = []
			var assignedDevIds = []
			var unassignedDevs = []
			
			var today = new Date()
			var oneDay = 24*60*60*1000
			var projectStartDate = new Date($scope.project.start_date)
			var projectDurationInDays = Math.round(Math.abs(today.getTime() - projectStartDate.getTime())/ oneDay)
			var daysInMonth = 365.2422/12
			var projectDurationInMonths = projectDurationInDays/daysInMonth
			// console.log($scope.developers)

			for (var i = 0; i < $scope.developers.length; i++) {
				// console.log(JSON.stringify($scope.developers[i]))
				$scope.developers[i].id = JSON.parse(JSON.stringify($scope.developers[i].user)).id
				// console.log($scope.developers[i].id)
				$scope.developers[i].username = JSON.parse(JSON.stringify($scope.developers[i].user)).username
				// console.log($scope.developers[i].username)
				// $scope.developers[i].compensation = projectDurationInMonths * $scope.developers[i].monthly_wage
				// console.log($scope.developers[i].compensation)
				delete $scope.developers[i].user
			}

			for (var i = 0; i < $scope.billables.length; i++) {
				// console.log($scope.billables)
				var billStartDate = new Date($scope.billables[i].reg_date)
				var billDurationInMonths = Math.round(Math.abs(today.getTime() - billStartDate.getTime())/oneDay)/daysInMonth
				$scope.billables[i].finalCost = ($scope.billables[i].recurring ? (billDurationInMonths * $scope.billables[i].cost) : $scope.billables[i].cost)
				var billablePayments = $scope.project.payments.filter(function(payment){
					return (payment.billable == $scope.billables[i].id)
				})
				// $scope.billables[i].payments = billablePayments
				var paymentsArray = billablePayments
				console.log(JSON.stringify(paymentsArray))
				var paymentAmountsArray = paymentsArray.map(function(payment){
					return payment.amount
				})
				console.log(paymentAmountsArray)
				$scope.billables[i].amountCleared = paymentAmountsArray.reduce(function(sum, payment){
					return sum + payment
				}, 0)
			}

			// var developers = $scope.developers

			//get yet to be assigned developers
			$http.get('http://localhost:8000/users/')
				.then(function(result){
					//get user_id's of all devs
					for (var i = 0; i < result.data.length; i++) {
						allDevIds[i] = result.data[i].id
					}
					// console.log('allDevIds')
					// console.log(allDevIds)
					//get user_id's of already assigned developers
					for (var i = 0; i < $scope.developers.length; i++) {
						assignedDevIds[i] = $scope.developers[i].id
					}
					// console.log($scope.developers)
					// console.log('assignedDevIds')
					// console.log(assignedDevIds)
					unassignedDevIds = allDevIds.filter(function(devId){
						return (!assignedDevIds.includes(devId))
					})
					// console.log('unassignedDevIds')
					// console.log(unassignedDevIds)
					for (var i = 0; i < result.data.length; i++) {
						if (unassignedDevIds.includes(result.data[i].id)) {
							unassignedDevs.push(result.data[i])
						}
					}
					
					$scope.showAddDevToProjDialog = function(ev) {
				        $mdDialog.show({
				            controller: ['$scope', 'unassignedDevs', 'project', function($scope, unassignedDevs, project){
				            	$scope.unassignedDevs = unassignedDevs
				            	$scope.project = project
				            }],
				            templateUrl: 'developers/add-developer.html',
				            parent: angular.element(document.body),
				            targetEvent: ev,
				            locals: {
				            	unassignedDevs: unassignedDevs,
				            	project: $scope.project
				            },
				            clickOutsideToClose:true
				        })
				        .then(function(answer) {
				            $scope.status = 'You said the information was "' + answer + '".';
				        }, function() {
				            $scope.status = 'You cancelled the dialog.';
				        });
				    };

				    
				})

			var devStartDate, devParticipationInDays, devParticipationInMonths, grandTotalDevCost = 0, totalBillableCost = 0
			$http.get('http://localhost:8000/devmembership/'+$stateParams.project_id+'/')
				.then(function(result){
					// $scope.developers.daysWorked =
					
					console.log(result.data)
					console.log($scope.developers)
					for (var i = 0; i < $scope.developers.length; i++) {
						devStartDate = new Date(result.data[i].start_date)
						devParticipationInDays = (Math.round(Math.abs(today.getTime() - devStartDate.getTime())/ oneDay) - 1)
						devParticipationInMonths = devParticipationInDays/daysInMonth
						$scope.developers[i].daysWorked = devParticipationInDays
						$scope.developers[i].compensation = $scope.developers[i].monthly_wage * devParticipationInMonths
						grandTotalDevCost = grandTotalDevCost + $scope.developers[i].compensation
					}
					$scope.grandTotalDevCost = grandTotalDevCost
					
				    $scope.removeDeveloper = function(ev, developer){
						var confirm = $mdDialog.confirm()
							// .title('Are you sure you would you like to delete project '+project.name)
							.textContent('Remove '+developer.username+' from project?')
							.ariaLabel('Lucky day')
							.targetEvent(ev)
							.ok('Remove')
							.cancel('Cancel')
						$mdDialog.show(confirm)
							.then(function(){
								$http.delete('http://localhost:8000/devmembershipdevid/'+ developer.id)
									.then(function(){
										$scope.deletion_message = 'Successfully removed developer \'' + developer.username +'\''
										$state.go('project_detail', null, {reload: true})
									})
								}, function(){
									$scope.action_message = 'Cancelled deletion'
								})
					}
				})

			for (var i = 0; i < $scope.billables.length; i++) {
				$scope.billables[i].reg_date = new Date($scope.billables[i].reg_date).toDateString()
			}

			var grand_total_programmer_cost = 0, total_billable_cost = 0
			for (var i = 0; i < $scope.developers.length; i++) {
				// $scope.developers[i].cost = $scope.developers[i].hourly_rate *  $scope.developers[i].hours_worked
				grand_total_programmer_cost = grand_total_programmer_cost + $scope.developers[i].compensation
			}
			for (var i = 0; i < $scope.billables.length; i++) {
				total_billable_cost = total_billable_cost + $scope.billables[i].cost
			}
			$scope.grand_total_programmer_cost = grand_total_programmer_cost
			$scope.total_billable_cost = total_billable_cost


			$scope.showCreateBillableDialog = function(ev) {
		        // Appending dialog to document.body to cover sidenav in docs app
		        $mdDialog.show({
		            // controller: ['$scope', 'project', 'developer', function($scope, project, developer){
		            controller: ['$scope', 'project_id', function($scope, project_id){
		            	$scope.project_id = project_id
		            	$scope.username = $stateParams.username
		            	// $scope.developer = developer
		            }],
		            templateUrl: 'developers/billables/create-billable.html',
		            parent: angular.element(document.body),
		            targetEvent: ev,
		            locals: {
		            	project_id: $stateParams.project_id,
		            	// developer:
		            },
		            clickOutsideToClose:true
		        })
		        .then(function(answer) {
		            $scope.status = 'You said the information was "' + answer + '".';
		        }, function() {
		            $scope.status = 'You cancelled the dialog.';
		        });
		    };
		    $scope.offsetBillable = function(ev, billable){
		    	console.log('reaches here')
		        $mdDialog.show({
		            controller: ['$scope', 'billable', 'project_id', function($scope, billable, project_id){
		                $scope.billable = billable
		                $scope.project_id = project_id
		            }],
		            templateUrl: 'developers/billables/offset-billable.html',
		            parent: angular.element(document.body),
		            targetEvent: ev,
		            locals: {
		                billable: billable,
		                project_id: $stateParams.project_id
		            },
		            clickOutsideToClose:true
		        })
		        .then(function(answer) {
		            $scope.status = 'You said the information was "' + answer + '".';
		        }, function() {
		            $scope.status = 'You cancelled the dialog.';
		        });
		    }

		    $scope.deleteBillable = function(ev, billable){
		        var confirm = $mdDialog.confirm()
					// .title('Are you sure you would you like to delete billable '+billable.name)
					.textContent('Delete '+billable.name+'?')
					.ariaLabel('Lucky day')
					.targetEvent(ev)
					.ok('Delete')
					.cancel('Cancel')

				$mdDialog.show(confirm)
					.then(function(){
						$http.delete('http://localhost:8000/billables/'+ billable.id)
							.then(function(){
								$scope.deletion_message = 'Successfully deleted billable '+billable.name
								$state.go('clients', null, {reload: true})
							})
						}, function(){
							$scope.action_message = 'Cancelled deletion'
						})
		    }

		})

	// $scope.addBillable = function(){
	// 	$state.go('create_billable')
	// }

	// var formData = {
 //        	project: {
 //        		name: $scope.project.name,
 //        		id: $scope.project.id
 //        	}
 //        }

    // BillFormData.setData(formData)
	

}])