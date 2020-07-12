import React, {Component} from 'react';
import EditCampusStudentCard from './EditCampusStudentCard.js';

class EditCampusStudentList extends Component{
    render(){
        if (this.props.studentsOnCampus.length === 0){
            return(
                <div>
                    There are no students registered in this campus.
                </div>
            );
        }
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