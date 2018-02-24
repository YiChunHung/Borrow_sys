import React from 'react';
import {Table} from 'reactstrap'
import ButtonTimeAvailable from 'components/ButtonTimeAvailable.jsx';
import ButtonTimeDelete from 'components/ButtonTimeDelete.jsx';
import 'components/TimeTable.css';
import API from 'components/TestAPI.json'
import config from 'components/config.json'
import moment from 'moment'
import axios from 'axios'

export default class TimeTable extends React.Component{
	constructor(props){
		super(props);
		this.handleDeletedClick = this.handleDeletedClick.bind(this);
		this.handleAvailbleClick = this.handleAvailbleClick.bind(this);
		this.handleBlockTime = this.handleBlockTime.bind(this);
		this.handleFrontTime = this.handleFrontTime.bind(this);
		this.handleOutput = this.handleOutput.bind(this);
		this.state = {
			create:[],
			delete:[]
		};
	};

	handleDeletedClick(sid){
		const deletedItemArray = sid;

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

	handleAvailbleClick(timeStartIn, timeEndIn){
		const timeStart = moment(timeStartIn).format('YYYY-M-D HH:mm:ss');
		const timeEnd = moment(timeEndIn).format('YYYY-M-D HH:mm:ss');

		const itemArray = this.props.item.map(
			function(item){
				var createNew = {
					"iid":item,
					"time_start":timeStart,
					"time_end":timeEnd
				};
				return createNew;
			}
		);
		const isDuplicate = this.state.create.map(
			function(create){
				if (create.time_start.toString()==timeStart.toString()) 
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

	handleBlockTime(handleAvailbleClick, handleDeletedClick, classObj){
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
		//console.log(classObj)
		return function(dateIn, index){
			//console.log(moment(dateIn).format('YYYY-M-D HH:mm:ss'))
			var morningBlock = {
				"start":new Date(dateIn),
				"end":new Date(dateIn),
				"id": []
			};
			morningBlock.start.setHours(timeBlocks.morning.start[0],timeBlocks.morning.start[1],timeBlocks.morning.start[2]);
			morningBlock.end.setHours(timeBlocks.morning.end[0],timeBlocks.morning.end[1],timeBlocks.morning.end[2]);

			var afternoonBlock = {
				"start":new Date(dateIn),
				"end":new Date(dateIn),
				"id": []
			};
			afternoonBlock.start.setHours(timeBlocks.afternoon.start[0],timeBlocks.afternoon.start[1],timeBlocks.afternoon.start[2]);
			afternoonBlock.end.setHours(timeBlocks.afternoon.end[0],timeBlocks.afternoon.end[1],timeBlocks.afternoon.end[2]);

			var nightBlock = {
				"start":new Date(dateIn),
				"end":new Date(dateIn),
				"id": []
			};
			nightBlock.start.setHours(timeBlocks.night.start[0],timeBlocks.night.start[1],timeBlocks.night.start[2]);
			nightBlock.end.setHours(timeBlocks.night.end[0],timeBlocks.night.end[1],timeBlocks.night.end[2]);

			for(var i=0; i<classObj.props.statusReadResponse.length; i++){
				var APIstart = new Date(classObj.props.statusReadResponse[i].time_start);
				if(morningBlock.start.toString() == APIstart.toString()){
					var morningItemId = {"iid":classObj.props.statusReadResponse[i].iid, "sid":classObj.props.statusReadResponse[i].sid, "uid":classObj.props.statusReadResponse[i].uid}
					morningBlock.id.push(morningItemId);
				}
				if(afternoonBlock.start.toString() == APIstart.toString()){
					var afternoonItemId = {"iid":classObj.props.statusReadResponse[i].iid, "sid":classObj.props.statusReadResponse[i].sid, "uid":classObj.props.statusReadResponse[i].uid}
					afternoonBlock.id.push(afternoonItemId);
				}
				if(nightBlock.start.toString() == APIstart.toString()){
					var nightItemId = {"iid":classObj.props.statusReadResponse[i].iid, "sid":classObj.props.statusReadResponse[i].sid, "uid":classObj.props.statusReadResponse[i].uid}
					nightBlock.id.push(nightItemId);
				}
			}

			var morningButton;
			var afternoonButton; 
			var nightButton;

			//console.log(classObj.props)

			if (morningBlock.id.length==0) {
				morningButton = (
					<td key={index}> <ButtonTimeAvailable onChange={handleAvailbleClick} timeStart={morningBlock.start} timeEnd={morningBlock.end}/> </td>
				);
				
			} else {
				const morningButtonDelete = morningBlock.id.map(
					function(item, index){
						return(<ButtonTimeDelete key={index} onChange={handleDeletedClick} item={classObj.props.id2item[item.iid]} sid={item.sid} uid={classObj.props.uid} itemUid={item.uid}/>)
					}
				);
				morningButton = (
					<td key={index}> {morningButtonDelete} </td>
				);
			}

			if (afternoonBlock.id.length==0) {
				afternoonButton = (
					<td key={index+7}> <ButtonTimeAvailable onChange={handleAvailbleClick} timeStart={afternoonBlock.start} timeEnd={afternoonBlock.end}/> </td>
				)
			} else {
				const afternoonButtonDelete = afternoonBlock.id.map(
					function(item, index){
						return(<ButtonTimeDelete key={index} onChange={handleDeletedClick} item={classObj.props.id2item[item.iid]} sid={item.sid} uid={classObj.props.uid} itemUid={item.uid}/>)
					}
				);
				afternoonButton = (
					<td key={index+7}> {afternoonButtonDelete} </td>
				)
			}

			if (nightBlock.id.length==0) {
				nightButton = (
					<td key={index+14}> <ButtonTimeAvailable onChange={handleAvailbleClick} timeStart={nightBlock.start} timeEnd={nightBlock.end}/> </td>
				)
			} else {
				const nightButtonDelete = nightBlock.id.map(
					function(item, index){
						return(<ButtonTimeDelete key={index} onChange={handleDeletedClick} item={classObj.props.id2item[item.iid]} sid={item.sid} uid={classObj.props.uid} itemUid={item.uid}/>)
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
		var frontDate = new Date(frontDateIn);
		var frontDateString = frontDate.toLocaleDateString();
		return (
			<td key={index}> {frontDateString} </td>
		)
	}

	async handleOutput(){
		
		if (this.state.create.length){
			await axios({
				method:'post',
				url:'/tickets/create',
				baseURL:config.baseURL+config.port+config.prefix,
				params:{'operator_uid':this.props.uid, 'token':this.props.token},
				data:{
					"data":this.state.create,
				}
			}).then(async function(response){
				if (!response.data.validation) {
					if (this.state.delete.length) {
						await axios({
							method:'delete',
							url:'/status/delete',
							baseURL:config.baseURL+config.port+config.prefix,
							params:{'operator_uid':this.props.uid, 'token':this.props.token},
							data:{
								"sid":this.state.delete
							}
						}).then(function(response){
							if (!response.data.validation) {
								alert("Success!");
							} else {
								alert("Deletion Failed !");
							}

						});
					} else {
						alert("Success!")
					}
				} else {
					alert("Borrow Failed !");
				}
			}.bind(this));
		} else {
			if (this.state.delete.length) {
				await axios({
					method:'delete',
					url:'/status/delete',
					baseURL:config.baseURL+config.port+config.prefix,
					params:{'operator_uid':this.props.uid, 'token':this.props.token},
					data:{
						"sid":this.state.delete
					}
				}).then(function(response){
					if (!response.data.validation) {
						alert("Success");
					} else {
						alert("Deletion Failed !");
					}

				});
			}
		}

		/*if (this.state.delete.length) {
			await axios({
				method:'delete',
				url:'/status/delete',
				baseURL:config.baseURL+config.port+config.prefix,
				params:{'operator_uid':this.props.uid, 'token':this.props.token},
				data:{
					"sid":this.state.delete
				}
			});
		}*/

		window.location.reload();

	}

	render(){
		var frontDate = this.props.frontDate;
		frontDate.sort(
			function(date1, date2){
				var a = new Date(date1);
				var b = new Date(date2);
				return a - b;
			}
		);

		const head = frontDate.map(
			this.handleFrontTime
		);
		const row = frontDate.map(
			this.handleBlockTime(this.handleAvailbleClick, this.handleDeletedClick, this)
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
			<div>
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
	     		<button onClick={this.handleOutput}>
	     			Enter
	     		</button>
	     	</div>
    	);
	};
}