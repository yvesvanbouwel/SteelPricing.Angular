(function(){;
	var steelPricingApp = angular.module( 'steelpricing', ['ngRoute', 'steelpricing.pricing'])
		
	steelPricingApp
		// allow DI for use in controllers, unit tests
		.constant('_', window._)
		// use in views, ng-repeat="x in _.range(3)"
		.run(function ($rootScope) {
			$rootScope._ = window._;
		})
		.config(['$routeProvider', function($routeProvider){
			$routeProvider.when('/', {
				templateUrl: 'app/pricing/index.tpl.html',
				controller: 'indexController'
			}).otherwise({
				redirectTo: '/'
			})
	}]);
	
	
	steelPricingApp.controller('AppController', function($scope){
		
	});
})()