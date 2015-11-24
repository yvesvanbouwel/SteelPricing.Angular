'use strict';

(function(){
	
	var module = angular.module('steelpricing.pricing');
	
	module.directive('pricingFilter', function(){
		var filterController = ['$scope', '$timeout', '_', 'filter', function($scope, $timeout, _, FilterHelper){
			
			$scope.Countries = [];
			$scope.PricingFlows = [];
			$scope.timer = null;
			
			// Events
			$scope.$on("selectedCountriesChanged", function(event, data){ 
				$scope.Countries = data.countries;
				
				$scope.filter();	
			});
			
			// Behaviour
			$scope.toggleFlow = function(flowId){
				var flows = $scope.PricingFlows;
				
				var isSelected = flows.indexOf(flowId) > -1;
				if(isSelected){
					flows.splice(flows.indexOf(flowId), 1);
				}else{
					flows.push(flowId);	
				}
				
				$scope.filter();
			}
			
			$scope.filter = function(){
				$timeout.cancel($scope.timer);
				
				$scope.timer = $timeout(function(){
					var myFilter = new FilterHelper($scope.Query, $scope.Countries, $scope.PricingFlows);
					
					$scope.ApplyFilter(myFilter);					
				}, 1000);
			};
		}];
		
		return{
			restrict: 'E',
			replace: true,
			templateUrl: 'app/pricing/filter/filter.tpl.html',
			controller: filterController,
			scope: { Query: '=query', Results: '=results', Continents: '=continents', ApplyFilter: '=filter' }
		}
	});
	
	module.factory('filter', ['_', function(_){
		function Filter(query, countries, pricingFlows){
			this.query = query;
			this.countries = countries || [];
			this.pricingFlows = pricingFlows || [];
		} 
		
		Filter.prototype.getQuery = function(){
			return angular.extend({}, this.query);
		}
		
		Filter.prototype.filter = function(data){			
				if(!data){
					return [];
				}
				
				var query = this.query,
					countries = this.countries,
					pricingFlows = this.pricingFlows;
				
				var result =_.chain(data)
						.filter(function(item){ return query.YearFrom && query.YearTo ? (query.YearFrom <= item.Year && item.Year <= query.YearTo) : false })
						.filter(function(item){ return countries.length > 0 ? _.some(countries, function(country) { return country.Id == item.CountryId}) : true})
						.filter(function(item){ return pricingFlows.length > 0 ? _.some(pricingFlows, function(flowId) { return flowId == item.Flow}) : true})
						.filter(function(item){ return query.WeightFrom ? (query.WeightFrom <= item.Weigth): true})
						.filter(function(item){ return query.WeightTo ? (item.Weigth <= query.WeightTo): true})
					.value();
				
				return result;
			};
		
		return Filter;
	}]);
})();