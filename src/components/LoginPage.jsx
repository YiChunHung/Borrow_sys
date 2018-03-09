import React from 'react';
import config from 'components/config.json';
import axios from 'axios';
import Main from 'components/Main.jsx';
import { Navbar, NavbarBrand } from 'reactstrap';
import 'components/LoginPage.css'

export default class LoginPage extends React.Component{

	constructor(props){
		super(props);
		this.handleClick = this.handleClick.bind(this);
		this.handleLogin = this.handleLogin.bind(this);
		this.state = {
			isLogin : false,
			uid : "",
			token: ""
		}
	}

	handleLogin(){
		if (this.state.isLogin) {
			return(
				<Main uid={this.state.uid} token={this.state.token}/>
			)
		} else {
			return(
				<div>
					<Navbar color="faded" light expand="md">
			        	<NavbarBrand >YRG</NavbarBrand>
			        </Navbar>
					<form className="login">
						Username：<br/>
					  	<input type="text" id="username" placeholder="your username"/><br/>

					  	Password：<br/>
					  	<input type="password" id="password" placeholder="your password"/><br/><br/>
					  	<button type="button" id="loginbutton" onClick={this.handleClick}>Login</button>
					</form>
				</div>	
			)
		}
	}


	handleClick(){
		var user = document.getElementById('username');
		var pwd = document.getElementById('password');
		//console.log(user.value);
		//console.log(pwd.value);
		
		axios({
			method:'get',
			url: '/auth/login',
			baseURL:config.baseURL+config.port+config.prefix,
			params:{
				username: user.value,
				password: pwd.value
			}
		}).then(function(response){
			console.log(response);
			if (!response.data.validation) {
				this.setState({
					isLogin : true,
					uid : response.data.payload[0].uid,
					token: response.data.payload[0].token
				});
			} else {
				alert("Login Fail!");
			}
		}.bind(this));
		//console.log(this.state)
	}

	render(){
		return(
			<div>
				{this.handleLogin()}
			</div>
		)
	}
}
