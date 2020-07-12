import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import '../../Styles/Campuses/CampusCard.css';

class CampusCard extends Component{
    render(){
        let studentsInCampus = this.props.students.filter(student => (student.campusId === this.props.campus.id));
        let numOfStudentsText = "";
        if (studentsInCampus.length === 1){
            numOfStudentsText = "1 Student";
        }
        else{
            numOfStudentsText = studentsInCampus.length + " Students";
        }

        return(
            <div className="campus-card-container">
                <img className="campus-card-image" src = {this.props.campus.image} alt="campus"/>
                <div className="campus-text-section">
                    <div className="campus-card-name">
                        {this.props.campus.name}
                    </div>
                    <div className="campus-card-num-of-students">
                        {numOfStudentsText}
                    </div>
                    <div className="campus-card-buttons">
                        <Link className="campus-card-view-link" to = {"/campuses/" + this.props.campus.id}>
                            <button className="campus-card-view-button">
                                View
                            </button>
                        </Link>
                        <Link className="campus-card-view-link-edit" to = {"/campuses/" + this.props.campus.id + "/edit"}>
                            <button className="campus-card-view-button-edit">
                                Edit
                            </button>
                        </Link>
                        <button className="campus-card-view-button-delete" onClick={() => {this.props.removeCampus(this.props.campus)}}>Delete
                        </button>
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
  })(CampusCard);