import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';

class StudentCard extends Component{
    render(){
        //finding this student's campus
        let studentCampus = this.props.campuses.filter(campus => (this.props.student.campusId === campus.id));

        let studentCampusName = "No Campus"; //default campus value if campus not found
        if (studentCampus.length > 0){
            studentCampusName = studentCampus[0].name
        }
        return(
            <div>
                {this.props.student.name}
                {studentCampusName}
                <Link to = {"/students/" + this.props.student.id}>
                    <button>
                        View
                    </button>
                </Link>
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