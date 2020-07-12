import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import {deleteCampus} from '../../Actions';
import SingleCampusViewStudentCard from './SingleCampusViewStudentCard.js';

class SingleCampusView extends Component{
    constructor(props){
        super(props)

        this.removeCampus = this.removeCampus.bind(this);
    }

    removeCampus(){
        //axios delete
        //then ()
        this.props.deleteCampus(this.props.campus)
    }

    render(){

        let studentsOnCampus = this.props.students.filter(student => (student.campusId === this.props.campus.id));
        let noStudentsText = "";
        if (studentsOnCampus.length === 0){
            noStudentsText = "This campus has no students."
        }

        return(
            <div>
                <div>
                    {this.props.campus.name}
                    {this.props.campus.address}
                    {this.props.campus.description}
                    <Link to = {"/campuses/" + this.props.campus.id + "/edit/"}>
                        <button>
                            Edit
                        </button>
                    </Link>
                    <button onClick={this.removeCampus}>
                        Delete
                    </button>
                </div>
                <div>
                    <Link to = {"/campuses/" + this.props.campus.id + "/edit/"}>
                        <button>
                            Add Students
                        </button>
                    </Link>
                    <div>
                        {noStudentsText}
                    </div>
                    <div>
                        {studentsOnCampus.map(student => (
                            <SingleCampusViewStudentCard student={student}/>
                        ))}
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return{
        students: state.students
    };
  }
  
  export default connect (mapStateToProps, {
      deleteCampus
  })(SingleCampusView);