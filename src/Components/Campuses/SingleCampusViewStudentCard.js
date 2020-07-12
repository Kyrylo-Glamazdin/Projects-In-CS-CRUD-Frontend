import React from 'react';
import {Link} from 'react-router-dom';

function SingleCampusViewStudentCard(props){
    return(
        <div>
            {props.student.name}
            <Link to = {"/students/" + props.student.id}>
                <button>
                    View
                </button>
            </Link>
        </div>
    );
}

export default SingleCampusViewStudentCard;