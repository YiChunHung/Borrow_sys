import React from 'react';
import { Collapse, Navbar, NavbarToggler, NavbarBrand, Nav, NavItem, NavLink } from 'reactstrap';
import TimeTable from 'components/TimeTable.jsx'

export default class Main extends React.Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
      isOpen: false
    };
  }
  toggle() {
    this.setState({
      isOpen: !this.state.isOpen
    });
  }
  render() {
    const Testdate = [
      {date:"2017-12-03 00:00:00"},
      {date:"2017-12-01 00:00:00"},
      {date:"2017-11-20 00:00:00"},
      {date:"2017-12-20 00:00:00"}
    ];

    const Testitem = [
      {iid:1},
      {iid:2}
    ];
    
    return (
      <div>
        <TimeTable frontDate={Testdate} item={Testitem}/>
      </div>
      /*
      <div>
        <Navbar color="faded" light expand="md">
          <NavbarBrand href="/">reactstrap</NavbarBrand>
          <NavbarToggler onClick={this.toggle} />
          <Collapse isOpen={this.state.isOpen} navbar>
            <Nav className="ml-auto" navbar>
              <NavItem>
                <NavLink href="/components/">Components</NavLink>
              </NavItem>
              <NavItem>
                <NavLink href="https://github.com/reactstrap/reactstrap">Github</NavLink>
              </NavItem>
            </Nav>
          </Collapse>
        </Navbar>
      </div>
      */

    );
  }
}