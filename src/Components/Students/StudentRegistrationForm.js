import React, {Component} from 'react';
import {connect} from 'react-redux';
import {createStudent} from '../../Actions';
import {Redirect} from 'react-router';

class StudentRegistrationForm extends Component{
    constructor(props){
        super(props)

        this.state = {
            name: "",
            registered: false
        }

        this.handleRegistration = this.handleRegistration.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
    }

    handleInputChange(event){
        this.setState({name: event.target.value})
    }

    handleRegistration(event){
        event.preventDefault();

        let newStudent = {
            name: this.state.name
        }

        this.props.createStudent(newStudent);

        //here get the id of a new student to redirect to that student's page

        this.setState({registered: true})
    }

    render(){
        
        /* UNCOMMENT WHEN DB IS SET UP AND WE CAN GET THE ID OF A NEW STUDENT */

        // if (this.state.registered){
        //     return(
        //         <Redirect to = {"/students/" + this.state.newStudentId}/>
        //     );
        // }

        return(
            <div>
                <form onSubmit={this.handleRegistration}>
                    <label>Student Name</label>
                    <input type = "text" onChange={this.handleInputChange}/>
                    <input type="submit" value="Add Student"/>
                </form>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return{
    };
  }
  
  export default connect (mapStateToProps, {
      createStudent
  })(StudentRegistrationForm);