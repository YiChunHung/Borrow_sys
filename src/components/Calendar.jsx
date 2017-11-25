import React from 'react'
import moment from 'moment'

function RenderDay(day, i){
	
	return(
		<div
			key = {i}
			className = {'Calendar-grid-item'}
		>
			<button style={{backgroundColor: "blue"}}>
				{day}
			</button>
				{console.log(day)}
		</div>);
	
}

export default class Calendar extends React.Component {
	constructor(props) {
		super(props);
		this.toggle = this.toggle.bind(this);
		this.state = {
			isPick: false,
			weekOffset: 0
		};
	}

	toggle() {
		this.setState({
			isPick: !this.state.isPick
		});
	}

	render() {
		return(
			<div>
				{RenderDay(10, 1)}
			</div>
		);
	}





} 