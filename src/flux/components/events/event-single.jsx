
import React from 'react';
import _ from 'lodash';
import {
	TextField,
	DatePicker
} from 'material-ui';

import * as styles from '../commons/styles';
import GenericHeader from '../commons/generic-header.jsx';
import EventsStore from '../../stores/events';
import EventsActions from '../../actions/events';
import Navigation from '../mixins/navigation';
import StoresListener from '../mixins/stores-listener';
import SingleForm from '../mixins/single-form';

function getEventsState(){

	let current = EventsStore.getCurrent() || EventsStore.getEmpty();

	return {
		current: current
	};
}

let EventSingle = React.createClass({

	mixins : [ Navigation, StoresListener, SingleForm ],

	stores: [ EventsStore ],

	getInitialState(){

		return getEventsState();
	},


	onSaveClick(){

		let current = this.state.current;
		
		if(!current.date || !current.description){

			alert("Please fill all fields");
			return;
		}

		EventsActions.setEvent(current);
		this.goBack();
	},


	_onChange(){

		this.setState(getEventsState());
	},

	componentDidMount(){

		this.refs.description.focus();
	},

	render(){

		let {
			current
		} = this.state;


		return (
			<div>
				<GenericHeader
					title="Event"
					onCancelButtonClick={this.goBack}
					onAcceptButtonClick={this.onSaveClick}
				/>

				<div style={styles.SECTION_SCROLLABLE}>

					<div className="row">

						<div className="col-md-5 col-xs-10 col-md-offset-1 col-xs-offset-1">

							<TextField
								ref="description"
								id="description"
								value={current.description}
						    	floatingLabelText="EVENT DESCRIPTION"
						    	onChange={this.onTextChanged('description')}
						    />

						</div>

						<div className="col-md-5 col-xs-10 col-md-offset-1 col-xs-offset-1">

						    <DatePicker
						    	style={{
						    		paddingTop: '23px'
						    	}}
								hintText="EVENT DATE"
								value={current.date ? new Date(current.date) : null}
								onChange={this.onDateChanged('date')}
							/>

						</div>

					</div>

				</div>
			</div>
		);
	}
});

export default EventSingle;
