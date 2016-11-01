import React from 'react';
import {  
	Table, 
	TableBody, 
	TableHeader, 
	TableHeaderColumn, 
	TableRow, 
	TableRowColumn,
	IconButton,
	FloatingActionButton
} from 'material-ui'; 


const styles = {
	TABLE_DELETE_CELL: { width: '50px' },
	TABLE_DELETE_CELL_ICON:  { color: 'gray' },
	TABLE_NEW_CELL_BUTTON: {
		position: 'fixed',
		bottom: '50px',
		right: '50px'
	}
};


let GenericTable = React.createClass({

	propTypes: {
		definition: React.PropTypes.arrayOf(React.PropTypes.shape({
			key : React.PropTypes.string.isRequired,
			title : React.PropTypes.string.isRequired,
			value : React.PropTypes.func
		})).isRequired,
		items: React.PropTypes.arrayOf(React.PropTypes.object).isRequired,
		onCellClick: React.PropTypes.func,
		onDeleteCellClick: React.PropTypes.func,
		onNewCellClick: React.PropTypes.func
	},

	getDefaultProps(){

		return {
			definition: [
				{	key: 'id', title : 'ID' },
				{	key: 'name', title : 'NOMBRE' }
			],
			items: [],
			onCellClick(){
				
			}
		};
	},

	onCellClick(rowNumber){
		
		let items = this.props.items;
		let selectedItem = items[rowNumber];

		// Forward Event
		this.props.onCellClick(selectedItem);
	},

	onDeleteCellClick(item){

		return (e)=>{
			e.stopPropagation();

			// Forward Event
			this.props.onDeleteCellClick(item);
		};
	},

	onNewCellClick(item){

		// Forward Event
		this.props.onNewCellClick();
	},

	render(){

		let deleteIconButton = (item)=>{

			return !this.props.onDeleteCellClick ? null : (
				<IconButton 
					iconStyle={styles.TABLE_DELETE_CELL_ICON}
					iconClassName={`mdi mdi-close`}
					onClick={this.onDeleteCellClick(item)}
				/>
			);
		};

		return (
			<div>

				<Table selectable={false} onCellClick={this.onCellClick}>
					<TableHeader adjustForCheckbox={false} displaySelectAll={false}>
						<TableRow>
							{
								this.props.definition.map((item)=>{

									return (
										<TableHeaderColumn key={item.key}>{item.title}</TableHeaderColumn>
									);
								})
							}
							<TableHeaderColumn style={styles.TABLE_DELETE_CELL}></TableHeaderColumn>
						</TableRow>
					</TableHeader>
					<TableBody displayRowCheckbox={false} showRowHover={true}>
						{
							this.props.items.map((item)=>{

								return (
									<TableRow key={item.id}>

										{
											this.props.definition.map((definition_item)=>{

												let key = definition_item.key;
												let value = item[definition_item.key];

												let component = (
													<label>{value}</label>
												);

												if(definition_item.value){
													component = definition_item.value(item);
												}

												return (
													<TableRowColumn key={key}>
														{component}
													</TableRowColumn>
												);
											})
										}

										<TableRowColumn style={styles.TABLE_DELETE_CELL}>
											
											{deleteIconButton(item)}

										</TableRowColumn>
									</TableRow>
								);
							})
						}

					</TableBody>
				</Table>

				<FloatingActionButton 
					style={styles.TABLE_NEW_CELL_BUTTON} 
					iconClassName="mdi mdi-plus"
					onTouchTap={this.onNewCellClick}
				/>

			</div>
		);
	}

});

export default GenericTable;