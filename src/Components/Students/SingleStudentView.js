import React, {PureComponent} from 'react';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import {updateStudent, deleteStudent} from '../../Actions';
import SingleStudentViewCampusCard from './SingleStudentViewCampusCard.js';
import '../../Styles/Students/SingleStudentView.css';

class SingleStudentView extends PureComponent{
    constructor(props){
        super(props)

        this.state = {
            selectedCampus: this.props.student.campusId
        }

        this.submitCampusSelection = this.submitCampusSelection.bind(this);
        this.handleDelete = this.handleDelete.bind(this);
        this.handleCampusSelection = this.handleCampusSelection.bind(this);
        this.removeCampusFromStudent = this.removeCampusFromStudent.bind(this);
    }

    handleDelete(){
        //axios delete
        //.then()
        this.props.deleteStudent(this.props.student);
    }

    handleCampusSelection(event){
        this.setState({
            selectedCampus: event.target.value
        })
    }

    submitCampusSelection(){
        let updatedStudent = this.props.student;
        updatedStudent.campusId = parseInt(this.state.selectedCampus)
        this.props.updateStudent(updatedStudent)
        //PUT request here
        this.forceUpdate();
    }

    removeCampusFromStudent(){
        let updatedStudent = this.props.student;
        updatedStudent.campusId = -1;
        this.props.updateStudent(updatedStudent)
        //PUT request here
        this.forceUpdate();
    }

    render(){
        let studentCampus = this.props.campuses.filter(campus => (this.props.student.campusId === campus.id));
        let allOtherCampuses = this.props.campuses.filter(campus => (this.props.student.campusId !== campus.id));

        return(
            <div className="single-student-main">
                <div className="single-student-view-container">
                    <img className="single-student-image" src = {this.props.student.image} alt="student"/>
                    <div className="single-student-view-text-section">
                        <Link className="single-student-view-edit-link" to = {"/students/" + this.props.student.id + "/edit/"}>
                            <button className="single-student-view-edit-button">
                                Edit
                            </button>
                        </Link>
                        <div className="single-student-view-name">
                            {this.props.student.name}
                        </div>
                        <div className="single-student-view-gpa">
                            GPA: {this.props.student.gpa}
                        </div>
                        <div className="single-student-view-email">
                            Email: {this.props.student.email}
                        </div>
                        <button className="single-student-view-delete-button" onClick={this.handleDelete}>
                            Delete
                        </button>
                    </div>
                </div>
                <div className="student-campus-section">
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