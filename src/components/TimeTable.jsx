import React from 'react';
import {Table} from 'reactstrap'
import ButtonTimeAvailable from 'components/ButtonTimeAvailable.jsx';
import ButtonTimeDelete from 'components/ButtonTimeDelete.jsx';
import 'components/TimeTable.css';
import API from 'components/TestAPI.json'
import DATA from 'components/data.json'

export default class TimeTable extends React.Component{
	constructor(props){
		super(props);
		this.handleDeletedClick = this.handleDeletedClick.bind(this);
		this.handleAvailbleClick = this.handleAvailbleClick.bind(this);
		this.handleBlockTime = this.handleBlockTime.bind(this);
		this.handleFrontTime = this.handleFrontTime.bind(this);
		this.state = {
			create:[],
			delete:[]
		};
	};

	handleDeletedClick(sid){
		const deletedItemArray = {sid:sid};

		const isDeletedDuplicate = this.state.delete.map(
			function(deleteItem){
				if(deleteItem.sid==sid)
					return true;
				else
					return false;
			}
		);	

		if(isDeletedDuplicate.includes(true)){
			this.setState(
				{delete:this.state.delete.filter(
					function(e, i){
						return !isDeletedDuplicate[i];
					}
				)}
			);
		} else {
			this.setState(
				{delete:this.state.delete.concat(deletedItemArray)}
			);
		}
	};

	handleAvailbleClick(time){
		const itemArray = this.props.item.map(
			function(item){
				var createNew = {
					iid:item.iid,
					date:time
				};
				return createNew;
			}
		);
		const isDuplicate = this.state.create.map(
			function(create){
				if (create.date[0].toString()==time[0].toString()) 
					return true;
				else 
					return false;
			}
		);
		if(isDuplicate.includes(true)){
			this.setState(
				{create:this.state.create.filter(
					function(e, i){
						return !isDuplicate[i];
					}
				)}
			);
		} else {
			this.setState(
				{create:this.state.create.concat(itemArray)}
			);
		}
	};

	handleBlockTime(handleAvailbleClick, handleDeletedClick){
		const timeBlocks = {
			"morning":
			{
				"start":[8,0,0],
				"end":[11,59,59]
			},
			"afternoon":
			{
				"start":[12,0,0],
				"end":[17,59,59]
			},
			"night":
			{
				"start":[18,0,0],
				"end":[23,59,59]
			}
		}
		return function(dateIn, index){
			var morningBlock = {
				"start":new Date(dateIn.date),
				"end":new Date(dateIn.date),
				"name": [],
				"sid" : []
			};
			morningBlock.start.setHours(timeBlocks.morning.start[0],timeBlocks.morning.start[1],timeBlocks.morning.start[2]);
			morningBlock.end.setHours(timeBlocks.morning.end[0],timeBlocks.morning.end[1],timeBlocks.morning.end[2]);

			var afternoonBlock = {
				"start":new Date(dateIn.date),
				"end":new Date(dateIn.date),
				"name": [],
				"sid" : []
			};
			afternoonBlock.start.setHours(timeBlocks.afternoon.start[0],timeBlocks.afternoon.start[1],timeBlocks.afternoon.start[2]);
			afternoonBlock.end.setHours(timeBlocks.afternoon.end[0],timeBlocks.afternoon.end[1],timeBlocks.afternoon.end[2]);

			var nightBlock = {
				"start":new Date(dateIn.date),
				"end":new Date(dateIn.date),
				"name": [],
				"sid" : []
			};
			nightBlock.start.setHours(timeBlocks.night.start[0],timeBlocks.night.start[1],timeBlocks.night.start[2]);
			nightBlock.end.setHours(timeBlocks.night.end[0],timeBlocks.night.end[1],timeBlocks.night.end[2]);

			for(var i=0; i<API.payload.length; i++){
				var APIstart = new Date(API.payload[i].time_start);
				if(morningBlock.start.toString() == APIstart.toString()){
					var morningItemId = {"iid":API.payload[i].iid, "sid":API.payload[i].sid}
					morningBlock.name.push(morningItemId);
				}
				if(afternoonBlock.start.toString() == APIstart.toString()){
					var afternoonItemId = {"iid":API.payload[i].iid, "sid":API.payload[i].sid}
					afternoonBlock.name.push(afternoonItemId);
				}
				if(nightBlock.start.toString() == APIstart.toString()){
					var nightItemId = {"iid":API.payload[i].iid, "sid":API.payload[i].sid}
					nightBlock.name.push(nightItemId);
				}
			}

			var morningButton;
			var afternoonButton; 
			var nightButton;

			if (morningBlock.name.length==0) {
				morningButton = (
					<td key={index}> <ButtonTimeAvailable onChange={handleAvailbleClick} time={[morningBlock.start,morningBlock.end]}/> </td>
				);
				
			} else {
				const morningButtonDelete = morningBlock.name.map(
					function(item, index){
						return(<ButtonTimeDelete key={index} onChange={handleDeletedClick} item={item.iid} sid={item.sid}/>)
					}
				);
				morningButton = (
					<td key={index}> {morningButtonDelete} </td>
				);
			}

			if (afternoonBlock.name.length==0) {
				afternoonButton = (
					<td key={index+7}> <ButtonTimeAvailable onChange={handleAvailbleClick} time={[afternoonBlock.start,afternoonBlock.end]}/> </td>
				)
			} else {
				const afternoonButtonDelete = afternoonBlock.name.map(
					function(item, index){
						return(<ButtonTimeDelete key={index} onChange={handleDeletedClick} item={item.iid} sid={item.sid}/>)
					}
				);
				afternoonButton = (
					<td key={index+7}> {afternoonButtonDelete} </td>
				)
			}

			if (nightBlock.name.length==0) {
				nightButton = (
					<td key={index+14}> <ButtonTimeAvailable onChange={handleAvailbleClick} time={[nightBlock.start,nightBlock.end]}/> </td>
				)
			} else {
				const nightButtonDelete = nightBlock.name.map(
					function(item, index){
						return(<ButtonTimeDelete key={index} onChange={handleDeletedClick} item={item.iid} sid={item.sid}/>)
					}
				);
				nightButton = (
					<td key={index+14}> {nightButtonDelete} </td>
				)
			}

			const Button = [morningButton, afternoonButton, nightButton];
			return Button;
		};
	}

	handleFrontTime(frontDateIn, index){
		var frontDate = new Date(frontDateIn.date);
		var frontDateString = frontDate.toLocaleDateString();
		return (
			<td key={index}> {frontDateString} </td>
		)
	}

	render(){
		var frontDate = this.props.frontDate;
		frontDate.sort(
			function(date1, date2){
				var a = new Date(date1.date);
				var b = new Date(date2.date);
				return a - b;
			}
		);

		const head = frontDate.map(
			this.handleFrontTime
		);
		const row = frontDate.map(
			this.handleBlockTime(this.handleAvailbleClick, this.handleDeletedClick)
		);

		const rowMorning = row.map(
			function(date){
				return date[0]
			}
		);
		const rowAfternoon = row.map(
			function(date){
				return date[1]
			}
		);
		const rowNight = row.map(
			function(date){
				return date[2]
			}
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