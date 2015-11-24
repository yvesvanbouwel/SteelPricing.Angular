(function(){
	var module = angular.module("common.input", []);
	
	module.directive('integer', ['$parse', function($parse){
		return {
			restrict: 'A',
			require: 'ngModel',
			link: function(scope, element, attrs){
				scope.$watch(attrs.ngModel, function(v){
					var setter =  $parse(attrs.ngModel).assign;
					
					setter(scope, parseInt(v));
				});
			}
		}
	}]);
})();