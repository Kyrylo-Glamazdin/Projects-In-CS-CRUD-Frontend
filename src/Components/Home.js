import React, {Component} from 'react';
import {Link} from 'react-router-dom';

class Home extends Component{
    render(){
        return(
            <div>
                <Link to="/">Home</Link>
                <Link to="/campuses">Manage Campuses</Link>
                <Link to="/students">Manage Students</Link>
            </div>
        );
    }
}

export default Home;