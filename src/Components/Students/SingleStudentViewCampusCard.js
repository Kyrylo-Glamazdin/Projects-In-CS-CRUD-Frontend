import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import '../../Styles/Students/SingleStudentViewCampusCard.css';

//component for displaying campus-related info on student's single view profile
class SingleStudentViewCampusCard extends Component{
    render(){
        if (this.props.campus.length > 0){
            //calculate the number of students
            let numOfStudents = 0;
            for (let i = 0; i < this.props.students.length; i++){
                if (this.props.students[i].campusId === this.props.campus[0].id){
                    numOfStudents++;
                }
            }
            let numOfStudentsText = "";
            if (numOfStudents === 1){
                numOfStudentsText = "1 Student"
            }
            else{
                numOfStudentsText = numOfStudents + " Students";
            }

            //show campus-related info
            return(
                <div>
                    <div className="registered-indicator-text">
                        This student is registered to a campus
                    </div>
                    <div className="student-view-campus-card">
                        <img className="student-view-campus-image" src = {this.props.campus[0].image} alt="campus" />
                        <div className="student-view-campus-text-section">
                            <div className="student-view-campus-name">
                                {this.props.campus[0].name}
                            </div>
                            <div className="student-view-campus-capacity">
                                {numOfStudentsText}
                            </div>
                            <Link className="student-view-campus-edit-link" to = {"/campuses/" + this.props.campus[0].id}>
                                <button className="student-view-campus-button">View</button>
                            </Link>
                            <Link className="student-view-campus-edit-link" to = {"/campuses/" + this.props.campus[0].id + "/edit/"}>
                                <button className="student-view-campus-edit-button">Edit</button>
                            </Link>
                        </div>
                    </div>
                </div>
            );
        }
        else{
            //show that the student is not registered in a campus
            return(
                <div className="registered-indicator-text">
                    This student is not registered to a campus
                </div>
            );
        }
    }
}

const mapStateToProps = state => {
    return{
        students: state.students
    };
  }
  
  export default connect (mapStateToProps, {
    //   updateStudent
  })(SingleStudentViewCampusCard);