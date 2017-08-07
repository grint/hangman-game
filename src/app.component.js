import template from './app.html';

let appComponent = () => {
	return {
		template,
		// E: directives based on element names
		restrict: 'E'
	};
};

export default appComponent;