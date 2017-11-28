import React from 'react'
import moment from 'moment'
import cx from 'classnames'
import CreatDateObject from 'components/CreatDateObject.jsx'
import 'components/Calendar.css'

export default class Calendar extends React.Component {
	constructor(props) {
		super(props);
		this.toggle = this.toggle.bind(this);
		this.renderDay = this.renderDay.bind(this);
		this.renderHeader = this.renderHeader.bind(this);
		this.handlePrevMonth = this.handlePrevMonth.bind(this);
		this.handleNextMonth = this.handleNextMonth.bind(this);
		this.weekDay = this.weekDay.bind(this);
		this.state = {
			weekOffset: 0,
			weekday: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
		};
	}

	toggle(e) {
		this.props.choosedDays(e)
	}

	renderHeader(date, onPrevMonth, onNextMonth){
		return(
			<div
				className = "Calendar-header"
			>
				<button onClick={this.handlePrevMonth}>«</button>
				<div className="Calendar-header-currentDate">
					{date.format('MMMM YYYY')}
				</div>
				<button onClick={this.handleNextMonth}>»</button>
			</div>
		);
	}

	renderDay(day, i){
		return(
			<div
				key = {day.day.format()}
				className = {cx("Calendar-grid-item",day.classNames)}
			>
				<button 
					style={{backgroundColor: this.props.selectedDays.includes(day.day.format())? "blue":"white"}} 
					onClick={this.toggle}
					className={cx(day.day.format(), day.classNames)}
					disabled={day.classNames? true:false}
				>
					
					{day.day.format('D')}
					
				</button>
			</div>
		);
	}

	handlePrevMonth() {
		this.props.onChangeMonth(this.props.date.clone().subtract(1, 'month'))		
	}

	handleNextMonth() {
		this.props.onChangeMonth(this.props.date.clone().add(1, 'month'))		
	}

	weekDay(item, index){
		return(
			<div key={index} className = "Week-day">
				{item}
			</div>
		);
	}

	render() {
		return(
			<div className="Calendar">
				{this.renderHeader(this.props.date, this.handlePrevMonth, this.handleNextMonth)}
				{this.state.weekday.map(this.weekDay)}
				{CreatDateObject(this.props.date, 0).map(this.renderDay)}			
			</div>
		);
	}
} 

