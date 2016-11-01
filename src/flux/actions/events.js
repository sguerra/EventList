import AppDispatcher from '../dispatcher/app-dispatcher';
import { 
	EVENTS_GET,
	EVENT_SET
} from '../constants';
import uuid from 'uuid';


export default {

	getEvents(){

		AppDispatcher.handleAction({
			actionType : EVENTS_GET
		});
	},

	setEvent(event){

		event.id = uuid.v4();

		AppDispatcher.handleAction({
			actionType : EVENT_SET,
			data: event
		});
	}
	
};
