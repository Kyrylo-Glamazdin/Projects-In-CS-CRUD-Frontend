import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import '../../Styles/Students/StudentCard.css';

class StudentCard extends Component{
    render(){
        //finding this student's campus
        let studentCampus = this.props.campuses.filter(campus => (this.props.student.campusId === campus.id));

        let studentCampusName = "No Campus"; //default campus value if campus not found
        if (studentCampus.length > 0){
            studentCampusName = studentCampus[0].name
        }
        return(
            <div className="student-card-container">
                <img className="student-card-image" src = {this.props.student.image} alt="student"/>
                <div className="student-text-section">
                    <div className="student-card-name">
                        {this.props.student.firstName}
                    </div>
                    <div className="student-card-name">
                        {this.props.student.lastMame}
                    </div>
                    <div className="student-card-gpa">
                        GPA: {this.props.student.gpa}
                    </div>
                    <div className="student-card-email">
                        Email: {this.props.student.email}
                    </div>
                    <div className="student-card-campus">
                        Student at: {studentCampusName}
                    </div>
                    <div className="student-card-buttons">
                        <Link className="student-card-view-link" to = {"/students/" + this.props.student.id}>
                            <button className="student-card-view-button">
                                View
                            </button>
                        </Link>
                        <Link className="student-card-view-link-edit" to = {"/students/" + this.props.student.id + "/edit"}>
                            <button className="student-card-view-button-edit">
                                Edit
                            </button>
                        </Link>
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
  })(StudentCard);