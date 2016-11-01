import React from 'react';

let Navigation = {

	contextTypes: {
		router: React.PropTypes.object
	},

	goBack(){
		this.context.router.goBack();
	},

	transitionTo(location, params = {}){
		this.context.router.push(location, params);
	},

	replaceWith(location, params = {}){
		this.context.router.replace(location, params);
	}
};

export default Navigation;
