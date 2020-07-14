import React, {Component} from 'react';
import {connect} from 'react-redux';
import {createStudent} from '../../Actions';
import {Redirect} from 'react-router';
import axios from 'axios';
import student_image_1 from '../../Styles/Images/standard_student_image_1.jpeg';
import '../../Styles/Students/StudentRegistrationForm.css';

class StudentRegistrationForm extends Component{
    constructor(props){
        super(props)

        this.state = {
            name: "",
            newStudentId: -1,
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

        let newStudent = {
            name: this.state.name,
            image: student_image_1
        }

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
        if (this.state.registered && this.state.newStudentId !== -1){
            return(
                <Redirect to = {"/students/" + this.state.newStudentId}/>
            );
        }

        return(
            <div className="registration-form-container">
                <div className="registration-header">Register a New Student
                </div>
                <form className="registration-form" onSubmit={this.handleRegistration}>
                    <label className="registration-label">Student Name</label>
                    <input className="registration-input" type = "text" onChange={this.handleInputChange}/>
                    <input className="complete-registration-button" type="submit" value="Add Student"/>
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
      createStudent
  })(StudentRegistrationForm);