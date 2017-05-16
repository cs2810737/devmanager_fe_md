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



.controller('ProjectsCtrl', ['$http', '$scope', '$location', '$state', function($http, $scope, $location, $state) {
	// $(document).ready(function(){
	// 	$('#projectsTable').DataTable();
	// });
	$scope.putProject = function(){
		console.log('works')	
	}
	
	$scope.showProjectForm = function(){
		$state.go('create_project')
	}

	$scope.cancelProjectRegistration = function(){
		$state.go('projects')
	}
	$scope.viewProject = function(project){
		$state.go('project_detail', {project: project})
	}
	$http.get('http://localhost:8000/projects/')
		.then(function(response){
			$scope.projects = response.data
		})
}])





.controller('ProjectCtrl', ['$http', '$scope', '$location', '$stateParams',function($http, $scope, $location, $stateParams) {
	$scope.developers = $stateParams.project.developers
	$scope.billables = $stateParams.project.billables
	var grand_total_programmer_cost = 0, total_billable_cost = 0
	for (var i = 0; i < $scope.developers.length; i++) {
		$scope.developers[i].cost = $scope.developers[i].hourly_rate *  $scope.developers[i].hours_worked
		grand_total_programmer_cost = grand_total_programmer_cost + $scope.developers[i].cost
	}
	for (var i = 0; i < $scope.billables.length; i++) {
		total_billable_cost = total_billable_cost + $scope.billables[i].cost
	}
	$scope.grand_total_programmer_cost = grand_total_programmer_cost
	$scope.total_billable_cost = total_billable_cost
	// $http.get('http://localhost:8000/projects/'+id)
	// 	.then(function(response){
	// 		$scope.developers = response.data.developers
	// 		$scope.billables = response.data.billables
	// 		for (var i = 0; i < $scope.developers.length; i++) {
	// 			$scope.developers[i].cost = $scope.developers[i].hourly_rate *  $scope.developers[i].hours_worked
	// 			grand_total_programmer_cost = grand_total_programmer_cost + $scope.developers[i].cost
	// 		}
	// 		for (var i = 0; i < $scope.billables.length; i++) {
	// 			total_billable_cost = total_billable_cost + $scope.billables[i].cost
	// 		}
	// 		$scope.grand_total_programmer_cost = grand_total_programmer_cost
	// 		$scope.total_billable_cost = total_billable_cost
	// 	})
	
}])