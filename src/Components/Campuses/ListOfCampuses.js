import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import {deleteCampus} from '../../Actions';
import CampusCard from './CampusCard.js';
import '../../Styles/Campuses/ListOfCampuses.css';

class ListOfCampuses extends Component{
    constructor(props){
        super(props)

        this.removeCampus = this.removeCampus.bind(this);
    }

    removeCampus(campus){
        this.props.deleteCampus(campus)
    }

    render(){
        if (this.props.campuses.length > 0){
            return(
                <div className="campuses-main-container">
                    <div>
                        <div className="page-header">Campuses</div>
                        <Link className="register-button-link" to="/campusRegistration/">
                            <button className="registration-button">
                                Register a New Campus
                            </button>
                        </Link>
                        </div>
                    <div className="list-of-students">
                        {/* Map campuses from props */}
                        {this.props.campuses.map(campus => (<CampusCard campus={campus} removeCampus={this.removeCampus}/>))}
                    </div>
                </div>
            );
        }
        else{
            return(
                <div className="campuses-main-container">
                    <div>
                        <div className="page-header">Campuses</div>
                        <Link className="register-button-link" to="/campusRegistration/">
                            <button className="registration-button">
                                Register a New Campus
                            </button>
                        </Link>
                    </div>
                    <div className="empty-campuses-list">
                        There are no students registered in the database.
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
      deleteCampus
  })(ListOfCampuses);
  