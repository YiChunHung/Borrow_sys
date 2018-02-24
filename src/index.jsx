import React from 'react';
import ReactDOM from 'react-dom';

import Main from 'components/Main.jsx';
import LoginPage from 'components/LoginPage.jsx';
import 'bootstrap/dist/css/bootstrap.css';

window.onload = function() {
    ReactDOM.render(
        <div>
        	{/*
            	<LoginPage />
        	*/}
        	<Main uid={1} token={"PiKoSivltx"}/>
        </div>,
        document.getElementById('root')
    );
};
