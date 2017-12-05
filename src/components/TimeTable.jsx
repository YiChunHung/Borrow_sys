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

	handleBlockTime(block, handleAvailbleClick, handleDeletedClick){
		const timeBlocks = {
			"morning":{
				"start":[8,0,0],
				"end":[11,59,59]
			},
			"afternoon":{
				"start":[12,0,0],
				"end":[17,59,59]
			},
			"night":{
				"start":[18,0,0],
				"end":[23,59,59]
			}
		}
		return function(dateIn, index){
			var timeBlock = {
				"start":new Date(dateIn.date),
				"end":new Date(dateIn.date),
				"name": [],
				"sid" : []
			};
			timeBlock.start.setHours(timeBlocks[block].start[0],timeBlocks[block].start[1],timeBlocks[block].start[2]);
			timeBlock.end.setHours(timeBlocks[block].end[0],timeBlocks[block].end[1],timeBlocks[block].end[2]);

			for(var i=0; i<API.payload.length; i++){
				var APIstart = new Date(API.payload[i].time_start);
				if(timeBlock.start.toString() == APIstart.toString()){
					var itemId = {"iid":API.payload[i].iid, "sid":API.payload[i].sid}
					timeBlock.name.push(itemId);
				}
			}
			if (timeBlock.name.length==0) {
				return(
					<td key={index}> <ButtonTimeAvailable onChange={handleAvailbleClick} time={[timeBlock.start,timeBlock.end]}/> </td>
				)
			} else {
				const buttonDelete = timeBlock.name.map(
					function(item, index){
						return(<ButtonTimeDelete key={index} onChange={handleDeletedClick} item={item.iid} sid={item.sid}/>)
					}
				);
				return(
					<td key={index}> {buttonDelete} </td>
				)
			}
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
		const rowMorning = frontDate.map(
			this.handleBlockTime("morning",this.handleAvailbleClick, this.handleDeletedClick)
		);
		const rowAfternoon = frontDate.map(
			this.handleBlockTime("afternoon",this.handleAvailbleClick, this.handleDeletedClick)
		);
		const rowNight = frontDate.map(
			this.handleBlockTime("night",this.handleAvailbleClick, this.handleDeletedClick)
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