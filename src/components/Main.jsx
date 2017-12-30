import React from 'react';
import TopBar from 'components/TopBar.jsx'
import { Collapse, Navbar, NavbarToggler, NavbarBrand, Nav, NavItem, NavLink } from 'reactstrap';
import Borrowpage from 'components/Borrowpage.jsx'

export default class Main extends React.Component {

  constructor(props) {
        super(props);
        this.state = {
          pageNum:1
        }
        this.handleChangePage = this.handleChangePage.bind(this);
  		this.switchPage = this.switchPage.bind(this);
  }

  handleChangePage(val){
    this.setState({pageNum:val});
  }

  switchPage(){ 	
  	if (this.state.pageNum==2){
  		return (
  			<Borrowpage />
  		)
  	}
  }


  render(){

    return(
    	<div>
      		<TopBar onUpdate={this.handleChangePage}/>
      		{this.switchPage()}
      	</div>
    );
  }
}