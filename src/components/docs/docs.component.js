import template from './docs.pug';
import controller from './docs.controller';

let docsComponent = {
	restrict: 'E',
	scope: {},
	templateUrl: template,
	controller,
	controllerAs: 'docs',
	bindToController: true
};

export default docsComponent;