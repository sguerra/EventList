import React from 'react';
import {
	Toolbar,
	ToolbarGroup,
	ToolbarTitle,
	RaisedButton
} from 'material-ui';


const styles = {
	HEADER_TOOLBAR: { marginLeft:'-8px' },
	HEADER_TOOLBAR_TITLE: { paddingLeft:'20px' }
};

let GenericHeader = React.createClass({

	propTypes:{
		title: React.PropTypes.string.isRequired,
		cancelLabel: React.PropTypes.string,
		acceptLabel: React.PropTypes.string,
		onCancelButtonClick: React.PropTypes.func,
		onAcceptButtonClick: React.PropTypes.func
	},

	getDefaultProps(){

		return {
			title: '',
			cancelLabel: 'Cancel',
			acceptLabel: 'Save'
		};
	},

	render(){

		let cancelButton, acceptButton;

		cancelButton = !this.props.onCancelButtonClick ? null : (
			<RaisedButton label={this.props.cancelLabel} onMouseDown={this.props.onCancelButtonClick}/>
		);

		acceptButton = !this.props.onAcceptButtonClick ? null : (
			<RaisedButton secondary={true} label={this.props.acceptLabel} onMouseDown={this.props.onAcceptButtonClick}/>
		);

		return (
			<Toolbar style={styles.HEADER_TOOLBAR}>

				<ToolbarGroup firstChild={true}>
					<ToolbarTitle text={this.props.title} style={styles.HEADER_TOOLBAR_TITLE}/>
				</ToolbarGroup>

				<ToolbarGroup>
					{cancelButton}
					{acceptButton}
				</ToolbarGroup>

			</Toolbar>
		);
	}
});

export default GenericHeader;