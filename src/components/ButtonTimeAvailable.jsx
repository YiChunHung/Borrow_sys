import React from 'react';
import axios from 'axios';
import "components/ButtonTimeAvailable.css";

export default class ButtonTimeAvailable extends React.Component{
	constructor(props){
		super(props);

		this.toggle = this.toggle.bind(this);
		this.state = {
			isSelected: false
		};

	}

	toggle(){
		//console.log(this.props.onChange);
		this.setState(
			{isSelected: !this.state.isSelected}
		);
		this.props.onChange(this.props.time);

		/*var API = axios({
			//method:'get',
			url:'http://140.114.84.187:5000/api/items/read',
			headers: {"Access-Control-Allow-Origin": "*"}
		});*/
		var API = axios.get(
			'http://140.114.84.187:5000/api/items/read',{
				headers:{"Access-Control-Allow-Origin": "*"}
			}
		) 

		console.log(API);
	}

	render(){
		return(
			
				<button style={{backgroundColor: this.state.isSelected? "yellow":"orange"}} className="button_1" onClick={this.toggle}>
					{this.state.isSelected ? "Ｖ":"　"}
				</button>
			
		)
	}
}
