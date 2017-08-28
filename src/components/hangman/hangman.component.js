import template from './hangman.pug';
import controller from './hangman.controller';

let hangmanComponent = {
	restrict: 'E',
	scope: {},
	templateUrl: template,
	controller,
	controllerAs: 'vm',
	bindToController: true
};

export default hangmanComponent;