import React, {Component} from 'react';
import '../Styles/Homepage.css';
import Logo from '../Styles/Images/university_logo.jpg';

//Initial landing page
class Homepage extends Component{
    render(){
        return(
            <div className="Homepage">
                <div className="homepage-text">Welcome to our Student and Campus Manager</div>
                <img src = {Logo} alt ="Logo" class = "center"
                height = {700}
                width = {700}
                />

            </div>
        );
    }
}


export default Homepage;

