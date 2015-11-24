'use strict';

(function(){
	var pricingModule = angular.module('steelpricing.pricing', ['common.countrytree', 'common.input']);
	
	pricingModule.controller('indexController', ['$scope', '$http', function($scope, $http){
		$http.get('/data/flattenedpricing.json')
			.then(function success(response){
				var data = response.data;
				$scope.Query = angular.extend({MinYear: data.MinYear, MaxYear: data.MaxYear}, data.Query)
				$scope.Results = data.QueryResults;
				$scope.Continents = data.Continents;
				
				$scope.OriginalData = data.QueryResults;
		});
		
		$scope.filter = function(filter){
			var data = $scope.OriginalData;
			
			$scope.Results = filter.filter(data);	
		};
	}]);
})();