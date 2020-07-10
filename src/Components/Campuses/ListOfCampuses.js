import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import CampusCard from './CampusCard.js';

class ListOfCampuses extends Component{
    render(){
        if (this.props.campuses.length > 0){
            return(
                <div>
                    <Link to="campusRegistration">Register a New Campus</Link>
                    <div>
                        {/* Map campuses from props */}
                        {this.props.campuses.map(campus => (<CampusCard campus={campus}/>))}
                    </div>
                </div>
            );
        }
        else{
            return(
                <div>
                    <Link to="campusRegistration">Register a New Campus</Link>
                    <div>
                        There are no campuses registered in the database.
                    </div>
                </div>
            );
        }
    }
}

const mapStateToProps = state => {
    return{
      campuses: state.campuses,
    };
  }
  
  export default connect (mapStateToProps, {
  })(ListOfCampuses);
  