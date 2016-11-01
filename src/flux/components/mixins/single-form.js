
let SingleForm = {

	// Text Events

	onTextChanged(key){

		return (e)=>{
		
			let current = this.state.current;
			current[key] = e.currentTarget.value;

			this.setState({current : current});
		};
	},
	onNumberChanged(key){

		return (e)=>{
		
			let current = this.state.current;
			let value = e.currentTarget.value;

			let matches = (/[0-9]*/ig).exec(value);
			value = matches[0];

			current[key] = value;

			this.setState({current : current});
		};
	},

	// Select Events


	onSelectChanged(key, list){

		return (e, index)=>{

			let current = this.state.current;
			let item = this.state[list][index];
			
			current[key] = item[key];

			this.setState({
				current : current
			});
		};
	},

	// Checkbox Events 

	onCheck(key){

		return (item)=>{

			let current = this.state.current;

			let list = current[key];
			list.push(item);

			current[key] = list;
			this.setState({ current: current });
		};
	},
	onUncheck(key){

		return (item)=>{

			let current = this.state.current;
			let list = current[key];

			list = _.remove(list, (l)=>{
				return (l.id != item.id);
			});

			current[key] = list;
			this.setState({ current: current });
		};
	},

	// Timepicker Events

	onTimeChanged(key){

		return (e, date)=>{
		
			let current = this.state.current;
			current[key] = date.toISOString();

			this.setState({current : current});
		};
	},

	onDateChanged(key){

		return (e, date)=>{
		
			let current = this.state.current;
			current[key] = date.toISOString();

			this.setState({current : current});
		};
	}

};

export default SingleForm;
