import React from 'react';
import TopBar from 'components/TopBar.jsx'
import { Collapse, Navbar, NavbarToggler, NavbarBrand, Nav, NavItem, NavLink } from 'reactstrap';
import LoginPage from 'components/LoginPage.jsx'
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
    console.log(this.props.token);
  	if (this.state.pageNum==2){
  		return (
    		<Borrowpage uid={this.props.uid} token={this.props.token} />
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