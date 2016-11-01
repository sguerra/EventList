import {EventEmitter} from 'events';
import _ from 'lodash';

import AppDispatcher from '../dispatcher/app-dispatcher';

class BaseStore extends EventEmitter{

	constructor(){
		super();
		this.registeredTokens = {};
		this.error = null;
	}

	static getInstance(){

		let className = this;

		if(!this.instance){
			this.instance = new className();
			this.instance.registerAll();
		}

		return this.instance;

	}

	// Register all actions to Dispatcher
	registerAll(){

		let actions = _.keys(this.actions);

		actions.forEach((key)=>{

			let action = this.actions[key];


			// Keep the reference token assigned by React to each action handler
			this.registeredTokens[key] = AppDispatcher.register((payload)=>{

				let data = payload.action;
				let actionType = data.actionType;

				if(actionType !== key){
					return true;
				}

				// Set the error value if there was any
				this.setError(data.error || null);

				// Invoke callback and emit change in the store only when the keys match
				let triggerChange = action.call(this, data);

				// Allow the callback to return false to avoid triggering change event
				if(triggerChange !== false){
					this.emitChange();
				}

				return true;
			});

		});


	}

	// Emit Change event
	emitChange() {
		this.emit('change');
	}

	// Add change listener
	addChangeListener(callback) {
		this.on('change', callback);
	}

	// Remove change listener
	removeChangeListener(callback) {
		this.removeListener('change', callback);
	}

	// Functions for errors

	setError(err){
		this.error = err;
	}

	getError(){
		return this.error;
	}

	waitFor(actions){
		AppDispatcher.waitFor(actions);
	}

}

export default BaseStore;
