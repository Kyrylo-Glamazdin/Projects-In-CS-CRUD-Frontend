import React, {Component} from 'react';
import {connect} from 'react-redux';
import {updateCampus, updateStudent} from '../../Actions';
import {Redirect} from 'react-router';
import axios from 'axios';
import EditCampusStudentList from './EditCampusStudentList.js';
import '../../Styles/Campuses/CampusEditForm.css';

class CampusEditForm extends Component{
    constructor(props){
        super(props)

        this.state = {
            name: this.props.campus.name,
            address: this.props.campus.address,
            description: this.props.campus.description,
            image: "",
            nameErrors: <div/>,
            selectedStudent: -1,
            edited: false
        }

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleStudentSelection = this.handleStudentSelection.bind(this);
        this.submitStudentSelection = this.submitStudentSelection.bind(this);
        this.removeFromCampus = this.removeFromCampus.bind(this);
    }

    handleChange(event){
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    handleSubmit(event){
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

        if (errorFound){
            return
        }

        let updatedCampus = this.props.campus;
        if (this.state.image !== ""){
            updatedCampus.image = this.state.image
        }
        
        updatedCampus.name = this.state.name;
        updatedCampus.address = this.state.address;
        updatedCampus.description = this.state.description;

        this.props.updateCampus(updatedCampus)
        axios.put("http://localhost:4200/api/campuses/" + this.props.campus.id, updatedCampus)
        .then(() => {
            this.setState({edited: true})
        })
        .catch(err => {
            console.log(err);
        })
    }

    handleStudentSelection(event){
        this.setState({
            selectedStudent: event.target.value
        })
    }

    async submitStudentSelection(){
        if (this.state.selectedStudent === -1){
            return
        }

        let updatedStudentArray = this.props.students.filter(student => (student.id === parseInt(this.state.selectedStudent)));
        if (updatedStudentArray.length === 0){
            return
        }
        let updatedStudent = updatedStudentArray[0];
        updatedStudent.campusId = parseInt(this.props.campus.id)
        this.props.updateStudent(updatedStudent)
        await axios.put("http://localhost:4200/api/students/" + updatedStudent.id, updatedStudent)
        .catch(err => {
            console.log(err);
        })
        this.forceUpdate();
    }

    async removeFromCampus(student){
        let updatedStudent = student;
        updatedStudent.campusId = null;
        this.props.updateStudent(updatedStudent);
        await axios.put("http://localhost:4200/api/students/" + updatedStudent.id, updatedStudent)
        .catch(err => {
            console.log(err);
        })
        this.forceUpdate();
    }

    render(){
        if (this.state.edited){
            return(
                <Redirect to={"/campuses/" + this.props.campus.id}/>
            );
        }

        let studentsOnCampus = this.props.students.filter(student => (student.campusId === this.props.campus.id));
        let allOtherStudents = this.props.students.filter(student => (student.campusId !== this.props.campus.id));

        return(
            <div className="campus-edit-form-container">
                <div className="campus-edit-header">Edit Campus
                </div>
                <form className="campus-edit-form-container" onSubmit={this.handleSubmit}>
                    <div className="input-section">
                        <label className="campus-edit-label">Campus Name</label>
                        <input className="campus-edit-input" type="text" name="name" value={this.state.name} onChange={this.handleChange}/>
                    </div>
                    <div className="input-section">
                        <label className="campus-edit-label">Location</label>
                        <input className="campus-edit-input" type="text" name="address" value={this.state.address} onChange={this.handleChange}/>
                    </div>
                    <div className="input-section">
                        <label className="campus-edit-label">New Campus Image</label>
                        <input className="campus-edit-input" type="text" name="image" value={this.state.image} onChange={this.handleChange}/>
                    </div>
                    <div className="input-section">
                        <label className="campus-edit-label">Description</label>
                        <textarea className="campus-edit-description-input" type="text" name="description" value={this.state.description} onChange={this.handleChange}/>
                    </div>
                    <input className="campus-edit-submit-button" type="submit" value="Save Changes"/>
                </form>
                {this.state.nameErrors}
                <div className="campus-edit-form-student-section">
                    <div className="campus-edit-header">
                        Students On Campus
                    </div>
                    <div className="edit-campus-student-selection-section">
                        <select className="edit-campus-select-student-dropdown" onChange={this.handleStudentSelection}>
                            <option value={this.state.selectedStudent} selected hidden> 
                                Select Student
                            </option> 
                            {allOtherStudents.map(studentDropdown => (
                                <option key = {"studentDropdown" + studentDropdown.id} value={studentDropdown.id}>
                                    {studentDropdown.firstName} {studentDropdown.lastName}
                                </option>
                            ))}
                        </select>
                        <button className="edit-campus-select-student-button" onClick={this.submitStudentSelection}>
                            Add to Campus
                        </button>
                    </div>
                    <div className="edit-campus-list-of-students-section">
                        <EditCampusStudentList studentsOnCampus={studentsOnCampus} removeFromCampus={this.removeFromCampus}/>
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return{
        students: state.students
    };
  }
  
  export default connect (mapStateToProps, {
      updateCampus,
      updateStudent
  })(CampusEditForm);