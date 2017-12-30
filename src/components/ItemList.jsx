import React from 'react';
import { Collapse, Navbar, NavbarToggler, NavbarBrand, Nav, NavItem, NavLink } from 'reactstrap';
import { Col, Button, Form, FormGroup, Label, Input, FormText } from 'reactstrap';
import 'components/itemList.css'

export default class ItemList extends React.Component {
  constructor(props) {
    super(props);
    this.showList = this.showList.bind(this);
    this.showSelectedList = this.showSelectedList.bind(this);
    this.toggle = this.toggle.bind(this);
    this.restoreItem = this.restoreItem.bind(this);
  }

  toggle(e) {
    var item = document.getElementById("exampleSelect").value
    this.props.choosedItems(item)
  }

  restoreItem(e) {
    var item = e.target.className
    this.props.restoreItems(item)
  }

  showList(item) {
    return(
      <option key={item} className="singleItem">
        {item}
      </option>
    )
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
        {this.props.selectedItems.map(this.showSelectedList)}
        <Form>
          <FormGroup>
            <Input type="select" className="itemList" id="exampleSelect" onChange={this.toggle}>
              {this.props.item.map(this.showList)}
            </Input>
          </FormGroup>
        </Form>
      </div>
    );
  }
}