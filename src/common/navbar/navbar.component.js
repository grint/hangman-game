import template from './navbar.pug';
import controller from './navbar.controller';

let navbarComponent = function() {
	return {
		restrict: 'E',
		scope: {},
		templateUrl: template,
		controller,
		controllerAs: 'vm',
		bindToController: true
	};
};

export default navbarComponent;