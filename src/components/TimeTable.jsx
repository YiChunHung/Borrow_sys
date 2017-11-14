import React from 'react';
import {Table} from 'reactstrap'
import ButtonTimeAvailable from 'components/ButtonTimeAvailable.jsx';
import ButtonTimeDelete from 'components/ButtonTimeDelete.jsx';
import 'components/TimeTable.css';
import DATA from 'components/data.json'

function ButtonChoosing(props){
	console.log(props.name.length)
	if (props.name.length==0) {
		return(
			<td> <ButtonTimeAvailable/> </td>
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
	constructor(){
		super();
		this.state = DATA;
	}

	render(){
		const head = this.state.frontDate.map(
			front => <td key={front.id}> {front.date} </td>
		);
		const rowMorning = this.state.tableDate[0].item.map(
			ButtonChoosing
		);
		const rowAfternoon = this.state.tableDate[1].item.map(
			ButtonChoosing
		);
		const rowNight = this.state.tableDate[2].item.map(
			ButtonChoosing
		);
		//console.log(DATA);
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