import React, {PureComponent} from 'react';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import axios from 'axios';
import {updateStudent, deleteStudent} from '../../Actions';
import SingleStudentViewCampusCard from './SingleStudentViewCampusCard.js';
import '../../Styles/Students/SingleStudentView.css';

//component for displaying all of the student-related information
class SingleStudentView extends PureComponent{
    constructor(props){
        super(props)

        this.state = {
            selectedCampus: this.props.student.campusId
        }

        //bindings
        this.submitCampusSelection = this.submitCampusSelection.bind(this);
        this.handleDelete = this.handleDelete.bind(this);
        this.handleCampusSelection = this.handleCampusSelection.bind(this);
        this.removeCampusFromStudent = this.removeCampusFromStudent.bind(this);
    }

    //function that deletes student from the database
    handleDelete(){
        //delete from the database, then from the redux store
        axios.delete("http://localhost:4200/api/students/" + this.props.student.id)
        .then(() => {
            this.props.deleteStudent(this.props.student);
        })
        .catch(err => {
            console.log(err)
        })
    }

    handleCampusSelection(event){
        this.setState({
            selectedCampus: event.target.value
        })
    }

    //function for registering student at a certain campus
    async submitCampusSelection(){
        let updatedStudent = this.props.student;
        updatedStudent.campusId = parseInt(this.state.selectedCampus)
        this.props.updateStudent(updatedStudent)
        await axios.put("http://localhost:4200/api/students/" + updatedStudent.id, updatedStudent)
        .catch(err => {
            console.log(err);
        })
        this.forceUpdate();
    }

    //function for removing a student from campus
    async removeCampusFromStudent(){
        let updatedStudent = this.props.student;
        updatedStudent.campusId = null;
        this.props.updateStudent(updatedStudent)
        await axios.put("http://localhost:4200/api/students/" + updatedStudent.id, updatedStudent)
        .catch(err => {
            console.log(err);
        })
        this.forceUpdate();
    }

    render(){
        //find campus that the student is registered in
        let studentCampus = this.props.campuses.filter(campus => (this.props.student.campusId === campus.id));
        //find all other campuses for the campus selection dropdown
        let allOtherCampuses = this.props.campuses.filter(campus => (this.props.student.campusId !== campus.id));

        return(
            <div className="single-student-main">
                {/* student info */}
                <div className="single-student-view-container">
                    <img className="single-student-image" src = {this.props.student.image} alt="student"/>
                    <div className="single-student-view-text-section">
                        <Link className="single-student-view-edit-link" to = {"/students/" + this.props.student.id + "/edit/"}>
                            <button className="single-student-view-edit-button">
                                Edit
                            </button>
                        </Link>
                        <div className="single-student-view-name">
                            {this.props.student.firstName} {this.props.student.lastName}
                        </div>
                        <div className="single-student-view-gpa">
                            GPA: {this.props.student.gpa}
                        </div>
                        <div className="single-student-view-email">
                            Email: {this.props.student.email}
                        </div>
                        <Link to = {"/students/"}>
                        <button className="single-student-view-delete-button" onClick={this.handleDelete}>
                            Delete
                        </button>
                        </Link>
                    </div>
                </div>
                <div className="student-campus-section">
                    {/* campus info */}
                    <div className="student-selected-campus">
                        <SingleStudentViewCampusCard campus={studentCampus}/>
                    </div>
                    <div className="student-select-campus-section">
                        <select className="student-select-campus-dropdown" onChange={this.handleCampusSelection}>
                            <option value={this.state.selectedCampus} selected hidden> 
                                Select Campus
                            </option> 
                            {allOtherCampuses.map(campusDropdown => (
                                <option key = {"campusDropdown" + campusDropdown.id} value={campusDropdown.id}>
                                    {campusDropdown.name}
                                </option>
                            ))}
                        </select>
                        <button className="student-select-campus-button" onClick={this.submitCampusSelection}>
                            Change Campus
                        </button>
                        <button className="student-remove-campus-button" onClick={this.removeCampusFromStudent}>
                            Remove Campus from Student
                        </button>
                    </div>
                </div>
            </div>    
        );
    }
}

const mapStateToProps = state => {
    return{
        campuses: state.campuses
    };
  }
  
  export default connect (mapStateToProps, {
      updateStudent,
      deleteStudent
  })(SingleStudentView);