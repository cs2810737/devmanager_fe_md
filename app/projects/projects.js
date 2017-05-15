'use strict';

angular.module('myApp.projects', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider
	.when('/projects', {
		templateUrl: 'projects/projects.html',
		controller: 'ProjectsCtrl'
	}).when('/projects/:id', {
		templateUrl: 'projects/project_detail.html',
		controller: 'ProjectCtrl'
	});
}])

.controller('ProjectCtrl', ['$http', '$scope', '$location', '$routeParams',function($http, $scope, $location, $routeParams) {
	var id = $routeParams.id
	var grand_total_programmer_cost = 0, total_billable_cost = 0
	$http.get('http://localhost:8000/projects/'+id)
		.then(function(response){
			$scope.developers = response.data.developers
			$scope.billables = response.data.billables
			for (var i = 0; i < $scope.developers.length; i++) {
				$scope.developers[i].cost = $scope.developers[i].hourly_rate *  $scope.developers[i].hours_worked
				grand_total_programmer_cost = grand_total_programmer_cost + $scope.developers[i].cost
			}
			for (var i = 0; i < $scope.billables.length; i++) {
				total_billable_cost = total_billable_cost + $scope.billables[i].cost
			}
			$scope.grand_total_programmer_cost = grand_total_programmer_cost
			$scope.total_billable_cost = total_billable_cost
		})
	
}])

.controller('ProjectsCtrl', ['$http', '$scope', '$location', function($http, $scope, $location) {
	
	$scope.putProject = function(){
		console.log('works')	
	}

	$(document).ready(function(){
		$('#show_project_form').on('click', function(){
			$scope.showProjectForm()
		})
	})

	$scope.showProjectForm = function(){
		$('#divOnTop').fadeIn(500)
	}

	$(function(){
		$('#includedContent').load('projects/create-project.html')
	})

	$(document).ready(function(){
		$('#projectsTable').DataTable();
	});

	$scope.tester = function(){
		console.log('tester works');
	}
	
	$http.get('http://localhost:8000/projects')
		.then(function(response){
			$scope.projects = response.data
		})
	
	$scope.goToProjects = function(project){
		$location.path('/projects')
	}

	$scope.goToProject = function(project){
		$location.path('/projects/'+project.billables[0].project)
	}
}])
