import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';

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
            <div>
                {this.props.campus.name}
                {numOfStudentsText}
                <Link to = {"/campuses/" + this.props.campus.id}>
                    <button>
                        View
                    </button>
                </Link>
                <Link to = {"/campuses/" + this.props.campus.id + "/edit"}>
                    <button >
                        Edit
                    </button>
                </Link>
                <button onClick={() => {this.props.removeCampus(this.props.campus)}}>Delete
                </button>
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