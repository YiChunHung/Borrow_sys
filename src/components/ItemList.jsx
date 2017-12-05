import React from 'react';
import { Collapse, Navbar, NavbarToggler, NavbarBrand, Nav, NavItem, NavLink } from 'reactstrap';

export default class ItemList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      collapsed: true,
    };
    this.toggleNavbar = this.toggleNavbar.bind(this);
    this.itemList = this.itemList.bind(this);
    this.toggle = this.toggle.bind(this);
  }

  toggleNavbar() {
    this.setState({
      collapsed: !this.state.collapsed
    });
  }

  toggle(e) {
    this.props.choosedItems(e)
  }

  itemList(item) {    
    return(
      <NavItem
        key={item}
      >
        <button
          style={{background: this.props.selectedItems.includes(item)? "blue":"white"}}
          onClick={this.toggle}
          className={item}
        >
          {item}
        </button>
      </NavItem>
    );
    
  }

  render() {
    return (
      <div>
        <Navbar color="faded" light>
          <NavbarBrand> 
            <button onClick={this.toggleNavbar} className="mr-auto">
              Item List
            </button>
          </NavbarBrand>
          <Collapse isOpen={!this.state.collapsed} navbar>
            <Nav navbar>
              {this.props.item.map(this.itemList)}
            </Nav>
          </Collapse>
        </Navbar>
      </div>
    );
  }
}