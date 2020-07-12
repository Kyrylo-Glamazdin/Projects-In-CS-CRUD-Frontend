import React from 'react';
import '../../Styles/Campuses/CampusEditFormStudentCard.css';

function EditCampusStudentCard(props){
    return(
        <div className="edit-campus-student-card-container">
            <img className="edit-campus-student-card-image" src = {props.student.image} alt = "student"/>
            <div className="edit-campus-student-card-text-section">
                <button className="remove-from-edit-campus-button" onClick={() => {props.removeFromCampus(props.student)}}>
                    Remove from Campus
                </button>
                <div className="stud-card-name">
                    {props.student.name}
                </div>
            </div>
        </div>
    );
}

export default EditCampusStudentCard;