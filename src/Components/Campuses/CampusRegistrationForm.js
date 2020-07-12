import React, {Component} from 'react';
import {connect} from 'react-redux';
import {createCampus} from '../../Actions';
import {Redirect} from 'react-router';
import campus_image_1 from '../../Styles/Images/standard_university_image_1.png';

class CampusRegistrationForm extends Component{
    constructor(props){
        super(props)

        this.state = {
            name: "",
            registered: false
        }

        this.handleRegistration = this.handleRegistration.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
    }

    handleInputChange(event){
        this.setState({name: event.target.value})
    }

    handleRegistration(event){
        event.preventDefault();

        let newCampus = {
            name: this.state.name,
            image: campus_image_1
        }

        this.props.createCampus(newCampus);

        //here get the id of a new campus to redirect to that campus's page

        this.setState({registered: true})
    }

    render(){
        
        /* UNCOMMENT WHEN DB IS SET UP AND WE CAN GET THE ID OF A NEW CAMPUS */

        // if (this.state.registered){
        //     return(
        //         <Redirect to = {"/campuses/" + this.state.newCampusId}/>
        //     );
        // }

        return(
            <div>
                <div>Add a New Campus
                </div>
                <form onSubmit={this.handleRegistration}>
                    <label>Campus Name</label>
                    <input type = "text" onChange={this.handleInputChange}/>
                    <input type="submit" value="Add Campus"/>
                </form>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return{
    };
  }
  
  export default connect (mapStateToProps, {
      createCampus
  })(CampusRegistrationForm);