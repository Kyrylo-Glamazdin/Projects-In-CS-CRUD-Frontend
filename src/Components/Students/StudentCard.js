import React, {Component} from 'react';
import {connect} from 'react-redux';

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