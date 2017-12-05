import React from 'react';
import ItemList from 'components/ItemList.jsx';
import ITEM from 'components/item.json';

export default class Borrowpage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    	selectedItems: []
    };
    this.toggle = this.toggle.bind(this);
  }

  toggle(e) {
  	const className = e.target.className;
  	const isPicked = this.state.selectedItems.includes(className);

  	if(isPicked){
  		this.setState({
  			selectedItems: this.state.selectedItems.filter(function(item){return item != className})
  		})
  	}
  	else{
  		this.setState({
  			selectedItems: [...this.state.selectedItems, className]
  		})
  	}
  }

  render() {
  	const item = ITEM.item[0].name;
    return (
      <div>
      	<ItemList 
      		choosedItems = {this.toggle}
      		selectedItems = {this.state.selectedItems}
      		item = {item}
      	/>
      </div>
    );
  }
}