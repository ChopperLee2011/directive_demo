angular.module('myApp', [])
    .factory('weatherService', ['$http', '$q', function($http, $q) {
        var METRIC = 'metric';
        var IMPERIAL = 'imperial';
        var urlAPI = 'http://api.openweathermap.org/data/2.5/weather?q=';
        return {
            // if param unit sent is not celsius or fahrenheit, returns undefined
            // openweathermap API default unit: metric 
            getUnit: function(unit) {
                if (typeof unit === 'undefined') {
                    return METRIC;
                }

                var units = {
                    'cd': "Chengdu,cn"
                };
                return units[unit];
            },

            getData: function(unit) {
                var iso = this.getUnit(unit);

                var defer = $q.defer();
                $http.get(urlAPI + iso)
                    .success(function(data) {
                        defer.resolve(data);
                    })
                    .error(function() {
                        defer.reject('An error has occurred retrieving weather data');
                    });
                return defer.promise;
            }
        }
    }])
    .directive('ngRedirect', function() {
        // Runs during compile
        return {
            // name: '',
            // priority: 1,
            // terminal: true,
            scope: {
                info: '@'
            }, // {} = isolate, true = child, false/undefined = no change
            // controller: function($scope, $element, $attrs, $transclude) {},
            // require: 'ngModel', // Array = multiple requires, ? = optional, ^ = check parent elements
            restrict: 'E', // E = Element, A = Attribute, C = Class, M = Comment
            template: '<a href="https://chrome.google.com/webstore/category/apps?utm_campaign=en&utm_source=en-et-na-us-oc-webstrapp&utm_medium=et" > {{info}} </a>'
                // templateUrl: '',
                // replace: true,
                // transclude: true,
                // compile: function(tElement, tAttrs, function transclude(function(scope, cloneLinkingFn){ return function linking(scope, elm, attrs){}})),
                // link: function($scope, iElm, iAttrs, controller) {

            // }
        };
    })
    .directive('ngWeather', ['weatherService', function(weatherService) {
        // Runs during compile
        return {
            // name: '',
            // priority: 1,
            // terminal: true,
            // scope: {
            //     city: '@'
            // }, // {} = isolate, true = child, false/undefined = no change
            // controller: function($scope, $element, $attrs, $transclude) {},
            // require: 'ngModel', // Array = multiple requires, ? = optional, ^ = check parent elements
            restrict: 'E', // E = Element, A = Attribute, C = Class, M = Comment
            //template: '<span>weather:{{widget.weather[0].main}}',
            templateUrl: './partials/weather.html',
            replace: true,
            // transclude: true,
            // compile: function(tElement, tAttrs, function transclude(function(scope, cloneLinkingFn){ return function linking(scope, elm, attrs){}})),
            link: function($scope, iElm, iAttrs) {

                $scope.getIcon = function(id) {
                    return 'http://openweathermap.org/img/w/' + id + '.png';
                };
                $scope.transTemp = function(kv) {
                    return (Number(kv) || 273.15) - 273.15 + "\u2103";
                };
                $scope.update = function() {
                    weatherService.getData('cd')
                        .then(function(data) {
                                $scope.widget = data;
                            },
                            function(error) {
                                $scope.alert = {
                                    show: true,
                                    message: error,
                                    alertClass: 'danger'
                                };
                            }
                        );
                };
                $scope.update();

            }
        };
    }])
.directive('ngTime', function(){
	// Runs during compile
	return {
		// name: '',
		// priority: 1,
		// terminal: true,
		// scope: {}, // {} = isolate, true = child, false/undefined = no change
		// controller: function($scope, $element, $attrs, $transclude) {},
		// require: 'ngModel', // Array = multiple requires, ? = optional, ^ = check parent elements
		restrict: 'E', // E = Element, A = Attribute, C = Class, M = Comment
		template: '<span>{{time | date : "short" : "UTC"}}</span>',
		// templateUrl: '',
		// replace: true,
		// transclude: true,
		// compile: function(tElement, tAttrs, function transclude(function(scope, cloneLinkingFn){ return function linking(scope, elm, attrs){}})),
		link: function($scope, iElm, iAttrs) {
			$scope.time = new Date(); 
		}
	};
})
.directive('ngMotto', ['', function(){
	// Runs during compile
	return {
		// name: '',
		// priority: 1,
		// terminal: true,
		// scope: {}, // {} = isolate, true = child, false/undefined = no change
		// controller: function($scope, $element, $attrs, $transclude) {},
		// require: 'ngModel', // Array = multiple requires, ? = optional, ^ = check parent elements
		// restrict: 'A', // E = Element, A = Attribute, C = Class, M = Comment
		// template: '',
		// templateUrl: '',
		// replace: true,
		// transclude: true,
		// compile: function(tElement, tAttrs, function transclude(function(scope, cloneLinkingFn){ return function linking(scope, elm, attrs){}})),
		link: function($scope, iElm, iAttrs, controller) {
			
		}
	};
}]);
