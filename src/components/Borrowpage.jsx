import React from 'react';
import axios from 'axios';
import ItemList from 'components/ItemList.jsx';
import ITEM from 'components/item.json';

export default class Borrowpage extends React.Component {
  constructor(props) {
    super(props);
    var item = this.loadData()
    console.log(item)
    this.state = {
    	selectedItems: [],
      item: ['- Select -', ...ITEM.item[0].name],
      //item: this.loadData()
    };
    this.toggle = this.toggle.bind(this);
    this.restoreItems = this.restoreItems.bind(this);
    this.loadData = this.loadData.bind(this);
  }
  
  toggle(item) {
    const isPicked = this.state.selectedItems.includes(item);

    this.setState({
      item: this.state.item.filter(function(stuff){return(stuff != item)})
    })
  
    if (isPicked != 'True') {
      this.setState({
        selectedItems: [...this.state.selectedItems, item]
      })
    }  
  }

  loadData() {
    var self = this;
    return axios({
      method:'get',
      url:'http://140.114.84.187:5000/api/items/read',
      params: {'operator_uid':0},
      headers: {
        'Access-Control-Allow-Origin': 'http://140.114.84.187:5000/',
      },
      timeout: 1000,
      "routes": {"cors": true}
    })
    .then(function(response) {
      var item_iid = response.data.payload.map(function(item){return(item.iid)}); 
      var item_name = response.data.payload.map(function(item){return(item.item_name)});
      var item = response.data.payload.map(function(item){return [item.iid, item.item_name]});
      //console.log(item_iid)
      //console.log(item_name)
      self.setState({id: item_iid, name: item_name})
      return item;
    });
  }

  restoreItems(item) {
    this.setState({
      item: [...this.state.item, item],
      selectedItems: this.state.selectedItems.filter(function(stuff){return(stuff != item)})
    })
  }

  render() {
    return (
      <div>
      	<ItemList 
      		choosedItems = {this.toggle}
      		selectedItems = {this.state.selectedItems}
      		item = {this.state.item}
          restoreItems = {this.restoreItems}
      	/>
      </div>
    );
  }
}