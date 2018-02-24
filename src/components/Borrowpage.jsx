import React from 'react';
import axios from 'axios';
import moment from 'moment'
import ItemList from 'components/ItemList.jsx';
import Calendar from 'components/Calendar.jsx';
import TimeTable from 'components/TimeTable.jsx';
import 'components/Borrowpage.css'
import ITEM from 'components/item.json';
import config from 'components/config.json'

export default class Borrowpage extends React.Component {
  constructor(props) {
    super(props); 
    this.state = {
      date: moment(),
      selectedDays: [],
    	selectedItems: [],
      selectedItemIIDs: [],
      isShowTimeTable: false,
      item: [],
      item2id: {},
      id2item: {},
      statusReadResponse: [],
      disabled: false
    };
    this.toggleCalendar = this.toggleCalendar.bind(this);
    this.toggleItemList = this.toggleItemList.bind(this);
    this.restoreItems = this.restoreItems.bind(this);
    this.readItem = this.readItem.bind(this);
    this.sendDateId = this.sendDateId.bind(this);
    this.readItem()
  }

  async readItem() {
    await axios({
      method:'get',
      url: '/items/read',
      baseURL:config.baseURL + config.port + config.prefix,
      params: {'operator_uid':this.props.uid, 'token':this.props.token},
      timeout: 1000,
    })
    .then(function(response) {
      if (!response.data.validation) {
        console.log(response.data)
        var item_iid = response.data.payload.map(function(item){return(item.iid)}); 
        var item_name = response.data.payload.map(function(item){return(item.item_name)});
        var item = response.data.payload.map(function(item){return [item.iid, item.item_name]});
        var item2id = {};
        var id2item = {};
        for (var i = 0 ; i < item_iid.length ; i++) {
          item2id[item_name[i]] = item_iid[i];
          id2item[item_iid[i]] = item_name[i];
        }
        this.setState({
          item:['- Select -', ...item_name],
          item2id: item2id,
          id2item: id2item
        })
      } else {
        alert("Please reload!!")
      }
    }.bind(this));
  }
  
  toggleItemList(item) {
    const isPicked = this.state.selectedItems.includes(item);
    if (!this.state.disabled){
      this.setState({
        item: this.state.item.filter(function(stuff){return(stuff != item)})
      })
    }
  
    if (!isPicked && !this.state.disabled) {
      this.setState({
        selectedItems: [...this.state.selectedItems, item],
        selectedItemIIDs: [...this.state.selectedItemIIDs, this.state.item2id[item]]
      })
    }
    else{
      alert('If you want to reselect, please reload the page.[ctrl+R]');
    }
  }

  toggleCalendar(e) {
    const className = e.target.className;
    const isPicked = this.state.selectedDays.includes(className);
       
    if (isPicked && this.state.disabled == false){
      this.setState({
        selectedDays: this.state.selectedDays.filter(function(item){
                        return item != className
                      })
      })
    }
    else{
      if (this.state.selectedDays.length <= 6 && this.state.disabled == false){
        this.setState({
          selectedDays: [...this.state.selectedDays, className]
        })
      }
      else {
        alert('If you want to reselect, please reload the page.[ctrl+R]');
      }
    }
  }
  
  restoreItems(item) {
    var id = this.state.item2id[item];
    this.setState({
      item: [...this.state.item, item],
      selectedItems: this.state.selectedItems.filter(function(stuff){return(stuff != item)}),
      selectedItemIIDs: this.state.selectedItemIIDs.filter(function(item_id){return(item_id != id)}),
    })
  }

