import template from './hangman.html';
import controller from './hangman.controller';

let hangmanComponent = {
	restrict: 'E',
	scope: {},
	template,
	controller,
	controllerAs: 'vm',
	bindToController: true
};

export default hangmanComponent;