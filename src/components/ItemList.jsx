import React from 'react';
import { Collapse, Navbar, NavbarToggler, NavbarBrand, Nav, NavItem, NavLink } from 'reactstrap';
import { Col, Button, Form, FormGroup, Label, Input, FormText } from 'reactstrap';
import 'components/itemList.css'
import Dropdown from 'react-dropdown'
import 'react-dropdown/style.css'

export default class ItemList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      ifClick: false
    }
    this.showList = this.showList.bind(this);
    this.showSelectedList = this.showSelectedList.bind(this);
    this.toggle = this.toggle.bind(this);
    this.restoreItem = this.restoreItem.bind(this);
  }

  toggle(e) {
    var item = document.getElementById("exampleSelect").value
    this.props.choosedItems(item)
    this.setState({
      ifClick: !this.state.ifClick
    })
  }

  restoreItem(e) {
    var item = e.target.className
    this.props.restoreItems(item)
  }

  showList(item) {
    if (item[0] == '-') {
      return(
        <option key={item} className="singleItem" disabled="true" style={{color: "#bebebe",  "align":"center"}} >
          {item}
        </option>
      )
    }
    else {
      return(
        <option key={item} className="singleItem" style={{color: this.props.selectedItems.includes(item)? "blue":"black"}}>
          {item}
        </option>
      )
    }
  }

  showSelectedList(item) {
    return(
      <p key={item} className="selectedItems">
        {item}
        <button 
          className={item} 
          onClick={this.restoreItem}
          key={item}
        > 
          x
        </button>
      </p>
    )
  }

  render() {
    return (
      <div>
        <h2>Selected Item List</h2>
        <select className="itemList" id="exampleSelect" onClick={this.toggle} size="6" style={{width:"100%"}}>
          {this.props.item.map(this.showList)}
        </select>
      </div>
    );
  }
}