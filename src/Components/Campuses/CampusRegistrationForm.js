import React, {Component} from 'react';
import {connect} from 'react-redux';
import {createCampus} from '../../Actions';
import axios from 'axios';
import {Redirect} from 'react-router';
import campus_image_1 from '../../Styles/Images/standard_university_image_1.png';
import '../../Styles/Students/StudentRegistrationForm.css'; //same style as students

class CampusRegistrationForm extends Component{

    constructor(props){
        super(props)

        this.state = {
            name: "",
            address: "",
            newCampusId: -1,
            registered: false,
            nameErrors: <div/>,
            addressErrors: <div/>
        }

        this.handleRegistration = this.handleRegistration.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
    }

    handleInputChange(event){
        this.setState({
            [event.target.name]: event.target.value
        })
    }


    async handleRegistration(event){
        event.preventDefault();

        let errorFound = false;

        if (this.state.name.length === 0){
            this.setState({
                nameErrors: <div className="standard-error-message">Campus Name cannot be blank</div>
            })
            errorFound = true;
        }
        else{
            this.setState({nameErrors: <div/>})
        }

        if (this.state.address.length === 0){
            this.setState({
                addressErrors: <div className="standard-error-message">Campus Address cannot be blank</div>
            })
            errorFound = true;
        }
        else{
            this.setState({nameErrors: <div/>})
        }

        if (errorFound){
            return
        }

        let newCampus = {
            name: this.state.name,
            address: this.state.address,
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
                    <input className="registration-input" type = "text" name = "name" onChange={this.handleInputChange}/>
                    <label className="registration-label">Campus Address</label>
                    <input className="registration-input" type = "text" name = "address" onChange={this.handleInputChange}/>
                    <input className="complete-registration-button" type="submit" value="Add Campus"/>
                </form>
                {this.state.nameErrors}
                {this.state.addressErrors}
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