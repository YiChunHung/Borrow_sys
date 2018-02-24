import React from 'react';
import "components/ButtonTimeDelete.css"

export default class ButtonTimeDelete extends React.Component{
	constructor(props){
		super(props);
		this.delete = this.delete.bind(this);
		this.checkUser = this.checkUser.bind(this);
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

	checkUser(){
		//console.log(this.props.uid)
		//console.log(this.props.itemUid)
		if (this.props.uid == this.props.itemUid) {
			return(
				<button style={{backgroundColor: this.state.isSelected? "red":"tomato" ,color: this.state.isSelected? "white":"black"}} 
					className="buttonDelete" onClick={this.delete}>
					X
				</button>
			)
		}
	}

	render(){
		return(
			<div>
			<p>
				{this.props.item}({this.props.chName})
				{this.checkUser()}
			</p>
			</div>
		)
	}
}