import React from 'react';
import Calendar from 'react-calendar';
 
class MineCalendar extends React.Component {
  state = {
    date: new Date(),
  }
  
  render() {
    return (
      <div>
        <Calendar onChange={this.state.date} />
      </div>
    );
  }
}