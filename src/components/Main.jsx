import React from 'react';
import { Collapse, Navbar, NavbarToggler, NavbarBrand, Nav, NavItem, NavLink } from 'reactstrap';
import Borrowpage from 'components/Borrowpage.jsx'
import moment from 'moment'

export default class Main extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      date: moment()
    };
  }

  render() {
    return (
      <div>
        <Borrowpage />
        
      </div>
    );
  }
}