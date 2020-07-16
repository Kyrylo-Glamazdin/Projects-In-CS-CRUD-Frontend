import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import axios from 'axios';
import {deleteCampus} from '../../Actions';
import CampusCard from './CampusCard.js';
import '../../Styles/Campuses/ListOfCampuses.css';

//component that displays the list of campuses
class ListOfCampuses extends Component{
    constructor(props){
        super(props)

        this.removeCampus = this.removeCampus.bind(this);
    }

    //function that removes the campus from the database. gets passed as props to each campus on the list
    removeCampus(campus){
        //delete from the database, then delete locally
        axios.delete("http://localhost:4200/api/campuses/" + campus.id)
        .then(() => {
            this.props.deleteCampus(campus)
        })
        .catch(err => {
            console.log(err)
        })
    }

    //displays the list of campuses in the database or shows a message that there are no campuses (if none are registered)
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
                    <div className="list-of-campuses">
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
                    {/* message that there's no registered campuses */}
                    <div className="empty-campuses-list">
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
      deleteCampus
  })(ListOfCampuses);
  