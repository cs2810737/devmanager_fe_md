angular.module('myApp', [])
	.directive('leftSideNav', function(){
		console.log('directive loads')
		return {
			templateUrl: 'left-side-nav.html'
		}
	})