  sendDateId() {
    const timeBlocks = {
      "morning":
      {
        "start":[8,0,0],
        "end":[11,59,59]
      },
      "afternoon":
      {
        "start":[12,0,0],
        "end":[17,59,59]
      },
      "night":
      {
        "start":[18,0,0],
        "end":[23,59,59]
      }
    }

    var morningStartTime = this.state.selectedDays.map(function(date){
      var day = new Date(date);
      day.setHours(timeBlocks.morning.start[0], timeBlocks.morning.start[1], timeBlocks.morning.start[2])
      return moment(day).format('YYYY-M-D HH:mm:ss')
    });
    var afternoonStartTime = this.state.selectedDays.map(function(date){
      var day = new Date(date);
      day.setHours(timeBlocks.afternoon.start[0], timeBlocks.afternoon.start[1], timeBlocks.afternoon.start[2])
      return moment(day).format('YYYY-M-D HH:mm:ss')
    });
    var nightStartTime = this.state.selectedDays.map(function(date){
      var day = new Date(date);
      day.setHours(timeBlocks.night.start[0], timeBlocks.night.start[1], timeBlocks.night.start[2])
      return moment(day).format('YYYY-M-D HH:mm:ss')
    });
    var morningEndTime = this.state.selectedDays.map(function(date){
      var day = new Date(date);
      day.setHours(timeBlocks.morning.end[0], timeBlocks.morning.end[1], timeBlocks.morning.end[2])
      return moment(day).format('YYYY-M-D HH:mm:ss')
    });
    var afternoonEndTime = this.state.selectedDays.map(function(date){
      var day = new Date(date);
      day.setHours(timeBlocks.afternoon.end[0], timeBlocks.afternoon.end[1], timeBlocks.afternoon.end[2])
      return moment(day).format('YYYY-M-D HH:mm:ss')
    });
    var nightEndTime = this.state.selectedDays.map(function(date){
      var day = new Date(date);
      day.setHours(timeBlocks.night.end[0], timeBlocks.night.end[1], timeBlocks.night.end[2])
      return moment(day).format('YYYY-M-D HH:mm:ss')
    });
    var itemData = [];
    const selectedDaysLength = this.state.selectedDays.length;
    const itemLength = this.state.selectedItems.length;
    for (var i = 0 ; i < itemLength ; i ++){
      for (var j = 0 ; j < selectedDaysLength ; j++){
        var morningData = {};
        morningData['iid'] = this.state.selectedItemIIDs[i];
        morningData['time_start'] = morningStartTime[j];
        morningData['time_end'] = morningEndTime[j];
        itemData.push(morningData)
        var afternoonData = {};
        afternoonData['iid'] = this.state.selectedItemIIDs[i];
        afternoonData['time_start'] = afternoonStartTime[j];
        afternoonData['time_end'] = afternoonEndTime[j];
        itemData.push(afternoonData)
        var nightData = {};
        nightData['iid'] = this.state.selectedItemIIDs[i];
        nightData['time_start'] = nightStartTime[j];
        nightData['time_end'] = nightEndTime[j];
        itemData.push(nightData)
      }      
    }
    //selectedDays.setHours(timeBlocks.morning.end[0], timeBlocks.morning.end[1], timeBlocks.morning.end[2])
    
    axios({
      method:'post',
      url: '/status/read',
      baseURL:config.baseURL + config.port + config.prefix,
      params: {'operator_uid':this.props.uid, 'token':this.props.token},
      data: {
        'data': itemData
      },
      timeout: 1000,
    }).then(function(response){
      if (!response.data.validation) {
        console.log(response.data);
        this.setState({
        statusReadResponse: response.data.payload, 
        disabled:true,
        isShowTimeTable: true
        })
        console.log(this.state.statusReadResponse)
      } else {
        alert("Something Wrong with seleted items and dates!! Please reload the web.");
      }
    }.bind(this))
    
  }

  render() {
    var isShow;
    if (this.state.isShowTimeTable) {
        isShow = (<div id = "TimeTable">  
                    <TimeTable 
                        frontDate={this.state.selectedDays}
                        item={this.state.selectedItemIIDs}
                        id2item={this.state.id2item}
                        statusReadResponse={this.state.statusReadResponse}
                        uid={this.props.uid}
                        token={this.props.token}
                    />
                  </div>);
    }

    return (
      <table width="100%">
        <tbody>
          <tr>
            <td id = "ItemList" width="50%">
            	<ItemList 
            		choosedItems = {this.toggleItemList}
            		selectedItems = {this.state.selectedItems}
            		item = {this.state.item}
                restoreItems = {this.restoreItems}
            	/>
            </td>
            <td id = "Calendar" width="50%">   
              <Calendar
                onChangeMonth={(date) => this.setState({date})}
                date = {this.state.date}
                choosedDays = {this.toggleCalendar}
                selectedDays = {this.state.selectedDays}
              />
            </td>
          </tr>
          <tr>
            <td id="Calendar-button">
              <button onClick = {this.sendDateId} id = "sendDateId" disabled = {this.state.disabled}>
                Enter
              </button>
            </td>
          </tr>
          <tr>
            <td>
              {isShow}
            </td>
          </tr>
        </tbody>
      </table>
    );
  }
}