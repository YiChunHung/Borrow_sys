import React from 'react';
import {Table} from 'reactstrap'
import ButtonTimeAvailable from 'components/ButtonTimeAvailable.jsx';
import ButtonTimeDelete from 'components/ButtonTimeDelete.jsx';
import 'components/TimeTable.css';

function ButtonChoosing(props){
	console.log(props.date.length)
	console.log(props.date[props.time].item[0])
	console.log(props.time)
	for (var i = 0; i<props.date[props.time].item.length ; i++) {
		if(props.date[props.time].item[i].length==0){
			return(
				<td> <ButtonTimeAvailable/> </td>
			)
		} else {
			const buttondelete = props.date.map(
				button => <ButtonTimeDelete item={props.date[props.time].item[i].name} />
			);

			return(
				<td>
					{buttondelete}
				</td>
			)
		}


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
			tableDate: [
				{
					item:[{
						name: ['pen','room'],
						id: 3
					},{
						name: [],
						id: 4
					}]
				},
				{
					item:[{
						name: ['room'],
						id: 5
					},{
						name: [],
						id: 6
					}]
				},
				{
					item:[{
						name: [],
						id: 7
					},{
						name: ['pen'],
						id: 8
					}]
				}
			
			]

		}
	}



	render(){
		const head = this.state.frontDate.map(
			front => <td key={front.id}> {front.date} </td>
		);/*
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
		);*/


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
     					<ButtonChoosing date={this.state.tableDate} time={0}/>
     				</tr>
     				<tr>
     					<td>Afternoon</td>
     					<ButtonChoosing date={this.state.tableDate} time={1}/>
     				</tr>
     				<tr>
     					<td>Night</td>
     					<ButtonChoosing date={this.state.tableDate} time={2}/>
     				</tr>
     			</tbody>
     		</table>
    	);
	};
}