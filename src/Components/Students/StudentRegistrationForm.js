import React, {Component} from 'react';
import {connect} from 'react-redux';
import {createStudent} from '../../Actions';
import {Redirect} from 'react-router';
import student_image_1 from '../../Styles/Images/standard_student_image_1.jpeg';
import '../../Styles/Students/StudentRegistrationForm.css';

class StudentRegistrationForm extends Component{
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

        let newStudent = {
            name: this.state.name,
            image: student_image_1
        }

        this.props.createStudent(newStudent);

        //here get the id of a new student to redirect to that student's page

        this.setState({registered: true})
    }

    render(){
        
        /* UNCOMMENT WHEN DB IS SET UP AND WE CAN GET THE ID OF A NEW STUDENT */

        // if (this.state.registered){
        //     return(
        //         <Redirect to = {"/students/" + this.state.newStudentId}/>
        //     );
        // }

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