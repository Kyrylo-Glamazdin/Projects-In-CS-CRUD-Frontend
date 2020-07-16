import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import '../../Styles/Campuses/SingleCampusViewStudentCard.css';

class SingleCampusViewStudentCard extends Component{
    render(){
        return(
            <div className="single-campus-student-card-container">
                <img className="single-campus-student-card-image" src = {this.props.student.image} alt="student"/>
                <div className="single-campus-student-text-section">
                    <div className="single-campus-student-card-name">
                        {this.props.student.firstName} {this.props.student.lastName}
                    </div>
                    <div className="single-campus-student-card-gpa">
                        GPA: {this.props.student.gpa}
                    </div>
                    <div className="single-campus-student-card-email">
                        Email: {this.props.student.email}
                    </div>
                    <div className="single-campus-student-card-campus">
                        Student at: {this.props.studentCampusName}
                    </div>
                    <div className="single-campus-student-card-buttons">
                        <Link className="single-campus-student-card-view-link" to = {"/students/" + this.props.student.id}>
                            <button className="single-campus-student-card-view-button">
                                View
                            </button>
                        </Link>
                        <Link className="single-campus-student-card-view-link-edit" to = {"/students/" + this.props.student.id + "/edit"}>
                            <button className="single-campus-student-card-view-button-edit">
                                Edit
                            </button>
                        </Link>
                    </div>
                </div>
            </div>
        );
    }
}
  
export default SingleCampusViewStudentCard;