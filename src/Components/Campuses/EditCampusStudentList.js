import React, {Component} from 'react';
import EditCampusStudentCard from './EditCampusStudentCard.js';
import '../../Styles/Campuses/CampusEditFormStudentCard.css';

//list of students currently registered to a campus
class EditCampusStudentList extends Component{
    render(){
        //display informative message if there's no students on campus
        if (this.props.studentsOnCampus.length === 0){
            return(
                <div className="no-students-in-edit-campus">
                    There are no students registered in this campus.
                </div>
            );
        }
        //display each registered on campus student
        return(
            <div className="edit-campus-student-list">
                {this.props.studentsOnCampus.map(student => (
                    <EditCampusStudentCard student={student} removeFromCampus={this.props.removeFromCampus}/>
                ))}
            </div>
        );
    }
}

export default EditCampusStudentList;