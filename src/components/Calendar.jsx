import React from 'react';
import Calendar from 'react-calendar';

export default class MyCalendar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      date: new Date(),
      choose: new Date()
    };
  }
  
  onChange(date){
    this.setState({
      date: date.getDate()
    });
  }
  
  render() {
    return (
      <div>
        <Calendar 
          onChange={this.onChange}
          onClickDay={this.onClickDay}
        />
      </div>
    );
  }
}