import React from 'react';
import GenericTable from '../commons/generic-table.jsx';
import GenericHeader from '../commons/generic-header.jsx';
import Navigation from '../mixins/navigation';
import StoresListener from '../mixins/stores-listener';
import EventsStore from '../../stores/events';
import EventsActions from '../../actions/events';

const styles = {
	CELL_FONT_ICON: {
		color: 'gray'
	}
};

let table_definition = [
	{ key : 'code', title : 'DATE', value(item){

			let stringDate = (new Date(item.date)).toLocaleDateString();

			return (
				<div>
					{stringDate}					
				</div>
			);
		}
	},
	{ key : 'description', title : 'DESCRIPTION'}
];


function getEventsState(){
	
	let events = EventsStore.getEvents();

	return {
		events: events
	};
};

let EventList = React.createClass({

	mixins: [ Navigation, StoresListener ],

	stores: [ EventsStore ],

	getInitialState(){

		return getEventsState();
	},

	onNewButtonClicked(){

		// Go to Edit Page	
		this.transitionTo('events/new');
	},

	componentDidMount(){

	},

	_onChange(){

		this.setState(getEventsState());
	},

	render(){

		let events = this.state.events;

		return (
			<div>
				<GenericHeader
					title="Events"
				/>

				<GenericTable
					definition={table_definition}
					items={events}
					onNewCellClick={this.onNewButtonClicked}
				/>

			</div>
		);
	}

});


export default EventList;
