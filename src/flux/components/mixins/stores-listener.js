
let StoresListener = {

	removeListeners(){
		this.stores.forEach((store)=>{
			store.removeChangeListener(this._onChange);
		});
	},

	componentDidMount(){

		this.removeListeners();

		this.stores.forEach((store)=>{
			store.addChangeListener(this._onChange);
		});
	},

	componentWillUnmount(){
		this.removeListeners();
	}

}

export default StoresListener;
