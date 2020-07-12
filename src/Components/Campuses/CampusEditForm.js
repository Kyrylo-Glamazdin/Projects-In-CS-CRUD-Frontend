import React, {Component} from 'react';
import {connect} from 'react-redux';
import {updateCampus, updateStudent} from '../../Actions';
import {Redirect} from 'react-router';
import EditCampusStudentList from './EditCampusStudentList.js';

class CampusEditForm extends Component{
    constructor(props){
        super(props)

        this.state = {
            name: this.props.campus.name,
            address: this.props.campus.address,
            description: this.props.campus.description,
            image: "",
            nameErrors: <div/>,
            selectedStudent: -1,
            edited: false
        }

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

    handleSubmit(event){
        event.preventDefault();

        let errorFound = false;

        if (this.state.name.length === 0){
            this.setState({
                nameErrors: <div className="standard-error-message">Campus Name cannot be blank</div>
            })
            errorFound = true;
        }
        else{
            this.setState({nameErrors: <div/>})
        }

        if (parseFloat(this.state.gpa) < 0 || parseFloat(this.state.gpa) > 4){
            this.setState({
                gpaErrors: <div className="standard-error-message">GPA must be a number between 0.0 and 4.0</div>
            })
            errorFound = true;
        }
        else{
            this.setState({gpaErrors: <div/>})
        }

        if (errorFound){
            return
        }

        let updatedCampus = this.props.campus;
        if (this.state.image !== ""){
            updatedCampus.image = this.state.image
        }
        
        updatedCampus.name = this.state.name;
        updatedCampus.address = this.state.address;
        updatedCampus.description = this.state.description;

        this.props.updateCampus(updatedCampus)
        //PUT request here

        this.setState({edited: true})
    }

    handleStudentSelection(event){
        this.setState({
            selectedStudent: event.target.value
        })
    }

    submitStudentSelection(){
        if (this.state.selectedStudent === -1){
            return
        }

        let updatedStudentArray = this.props.students.filter(student => (student.id === parseInt(this.state.selectedStudent)));
        if (updatedStudentArray.length === 0){
            return
        }
        let updatedStudent = updatedStudentArray[0];
        updatedStudent.campusId = parseInt(this.props.campus.id)
        this.props.updateStudent(updatedStudent)
        //PUT request here
        this.forceUpdate();
    }

    removeFromCampus(student){
        student.campusId = -1;
        this.props.updateStudent(student);
        this.forceUpdate();
    }

    render(){
        if (this.state.edited){
            return(
                <Redirect to={"/campuses/" + this.props.campus.id}/>
            );
        }

        let studentsOnCampus = this.props.students.filter(student => (student.campusId === this.props.campus.id));
        let allOtherStudents = this.props.students.filter(student => (student.campusId !== this.props.campus.id));

        return(
            <div>
                <div>Edit Campus
                </div>
                <form onSubmit={this.handleSubmit}>
                    <div>
                        <label>Campus Name</label>
                        <input type="text" name="name" value={this.state.name} onChange={this.handleChange}/>
                    </div>
                    <div>
                        <label>Location</label>
                        <input type="text" name="address" value={this.state.address} onChange={this.handleChange}/>
                    </div>
                    <div>
                        <label>New Campus Image</label>
                        <input type="text" name="image" value={this.state.image} onChange={this.handleChange}/>
                    </div>
                    <div>
                        <label>Description</label>
                        <input type="text" name="description" value={this.state.description} onChange={this.handleChange}/>
                    </div>
                    <input type="submit" value="Save Changes"/>
                </form>
                {this.state.nameErrors}
                <div>
                    <div>
                        Students On Campus
                    </div>
                    <div>
                        <select onChange={this.handleStudentSelection}>
                            <option value={this.state.selectedStudent} selected hidden> 
                                Select Student
                            </option> 
                            {allOtherStudents.map(studentDropdown => (
                                <option key = {"studentDropdown" + studentDropdown.id} value={studentDropdown.id}>
                                    {studentDropdown.name}
                                </option>
                            ))}
                        </select>
                        <button onClick={this.submitStudentSelection}>
                            Add to Campus
                        </button>
                    </div>
                    <div>
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