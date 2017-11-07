import React from 'react';
import { Collapse, Navbar, NavbarToggler, NavbarBrand, Nav, NavItem, NavLink } from 'reactstrap';
import MyCalendar from 'components/Calendar.jsx';

export default class Main extends React.Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
      isOpen: false,
      click: new Date()
    };
  }

  toggle() {
    this.setState({
      isOpen: !this.state.isOpen
    });
  }

  onClickDay(choose){
  	this.setState({
  	  click: choose
  	});
  }

  render() {
    return (
      <div>
      	<MyCalendar
      	   onClick={this.onClickDay}	
      	/>
      </div>	
    );
  }
}

