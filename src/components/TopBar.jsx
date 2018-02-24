import React from 'react';
import { Button,Collapse, Navbar, NavbarToggler, NavbarBrand, Nav, NavItem, NavLink } from 'reactstrap';
import 'components/TopBar.css';

export default class TopBar extends React.Component{
    constructor(props) {
        super(props);
        this.handleTopBarClick = this.handleTopBarClick.bind(this);

};

handleTopBarClick(e){

var pageNum = {
            "Schedule":1,
            "BorrowSys":2,
            "Server":3
        }

        //console.log(e.target.className);
        this.props.onUpdate(pageNum[e.target.className]);


    }

render() {
        return (
          <div className="TopBar">
            <Navbar color="faded" light expand="md">
              <NavbarBrand >YRG</NavbarBrand>
                <Nav className="ml-auto">
                    <button className="Schedule" onClick={this.handleTopBarClick}> Schedule </button>
                    <button className="BorrowSys" onClick={this.handleTopBarClick}>BorrowSys</button>
                    <button className="Server" onClick={this.handleTopBarClick}>Server</button>
                </Nav>
            </Navbar>
          </div>
        );
      }



}
