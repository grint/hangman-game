import template from './leaderboard.pug';
import controller from './leaderboard.controller';

let leaderboardComponent = {
	restrict: 'E',
	scope: {},
	templateUrl: template,
	controller,
	controllerAs: 'vm',
	bindToController: true
};

export default leaderboardComponent;