import template from './docs.html';
import controller from './docs.controller';

let docsComponent = {
	restrict: 'E',
	scope: {},
	template,
	controller,
	controllerAs: 'docs',
	bindToController: true
};

export default docsComponent;