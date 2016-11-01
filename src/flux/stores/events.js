import { 
	EVENTS_GET,
	EVENT_SET
} from '../constants';
import BaseStore from './base-store';

const STORAGE_KEY = 'EVENT_LIST';


class EventsStore extends BaseStore{

	constructor(){
		super();

		this.current = null;
		this.empty = { 
			description : '',
			date: null
		};
		

		if(!localStorage[STORAGE_KEY]){
			localStorage[STORAGE_KEY] = JSON.stringify([]);
		}

		this.events = JSON.parse(localStorage[STORAGE_KEY]);

		this.actions = {

			EVENT_SET : (action)=>{

				let newEvent = action.data;
				this.events.push(newEvent);

				localStorage[STORAGE_KEY] = JSON.stringify(this.events);
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
