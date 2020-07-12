import React from 'react';

function EditCampusStudentCard(props){
    return(
        <div>
            {props.student.name}
            <button onClick={() => {props.removeFromCampus(props.student)}}>
                Remove from Campus
            </button>
        </div>
    );
}

export default EditCampusStudentCard;