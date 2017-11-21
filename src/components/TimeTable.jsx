import React from 'react';
import {Table} from 'reactstrap'
import ButtonTimeAvailable from 'components/ButtonTimeAvailable.jsx';
import ButtonTimeDelete from 'components/ButtonTimeDelete.jsx';
import 'components/TimeTable.css';
import DATA from 'components/data.json'

function ButtonChoosing(props){
	console.log(this.state);
	if (props.name.length==0) {
		return(
			<td> <ButtonTimeAvailable onChange={this.handleClick}/> </td>
		)
	} else {
		const buttonDelete = props.name.map(
			function(item){
				return(<ButtonTimeDelete item={item}/>)
			}
		);
		return(
			<td> {buttonDelete} </td>
		)
	}
}


export default class TimeTable extends React.Component{
	constructor(props){
		super(props);
		this.handleClick = this.handleClick.bind(this);
		this.state = DATA;
	};

	handleClick(){
		console.log(1);

	};

	render(){
		//var day = new Date(this.state.frontDate[0].date);

		const head = this.state.frontDate.map(
			front => <td> {front.date} </td>
		);
		const rowMorning = this.state.tableDate[0].item.map(
			ButtonChoosing,this
		);
		const rowAfternoon = this.state.tableDate[1].item.map(
			ButtonChoosing,this
		);
		const rowNight = this.state.tableDate[2].item.map(
			ButtonChoosing,this
		);
		return (
     		<table className="Table">
     			<thead>
     				<tr>
     					<td>Date</td>
     					{head}
     				</tr>
     			</thead>
     			<tbody>
     				<tr>
     					<td>Morning</td>
     					{rowMorning}
     				</tr>
     				<tr>
     					<td>Afternoon</td>
     					{rowAfternoon}
     				</tr>
     				<tr>
     					<td>Night</td>
     					{rowNight}
     				</tr>
     			</tbody>
     		</table>
    	);
	};
}