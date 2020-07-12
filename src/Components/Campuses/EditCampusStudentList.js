import React, {Component} from 'react';
import EditCampusStudentCard from './EditCampusStudentCard.js';

class EditCampusStudentList extends Component{
    render(){
        return(
            <div>
                {this.props.studentsOnCampus.map(student => (
                    <EditCampusStudentCard student={student} removeFromCampus={this.props.removeFromCampus}/>
                ))}
            </div>
        );
    }
}

export default EditCampusStudentList;