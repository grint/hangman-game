import angular from 'angular';
import uiRouter from 'angular-ui-router';
import leaderboardComponent from './leaderboard.component';

import 'ng-table/bundles/ng-table.min.css';
import 'ng-table/bundles/ng-table.min.js';

import './leaderboard.scss';

const MODULE_NAME = 'leaderboard';

let leaderboardModule = angular.module(MODULE_NAME, [
				uiRouter,
				'ngTable'
		])
		.config(($stateProvider, $urlRouterProvider, $locationProvider) => {
				// if the path doesn't match any of the configured urls
				$urlRouterProvider.otherwise('/');

				$stateProvider
						.state(MODULE_NAME, {
								url: '/leaderboard',
								template: '<leaderboard></leaderboard>',
								params: {
										obj: null
								}
						});
				$locationProvider.html5Mode(true);
		})

		.component(MODULE_NAME, leaderboardComponent);

export default leaderboardModule;