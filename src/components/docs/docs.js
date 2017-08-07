import angular from 'angular';
import uiRouter from 'angular-ui-router';
import docsComponent from './docs.component';

const MODULE_NAME = 'docs';

let docsModule = angular.module(MODULE_NAME, [
		uiRouter
	])

	.config(($stateProvider, $urlRouterProvider, $locationProvider) => {
		$urlRouterProvider.otherwise('/');

		$stateProvider
			.state(MODULE_NAME, {
				url: '/docs',
				template: '<docs></docs>'
			});

		$locationProvider.html5Mode(true);
	})

	.directive("markdown", function($compile, $http) {
		var converter = new showdown.Converter();
		return {
			restrict: 'E',
			replace: true,
			link: function(scope, element, attrs) {
				if ("src" in attrs) {
					$http.get(attrs.src).then(function(data) {
						element.html(converter.makeHtml(data.data));
					});
				} else {
					element.html(converter.makeHtml(element.text()));
				}
			}
		};
	})

	.component(MODULE_NAME, docsComponent);

export default docsModule;