import React from 'react';
import TopBar from 'components/TopBar.jsx'

export default class Main extends React.Component {

  constructor(props) {
        super(props);
        this.state = {
          pageNum:1
        }
        this.handleChangePage = this.handleChangePage.bind(this);
  }

  handleChangePage(val){
    this.setState({pageNum:val});
  }


  render(){
    return(
      <TopBar onUpdate={this.handleChangePage}/>
    );
  }
}