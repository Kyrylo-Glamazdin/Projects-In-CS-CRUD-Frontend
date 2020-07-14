import React, {Component} from 'react';
import {connect} from 'react-redux';
import {createCampus} from '../../Actions';
import axios from 'axios';
import {Redirect} from 'react-router';
import campus_image_1 from '../../Styles/Images/standard_university_image_1.png';
import '../../Styles/Students/StudentRegistrationForm.css'; //same as for campuses

class CampusRegistrationForm extends Component{

    constructor(props){
        super(props)

        this.state = {
            name: "",
            newCampusId: -1,
            registered: false
        }

        this.handleRegistration = this.handleRegistration.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
    }

    handleInputChange(event){
        this.setState({name: event.target.value})
    }


    async handleRegistration(event){
        event.preventDefault();

        let newCampus = {
            name: this.state.name,
            image: campus_image_1
        }

        //here get the id of a new campus to redirect to that campus's page
        await axios.post("http://localhost:4200/api/campuses", newCampus)
        .then(res => {
            let createdCampus = res.data;
            this.setState({
                newCampusId: createdCampus.id,
                registered: true
            })
            this.props.createCampus(createdCampus);
        })
        .catch(err => {
            console.log(err)
        })
    }

    render(){
        if (this.state.registered && this.state.newCampusId !== -1){
            return(
                <Redirect to = {"/campuses/" + this.state.newCampusId}/>
            );
        }

        return(
            <div className="registration-form-container">
                <div className="registration-header">
                    Add a New Campus
                </div>
                <form className="registration-form" onSubmit={this.handleRegistration}>
                    <label className="registration-label">Campus Name</label>
                    <input className="registration-input" type = "text" onChange={this.handleInputChange}/>
                    <input className="complete-registration-button" type="submit" value="Add Campus"/>
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