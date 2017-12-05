import React from 'react'
import moment from 'moment'
import Calendar from 'components/Calendar.jsx'

export default class Borrowpage extends React.Component {
	
	constructor(props){
		super(props);
		this.state = {
			date: moment(),
			selectedDays: []
		};
		this.toggle = this.toggle.bind(this);
	}


	toggle(e) {
		const className = e.target.className;
		const isPicked = this.state.selectedDays.includes(className);
		
		
		if (isPicked){
			this.setState({
				selectedDays: this.state.selectedDays.filter(function(item){
												return item != className
											})
			})
		}
		else{
			if (this.state.selectedDays.length <= 6){
				this.setState({
					selectedDays: [...this.state.selectedDays, className]
				})
			}
			else {
				alert('選擇天數不可超過七天')
			}
		}
	}

	render(){
		return(
			<Calendar 
				onChangeMonth={(date) => this.setState({date})}
				date = {this.state.date}
				choosedDays = {this.toggle}
				selectedDays = {this.state.selectedDays}
			/>
		);
	}	
}