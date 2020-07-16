import React from 'react';
import '../../Styles/Campuses/CampusEditFormStudentCard.css';

//functional component for displaying students in CampusEditForm. can be removed by clicking the 'Remove from Campus' button
function EditCampusStudentCard(props){
    return(
        <div className="edit-campus-student-card-container">
            <img className="edit-campus-student-card-image" src = {props.student.image} alt = "student"/>
            <div className="edit-campus-student-card-text-section">
                <button className="remove-from-edit-campus-button" onClick={() => {props.removeFromCampus(props.student)}}>
                    Remove from Campus
                </button>
                <div className="stud-card-name">
                    {props.student.firstName} {props.student.lastName}
                </div>
            </div>
        </div>
    );
}

export default EditCampusStudentCard;