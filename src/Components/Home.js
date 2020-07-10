import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import '../Styles/Home.css';

class Home extends Component{
    render(){
        return(
            <div className="navbar-container">
                <Link className="navbar-link-left" to="/">Home</Link>
                <div className="option-buttons"> 
                    <Link className="navbar-link-right" to="/campuses">Manage Campuses</Link>
                    <Link className="navbar-link-right" to="/students">Manage Students</Link>
                </div>
            </div>
        );
    }
}

export default Home;