import React from 'react';
import {Table} from 'reactstrap'
import ButtonTimeAvailable from 'components/ButtonTimeAvailable.jsx';
import ButtonTimeDelete from 'components/ButtonTimeDelete.jsx';
import 'components/TimeTable.css';

function ButtonChoosing(props){
	if (props.notAvailable) {
		return (
			<ButtonTimeDelete item={props.item}/>
		)
	} else {
		return (
			<ButtonTimeAvailable/>
		)
	}
}



export default class TimeTable extends React.Component{
	constructor(){
		super();
		this.state = {
			frontDate: [{
				id: 1,
				date:'11/01'
			},{
				id: 2,
				date:'11/03'
			}/*,{
				date:
			},{
				date:
			},{
				date:
			},{
				date:
			},{
				date:
			}*/],
			back:[{
				id: 3,
				item: 'pen',
				date: '11/01',
				morning: true,
				afternoon: true,
				night: false
			}, {
				id: 4,
				item: 'pen',
				date: '11/03',
				morning: false,
				afternoon: true,
				night: true
			}, {
				id: 5,
				item: 'room',
				date: '11/01',
				morning: false,
				afternoon: true,
				night: true
			}]


		}
	}



	render(){
		const head = this.state.frontDate.map(
			front => <td key={front.id}> {front.date} </td>
		);
		const rowMorning = this.state.back.map(
			morning => 	
				<td key={morning.id}>
				<ButtonChoosing notAvailable={morning.morning} item={morning.item}/>
				</td>
		);
		const rowAfternoon = this.state.back.map(
			afternoon => 	
				<td key={afternoon.id}>
				<ButtonChoosing notAvailable={afternoon.afternoon} item={afternoon.item}/>
				</td>
		);
		const rowNight = this.state.back.map(
			night => 	
				<td key={night.id}>
				<ButtonChoosing notAvailable={night.night} item={night.item}/>
				</td>
		);


		return (
     		<table>
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