import React from 'react';
import { IconButton, AppBar} from 'material-ui';
import { MuiThemeProvider, getMuiTheme } from 'material-ui/styles';
import { APP_NAME } from '../../config';
import defaultTheme from '../themes/default';
import Navigation from '../components/mixins/navigation';

let EventsPage = React.createClass({

	mixins: [Navigation],

	render(){

		return (
			<MuiThemeProvider muiTheme={getMuiTheme(defaultTheme)}>
				<div>
					<AppBar
						iconElementLeft={
							<IconButton iconClassName="mdi mdi-format-list-bulleted"/>
						}
						title={APP_NAME}
					/>
					<div className="row no-margin">
						<div className="col-xs no-padding">
							{this.props.children}
						</div>
					</div>
				</div>
			</MuiThemeProvider>
		);
	}
});

export default EventsPage;
