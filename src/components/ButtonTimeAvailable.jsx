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
		//console.log(this.props.onChange);
		this.setState(
			{isSelected: !this.state.isSelected}
		);
		this.props.onChange();
	}

	render(){
		return(
			
				<button style={{backgroundColor: this.state.isSelected? "yellow":"orange"}} className="button_1" onClick={this.toggle}>
					{this.state.isSelected ? "Ｖ":"　"}
				</button>
			
		)
	}
}
