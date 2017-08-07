import angular from 'angular';
import uiRouter from 'angular-ui-router';
import hangmanComponent from './hangman.component';
import LocalStotage from 'angular-local-storage';

import './hangman.scss';

let hangmanModule = angular.module('hangman', [
		uiRouter,
		LocalStotage
	])

	.config(($stateProvider, $urlRouterProvider, $locationProvider) => {
		$urlRouterProvider.otherwise('/');

		$stateProvider
			.state('hangman', {
				url: '/',
				template: '<hangman></hangman>'
			});
		$locationProvider.html5Mode(true);
	})

	.component('hangman', hangmanComponent)

	// Reload HTML element 
	.directive('refresher', function() {
		return {
			transclude: true,
			controller: function($scope, $transclude, $attrs, $element) {
				var childScope;

				$scope.$watch($attrs.condition, function(value) {
					$element.empty();
					if (childScope) {
						childScope.$destroy();
						childScope = null;
					}

					$transclude(function(clone, newScope) {
						childScope = newScope;
						$element.append(clone);
					});
				});
			}
		};
	});

export default hangmanModule;