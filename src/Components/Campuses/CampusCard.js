import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import '../../Styles/Campuses/CampusCard.css';

//individual campus card that is displayed in the ListOfCampuses. renders all of the relevant campus-related information
class CampusCard extends Component{
    render(){
        //finding number of students on campus
        let studentsInCampus = this.props.students.filter(student => (student.campusId === this.props.campus.id));
        let numOfStudentsText = "";
        if (studentsInCampus.length === 1){
            numOfStudentsText = "1 Student";
        }
        else{
            numOfStudentsText = studentsInCampus.length + " Students";
        }

        //rendering the information
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
                        <div className="campus-card-view-link-edit">
                        <button className="campus-card-view-button-delete" onClick={() => {this.props.removeCampus(this.props.campus)}}>Delete
                        </button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

//getting students from the store to calculate how many of them are registered at this particular campus
const mapStateToProps = state => {
    return{
      students: state.students
    };
  }
  
  export default connect (mapStateToProps, {
  })(CampusCard);