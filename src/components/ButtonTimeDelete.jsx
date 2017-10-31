import React from 'react';
import "components/ButtonTimeDelete.css"

export default class ButtonTimeDelete extends React.Component{
	constructor(props){
		super(props);
		this.delete = this.delete.bind(this);
		this.state = {
			isDeleted: false
		}
	}

	delete(){
		this.setState(
			{isDeleted: true}
		);
	}
	render(){
		return(
			<div>
			<p>
				{this.props.item}
				<button className="ItemDelete" onClick={this.delete}>
					X
				</button>
			</p>

			</div>
		)
	}
}