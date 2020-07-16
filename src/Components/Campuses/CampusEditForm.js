import React, {Component} from 'react';
import {connect} from 'react-redux';
import {updateCampus, updateStudent} from '../../Actions';
import {Redirect} from 'react-router';
import axios from 'axios';
import EditCampusStudentList from './EditCampusStudentList.js';
import '../../Styles/Campuses/CampusEditForm.css';

//form for editing the campus. has a number of inputs for all campus-related pieces of data and a list of students that are registered at this campus.
class CampusEditForm extends Component{
    constructor(props){
        super(props)

        //initial state
        this.state = {
            name: this.props.campus.name,
            address: this.props.campus.address,
            description: this.props.campus.description,
            image: "", //image remains blank to avoid exposing the link
            nameErrors: <div/>,
            addressErrors: <div/>,
            selectedStudent: -1,
            edited: false
        }

        //bindings
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleStudentSelection = this.handleStudentSelection.bind(this);
        this.submitStudentSelection = this.submitStudentSelection.bind(this);
        this.removeFromCampus = this.removeFromCampus.bind(this);
    }

    handleChange(event){
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    //function for submitting the form
    handleSubmit(event){
        event.preventDefault();

        let errorFound = false;

        //input validation for the name of the campus
        if (this.state.name.length === 0){
            //display the error if input is incorrect
            this.setState({
                nameErrors: <div className="standard-error-message">Campus Name cannot be blank</div>
            })
            errorFound = true;
        }
        else{
            this.setState({nameErrors: <div/>})
        }

        //input validation for the address of the campus
        if (this.state.address.length === 0){
            //display the error if input is incorrect
            this.setState({
                addressErrors: <div className="standard-error-message">Campus Address cannot be blank</div>
            })
            errorFound = true;
        }
        else{
            this.setState({addressErrors: <div/>})
        }

        //prevent the form from submitting if there is an error
        if (errorFound){
            return
        }

        //updating the image only if the field was updated by the user (and it's not blank)
        let updatedCampus = this.props.campus;
        if (this.state.image !== ""){
            updatedCampus.image = this.state.image
        }
        
        updatedCampus.name = this.state.name;
        updatedCampus.address = this.state.address;
        updatedCampus.description = this.state.description;


        //axios request to register a new campus
        this.props.updateCampus(updatedCampus)
        axios.put("http://localhost:4200/api/campuses/" + this.props.campus.id, updatedCampus)
        .then(() => {
            this.setState({edited: true})
        })
        .catch(err => {
            console.log(err);
        })
    }

    //function for selecting the student to add to campus
    handleStudentSelection(event){
        this.setState({
            selectedStudent: event.target.value
        })
    }

    //function for adding student to campus
    async submitStudentSelection(){
        //check if student was actually selected
        if (this.state.selectedStudent === -1){
            return
        }

        //find student object with the corresponding id
        let updatedStudentArray = this.props.students.filter(student => (student.id === parseInt(this.state.selectedStudent)));
        //check if student was found
        if (updatedStudentArray.length === 0){
            return
        }
        //update this student in the redux store and on the backend
        let updatedStudent = updatedStudentArray[0];
        updatedStudent.campusId = parseInt(this.props.campus.id)
        this.props.updateStudent(updatedStudent)
        await axios.put("http://localhost:4200/api/students/" + updatedStudent.id, updatedStudent)
        .catch(err => {
            console.log(err);
        })
        this.forceUpdate();
    }

    //function for removing students from campus
    async removeFromCampus(student){
        let updatedStudent = student;
        updatedStudent.campusId = null;
        //updating the student in the redux store and on the backend
        this.props.updateStudent(updatedStudent);
        await axios.put("http://localhost:4200/api/students/" + updatedStudent.id, updatedStudent)
        .catch(err => {
            console.log(err);
        })
        this.forceUpdate();
    }

    render(){
        //redirect to this campus's single view after it was edited
        if (this.state.edited){
            return(
                <Redirect to={"/campuses/" + this.props.campus.id}/>
            );
        }

        //finding students for the list of students on campus
        let studentsOnCampus = this.props.students.filter(student => (student.campusId === this.props.campus.id));
        //finding students for the list of students not on campus
        let allOtherStudents = this.props.students.filter(student => (student.campusId !== this.props.campus.id));

        return(
            <div className="campus-edit-form-container">
                {/* edit form */}
                <div className="campus-edit-header">Edit Campus
                </div>
                <form className="campus-edit-form-container" onSubmit={this.handleSubmit}>
                    <div className="input-section">
                        <label className="campus-edit-label">Campus Name</label>
                        <input className="campus-edit-input" type="text" name="name" value={this.state.name} onChange={this.handleChange}/>
                    </div>
                    <div className="input-section">
                        <label className="campus-edit-label">Location</label>
                        <input className="campus-edit-input" type="text" name="address" value={this.state.address} onChange={this.handleChange}/>
                    </div>
                    <div className="input-section">
                        <label className="campus-edit-label">New Campus Image</label>
                        <input className="campus-edit-input" type="text" name="image" value={this.state.image} onChange={this.handleChange}/>
                    </div>
                    <div className="input-section">
                        <label className="campus-edit-label">Description</label>
                        <textarea className="campus-edit-description-input" type="text" name="description" value={this.state.description} onChange={this.handleChange}/>
                    </div>
                    <input className="campus-edit-submit-button" type="submit" value="Save Changes"/>
                </form>
                {/* input errors */}
                {this.state.nameErrors}
                {this.state.addressErrors}

                {/* section for managing students on campus */}
                <div className="campus-edit-form-student-section">
                    <div className="campus-edit-header">
                        Students On Campus
                    </div>
                    <div className="edit-campus-student-selection-section">
                        {/* dropdown for selecting students to add to campus */}
                        <select className="edit-campus-select-student-dropdown" onChange={this.handleStudentSelection}>
                            <option value={this.state.selectedStudent} selected hidden> 
                                Select Student
                            </option> 
                            {allOtherStudents.map(studentDropdown => (
                                <option key = {"studentDropdown" + studentDropdown.id} value={studentDropdown.id}>
                                    {studentDropdown.firstName} {studentDropdown.lastName}
                                </option>
                            ))}
                        </select>
                        <button className="edit-campus-select-student-button" onClick={this.submitStudentSelection}>
                            Add to Campus
                        </button>
                    </div>
                    <div className="edit-campus-list-of-students-section">
                        {/* list of students currently registered on campus */}
                        <EditCampusStudentList studentsOnCampus={studentsOnCampus} removeFromCampus={this.removeFromCampus}/>
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
      updateCampus,
      updateStudent
  })(CampusEditForm);