import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import {deleteCampus} from '../../Actions';
import SingleCampusViewStudentCard from './SingleCampusViewStudentCard.js';
import '../../Styles/Campuses/SingleCampusView.css';

class SingleCampusView extends Component{
    constructor(props){
        super(props)

        this.removeCampus = this.removeCampus.bind(this);
    }

    removeCampus(){
        //axios delete
        //then ()
        this.props.deleteCampus(this.props.campus)
    }

    render(){

        let studentsOnCampus = this.props.students.filter(student => (student.campusId === this.props.campus.id));
        let studentsOnCampusText = "Student on Campus";
        if (studentsOnCampus.length === 0){
            studentsOnCampusText = "This campus has no students."
        }

        return(
            <div className="single-campus-main">
                <div className="single-campus-view-container">
                <img className="single-campus-image" src = {this.props.campus.image} alt="campus"/>
                    <div className="single-campus-view-text-section">
                        <Link className="single-campus-view-edit-link" to = {"/campuses/" + this.props.campus.id + "/edit/"}>
                            <button className="single-campus-view-edit-button">
                                Edit
                            </button>
                        </Link>
                        <div className="single-campus-view-name">
                            {this.props.campus.name}
                        </div>
                        <div className="single-campus-view-address">
                            Address: {this.props.campus.address}
                        </div>
                        <div className="single-campus-view-description">
                            {this.props.campus.description}
                        </div>
                        <button className="single-campus-view-delete-button" onClick={this.removeCampus}>
                            Delete
                        </button>
                    </div>
                </div>
                <div className="single-campus-view-students-on-campus-conatiner">
                    <div className="add-students-and-header">
                        <div className="students-on-campus-text">
                            {studentsOnCampusText}
                        </div>
                        <div className="add-students-edit-section">
                            <Link className="add-students-edit-link" to = {"/campuses/" + this.props.campus.id + "/edit/"}>
                                <button className="add-students-edit-button">
                                    Add Students
                                </button>
                            </Link>
                        </div>
                    </div>
                    <div className="students-on-campus-list">
                        {studentsOnCampus.map(student => (
                            <SingleCampusViewStudentCard studentCampusName={this.props.campus.name} student={student}/>
                        ))}
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
      deleteCampus
  })(SingleCampusView);