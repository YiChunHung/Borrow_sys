import React from 'react';
import "components/ButtonTimeAvailable.css"

export default class ButtonTimeAvailable extends React.Component{
	constructor(props){
		super(props);

		this.toggle = this.toggle.bind(this);
		this.state = {
			isSelected: false
		};

	}

	toggle(){
		this.setState(
			{isSelected: !this.state.isSelected}
		);
	}

	render(){
		return(
			
				<button style={{backgroundColor: this.state.isSelected? "yellow":"orange"}} className="button_1" onClick={this.toggle}>
					{this.state.isSelected ? "Ｖ":"　"}
				</button>
			
		)
	}
}
