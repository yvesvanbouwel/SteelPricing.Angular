"use strict";

(function(){
	var tree = angular.module('common.countrytree', [])
	
	tree.directive('countryTree', function(){
		var treeController = ['$scope', '_', function($scope, _){
			$scope.openNodes = [];
			$scope.selectedContinents = [];
			$scope.selectedCountries = [];
			
			$scope.determineContinentLabel = function(continent){
				var label = continent.Name;
				
				var countries = $scope.selectedCountries
				
				var nbrOfCountriesSelected = _.filter(countries, function(selected){ 
					return _.some(continent.Countries, function(country){ 
						return country.Id == selected.Id; })});
				
				label = label + "(" + nbrOfCountriesSelected.length + ")";	
				
				return label;
			};
			
			$scope.determineNodeState = function(continent){
				var openNodes = $scope.openNodes;
				
				if(openNodes.indexOf(continent) > -1){
					return 'tree-open';	
				}
				
				return 'tree-closed';
			};
			
			$scope.toggleNode = function(continent){
				var openNodes = $scope.openNodes; 
				
				var isOpen = _.some(openNodes, function(node){ return node.Id === continent.Id; });
				if(isOpen){
					openNodes.splice(openNodes.indexOf(continent), 1);
				
					return;
				}
				
				openNodes.push(continent);
			};
			
			$scope.onSelectedContinentChanged = function(continent){
				var continents = $scope.selectedContinents;
				var countries = $scope.selectedCountries;
				
				var isSelected = _.some(continents, function(selected){ return selected.Id === continent.Id; });
				if(isSelected){
					continents.splice(continents.indexOf(continent), 1);
					
					continent.Countries.forEach(function(country) {
						countries.splice(countries.indexOf(country), 1);
					}, this);
					
					$scope.$emit("selectedCountriesChanged", { countries: countries });
				}else{
					continents.push(continent);	
					
					continent.Countries.forEach(function(country) {
						if(countries.indexOf(country) === -1)
						{
							countries.push(country);
						}	
					}, this);
					
					$scope.$emit("selectedCountriesChanged", { countries: countries });
				}
			};
			
			$scope.onSelectedCountryChanged = function(continent, country){
				var continents = $scope.selectedContinents;
				var countries = $scope.selectedCountries;
				
				var isCountrySelected = _.some(countries, function(selected){ return selected.Id === country.Id; });
				if(isCountrySelected){
					countries.splice(countries.indexOf(country), 1);
					continents.splice(continents.indexOf(continent), 1);
				}else{
					countries.push(country);
					
					var allSelected = _.every(continent.Countries, function(country){ return countries.indexOf(country) > -1; });
					if(allSelected){
						continents.push(continent);
					}
				}
				
				$scope.$emit("selectedCountriesChanged", { countries: countries });
			};
		}];
		
		return {
			restrict: 'E',
			replace: true,
			templateUrl: 'app/common/countryTree/tree.tpl.html',
			controller: treeController,
			scope: { Continents: '=continents' }
		}
	});
})();