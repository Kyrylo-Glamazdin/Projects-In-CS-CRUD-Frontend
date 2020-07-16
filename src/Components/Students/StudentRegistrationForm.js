import React, {Component} from 'react';
import {connect} from 'react-redux';
import {createStudent} from '../../Actions';
import {Redirect} from 'react-router';
import axios from 'axios';
import student_image_1 from '../../Styles/Images/standard_student_image_1.jpeg';
import '../../Styles/Students/StudentRegistrationForm.css';

//form for registering a new student
class StudentRegistrationForm extends Component{
    constructor(props){
        super(props)

        //default values are blank
        this.state = {
            firstName: "",
            lastName: "",
            email: "",
            newStudentId: -1,
            registered: false,
            nameErrors: <div/>,
            emailErrors: <div/>
        }

        this.handleRegistration = this.handleRegistration.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
    }

    handleInputChange(event){
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    //function for submitting the registration form
    async handleRegistration(event){
        event.preventDefault();

        let errorFound = false;

        //validate input for student's name
        if (this.state.firstName.length === 0 || this.state.lastName.length === 0){
            //display an error if name is incorrect
            this.setState({
                nameErrors: <div className="standard-error-message">Student first or last name cannot be blank</div>
            })
            errorFound = true;
        }
        else{
            this.setState({nameErrors: <div/>})
        }

        //validate input for student's email
        if (this.state.email.length === 0){
            //display an error if email is incorrect
            this.setState({
                emailErrors: <div className="standard-error-message">Email field must contain a valid email</div>
            })
            errorFound = true;
        }
        else{
            this.setState({emailErrors: <div/>})
        }

        //prevent the form from submitting if there's input errors
        if (errorFound){
            return
        }

        let newStudent = {
            firstName: this.state.firstName,
            lastName: this.state.lastName,
            email: this.state.email,
            image: student_image_1
        }

        //axios request to create a new student
        //here get the id of a new student to redirect to that student's page
        await axios.post("http://localhost:4200/api/students", newStudent)
        .then(res => {
            let createdStudent = res.data;
            this.setState({
                newStudentId: createdStudent.id,
                registered: true
            })
            this.props.createStudent(createdStudent);
        })
        .catch(err => {
            console.log(err)
        })
    }

    render(){
        //redirect if student was successfully registered
        if (this.state.registered && this.state.newStudentId !== -1){
            return(
                <Redirect to = {"/students/" + this.state.newStudentId}/>
            );
        }

        //display the forms
        return(
            <div className="registration-form-container">
                <div className="registration-header">Register a New Student
                </div>
                {/* form */}
                <form className="registration-form" onSubmit={this.handleRegistration}>
                    <label className="registration-label">First Name</label>
                    <input className="registration-input" type = "text" name ="firstName" onChange={this.handleInputChange}/>
                    <label className="registration-label">Last Name</label>
                    <input className="registration-input" type = "text" name ="lastName" onChange={this.handleInputChange}/>
                    <label className="registration-label">Email</label>
                    <input className="registration-input" type = "email" name ="email" onChange={this.handleInputChange}/>
                    <input className="complete-registration-button" type="submit" value="Add Student"/>
                </form>
                {/* input errors */}
                {this.state.nameErrors}
                {this.state.emailErrors}
            </div>
        );
    }
}

const mapStateToProps = state => {
    return{
    };
  }
  
  export default connect (mapStateToProps, {
      createStudent
  })(StudentRegistrationForm);