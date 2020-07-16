import React, {Component} from 'react';
import {connect} from 'react-redux';
import {updateStudent} from '../../Actions';
import {Redirect} from 'react-router';
import axios from 'axios';
import '../../Styles/Students/StudentEditForm.css';

class StudentEditForm extends Component{
    constructor(props){
        super(props)

        this.state = {
            firstName: this.props.student.firstName,
            lastName: this.props.student.lastName,
            gpa: this.props.student.gpa,
            email: this.props.student.email,
            image: this.props.student.image,
            nameErrors: <div/>,
            emailErrors: <div/>,
            gpaErrors: <div/>,
            edited: false
        }

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event){
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    handleSubmit(event){
        event.preventDefault();

        let errorFound = false;

        if (this.state.firstName.length === 0 || this.state.lastName.length === 0){
            this.setState({
                nameErrors: <div className="standard-error-message">Student first or last name cannot be blank</div>
            })
            errorFound = true;
        }
        else{
            this.setState({nameErrors: <div/>})
        }

        if (this.state.email.length === 0){
            this.setState({
                emailErrors: <div className="standard-error-message">Email field must contain a valid email</div>
            })
            errorFound = true;
        }
        else{
            this.setState({emailErrors: <div/>})
        }

        if (parseFloat(this.state.gpa) < 0 || parseFloat(this.state.gpa) > 4){
            this.setState({
                gpaErrors: <div className="standard-error-message">GPA must be a number between 0.0 and 4.0</div>
            })
            errorFound = true;
        }
        else{
            this.setState({gpaErrors: <div/>})
        }

        if (errorFound){
            return
        }

        let updatedStudent = this.props.student;
        if (this.state.image !== ""){
            updatedStudent.image = this.state.image
        }
        
        updatedStudent.firstName = this.state.firstName;
        updatedStudent.lastName = this.state.lastName;
        updatedStudent.gpa = this.state.gpa;
        updatedStudent.email = this.state.email;

        this.props.updateStudent(updatedStudent)
        axios.put("http://localhost:4200/api/students/" + this.props.student.id, updatedStudent)
        .then(() => {
            this.setState({edited: true})
        })
        .catch(err => {
            console.log(err);
        })
    }

    render(){
        if (this.state.edited){
            return(
                <Redirect to={"/students/" + this.props.student.id}/>
            );
        }
        return(
            <div className="student-edit-form-container">
                <div className="student-edit-header">Edit Student
                </div>
                <form className="student-edit-form-container" onSubmit={this.handleSubmit}>
                    <div className="input-section">
                        <label className="student-edit-label">Fist Name</label>
                        <input className="student-edit-input" type="text" name="firstName" value={this.state.firstName} onChange={this.handleChange}/>
                    </div>
                    <div className="input-section">
                        <label className="student-edit-label">Last Name</label>
                        <input className="student-edit-input" type="text" name="lastName" value={this.state.lastName} onChange={this.handleChange}/>
                    </div>
                    <div className="input-section">
                        <label className="student-edit-label">GPA</label>
                        <input className="student-edit-input" type="number" step="0.01" name="gpa" value={this.state.gpa} onChange={this.handleChange}/>
                    </div>
                    <div className="input-section">
                        <label className="student-edit-label">Email</label>
                        <input className="student-edit-input" type="email" name="email" value={this.state.email} onChange={this.handleChange}/>
                    </div>
                    <div className="input-section">
                        <label className="student-edit-label">New Student Image</label>
                        <input className="student-edit-input" type="text" name="image" value={this.state.image} onChange={this.handleChange}/>
                    </div>
                    <input className="edit-submit-button" type="submit" value="Save Changes"/>
                </form>
                {this.state.nameErrors}
                {this.state.emailErrors}
                {this.state.gpaErrors}
            </div>
        );
    }
}

const mapStateToProps = state => {
    return{
    };
  }
  
  export default connect (mapStateToProps, {
      updateStudent,
  })(StudentEditForm);