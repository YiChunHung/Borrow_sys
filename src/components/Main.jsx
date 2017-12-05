import React from 'react';
import { Collapse, Navbar, NavbarToggler, NavbarBrand, Nav, NavItem, NavLink } from 'reactstrap';
import Borrowpage from 'components/Borrowpage.jsx'

export default class Main extends React.Component {
  constructor(props) {
    super(props);

  }

  render() {
    return (
      <div>
        <Borrowpage />
      </div>
    );
  }
}