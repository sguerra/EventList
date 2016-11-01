import { 
	EVENTS_GET,
	EVENT_SET
} from '../constants';
import BaseStore from './base-store';


class EventsStore extends BaseStore{

	constructor(){
		super();
		this.current = null;
		this.empty = { 
			description : '',
			date: null
		};
		
		this.events = [];

		this.actions = {

			EVENT_SET : (action)=>{

				let newEvent = action.data;
				this.events.push(newEvent);
			}

		};
	}

	getCurrent(){
		return this.current;
	}

	getEmpty(){
		return Object.create(this.empty);
	}

	getEvents(){

		return this.events;
	}

}

export default EventsStore.getInstance();
