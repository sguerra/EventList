import React from 'react';
import _ from 'lodash';
import { RaisedButton, FlatButton, ToolbarGroup, TextField } from 'material-ui';
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
		events: events,
		searchText: '',
		sortByDate: false,
		sortByDescription: false
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

	_onChange(){

		this.setState(getEventsState());
	},

	onTextChanged(e){

		this.setState({
			searchText: e.currentTarget.value
		});
	},
	toggleSortDate(){

		this.setState({ 
			sortByDate: !this.state.sortByDate,
			sortByDescription: false
		});
	},
	toggleSortDescription(){

		this.setState({ 
			sortByDescription: !this.state.sortByDescription,
			sortByDate: false
		});
	},


	render(){

		
		let {
			events,
			searchText,
			sortByDate,
			sortByDescription
		} = this.state;

		// Search text

		if(searchText.length>0){

			events = events.filter((e)=>{

				if(!e.description ||  !e.date){
					return false;
				}

				let date = (new Date(e.date)).toLocaleDateString();

				return e.description.indexOf(searchText)>=0 ||  date.indexOf(searchText)>=0;
			});
		}

		// Sort

		if(sortByDate){
			events = _.sortBy(events, ['date']);
		}else if(sortByDescription){
			events = _.sortBy(events, ['description']);
		}
		
		return (
			<div>
				<GenericHeader
					title="Events"
					toolbarGroup={(
						<ToolbarGroup>
							<TextField  ref="searchText" id="searchText" hintText="SEARCH EVENT..." onChange={this.onTextChanged}/>
							<RaisedButton label="SORT BY DATE" secondary={sortByDate} onClick={this.toggleSortDate}/>
							<RaisedButton label="SORT BY DESCRIPTION" secondary={sortByDescription} onClick={this.toggleSortDescription}/>
						</ToolbarGroup>
					)}
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
