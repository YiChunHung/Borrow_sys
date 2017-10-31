import React from 'react';
import {Table} from 'reactstrap'
import ButtonTimeAvailable from 'components/ButtonTimeAvailable.jsx';
import ButtonTimeDelete from 'components/ButtonTimeDelete.jsx';
import 'components/TimeTable.css';

export default class TimeTable extends React.Component{

	render(){
		return (
     		<Table bordered>
        		<thead>
          			<tr>
            		<th> Time interval </th>
            		<th> Date1 </th>
            		<th> Date2 </th>
            		<th> Date3 </th>
            		<th> Date4 </th>
            		<th> Date5 </th>
            		<th> Date6 </th>
            		<th> Date7 </th>
          			</tr>
	        	</thead>
	        	<tbody>
	          		<tr>
	            	<th scope="row">Morning</th>
	            	<td> <ButtonTimeAvailable/> </td>
	            	<td> <ButtonTimeAvailable/> </td>
	            	<td> <ButtonTimeDelete item="pen"/> <ButtonTimeDelete item="projector"/> </td>
	            	<td> <ButtonTimeAvailable/> </td>
	            	<td> <ButtonTimeDelete item="desk"/> </td>
	            	<td> <ButtonTimeAvailable/> </td>
	            	<td> <ButtonTimeDelete item="desk"/> </td>
	          		</tr>
	          		<tr>
	            	<th scope="row">Afternoon</th>
	            	<td> <ButtonTimeDelete item="desk"/> <ButtonTimeDelete item="pen"/> <ButtonTimeDelete item="projector"/> </td>
	            	<td> <ButtonTimeDelete item="desk"/> </td>
	            	<td> <ButtonTimeAvailable/></td>
	            	<td> <ButtonTimeAvailable/></td>
	            	<td> <ButtonTimeDelete item="printer"/> </td>
	            	<td> <ButtonTimeDelete item="desk"/> </td>
	            	<td> <ButtonTimeAvailable/></td>
	          		</tr>
	          		<tr>
	            	<th scope="row">Night</th>
	            	<td> <ButtonTimeAvailable/> </td>
	            	<td> <ButtonTimeDelete item="meeting room"/> <ButtonTimeDelete item="desk"/> </td>
	            	<td> <ButtonTimeDelete item="table"/> </td>
	            	<td> <ButtonTimeAvailable/></td>
	            	<td> <ButtonTimeAvailable/></td>
	            	<td> <ButtonTimeAvailable/></td>
	            	<td> <ButtonTimeAvailable/></td>
	          		</tr>
	        	</tbody>
      		</Table>
    	);
	};
}