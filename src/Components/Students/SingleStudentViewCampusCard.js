import React, {Component} from 'react';
import {Link} from 'react-router-dom';

class SingleStudentViewCampusCard extends Component{
    render(){
        if (this.props.campus.length > 0){
            return(
                <div>
                    {this.props.campus[0].name}
                    <Link to = {"/campuses/" + this.props.campus[0].id + "/edit/"}>
                        <button>Edit</button>
                    </Link>
                </div>
            );
        }
        else{
            return(
                <div>
                    This student is not registered to a campus
                </div>
            );
        }
    }
}

export default SingleStudentViewCampusCard;