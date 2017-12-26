import React from 'react';
import "components/ButtonTimeDelete.css"

export default class ButtonTimeDelete extends React.Component{
	constructor(props){
		super(props);
		this.delete = this.delete.bind(this);
		this.state = {
			isSelected: false
		}
	}

	delete(){
		this.setState(
			{isSelected: !this.state.isSelected}
		);
		this.props.onChange(this.props.sid);
	}
	render(){
		return(
			<div>
			<p>
				{this.props.item}
				<button style={{backgroundColor: this.state.isSelected? "red":"tomato" ,color: this.state.isSelected? "white":"black"}} 
					className="buttonDelete" onClick={this.delete}>
					X
				</button>
			</p>
			</div>
		)
	}
}