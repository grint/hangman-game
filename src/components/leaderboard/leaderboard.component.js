import template from './leaderboard.html';
import controller from './leaderboard.controller';

let leaderboardComponent = {
	restrict: 'E',
	scope: {},
	template,
	controller,
	controllerAs: 'vm',
	bindToController: true
};

export default leaderboardComponent;