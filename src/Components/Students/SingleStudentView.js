import React, {PureComponent} from 'react';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import {updateStudent, deleteStudent} from '../../Actions';
import SingleStudentViewCampusCard from './SingleStudentViewCampusCard.js';

class SingleStudentView extends PureComponent{
    constructor(props){
        super(props)

        this.state = {
            selectedCampus: this.props.student.campusId
        }

        this.submitCampusSelection = this.submitCampusSelection.bind(this);
        this.handleDelete = this.handleDelete.bind(this);
        this.handleCampusSelection = this.handleCampusSelection.bind(this);
    }

    handleDelete(){
        //axios delete
        //.then()
        this.props.deleteStudent(this.props.student);
    }

    handleCampusSelection(event){
        this.setState({
            selectedCampus: event.target.value
        })
    }

    submitCampusSelection(){
        let updatedStudent = this.props.student;
        updatedStudent.campusId = parseInt(this.state.selectedCampus)
        this.props.updateStudent(updatedStudent)
        //PUT request here
        this.forceUpdate();
    }

    render(){
        let studentCampus = this.props.campuses.filter(campus => (this.props.student.campusId === campus.id));
        let allOtherCampuses = this.props.campuses.filter(campus => (this.props.student.campusId !== campus.id));

        return(
            <div>
                {this.props.student.name}
                GPA:{this.props.student.gpa}
                <Link to = {"/students/" + this.props.student.id + "/edit/"}>
                    <button>
                        Edit
                    </button>
                </Link>
                <button onClick={this.handleDelete}>
                    Delete
                </button>
                <SingleStudentViewCampusCard campus={studentCampus}/>
                <select onChange={this.handleCampusSelection}>
                    <option value="none" selected disabled hidden> 
                        Select Campus
                    </option> 
                    {allOtherCampuses.map(campusDropdown => (
                        <option key = {"campusDropdown" + campusDropdown.id} value={campusDropdown.id}>
                            {campusDropdown.name}
                        </option>
                    ))}
                </select>
                <button onClick={this.submitCampusSelection}>
                    Change Campus
                </button>
            </div>    
        );
    }
}

const mapStateToProps = state => {
    return{
        campuses: state.campuses
    };
  }
  
  export default connect (mapStateToProps, {
      updateStudent,
      deleteStudent
  })(SingleStudentView);