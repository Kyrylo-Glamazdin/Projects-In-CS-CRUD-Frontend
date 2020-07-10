import React, {Component} from 'react';
import {connect} from 'react-redux';
import {updateStudent} from '../../Actions';
import {Redirect} from 'react-router';

class StudentEditForm extends Component{
    constructor(props){
        super(props)

        this.state = {
            name: this.props.student.name,
            gpa: this.props.student.gpa,
            image: "",
            nameErrors: <div/>,
            gpaErrors: <div/>,
            edited: false
        }

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
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
                nameErrors: <div>Student Name cannot be blank</div>
            })
            errorFound = true;
        }
        else{
            this.setState({nameErrors: <div/>})
        }

        if (parseFloat(this.state.gpa) < 0 || parseFloat(this.state.gpa) > 4){
            this.setState({
                gpaErrors: <div>GPA must be a number between 0.0 and 4.0</div>
            })
            errorFound = true;
        }
        else{
            this.setState({gpaErrors: <div/>})
        }

        if (errorFound){
            return
        }

        let updatedStudent = this.props.student;
        if (this.state.image !== ""){
            updatedStudent = this.state.image
        }
        
        updatedStudent.name = this.state.name;
        updatedStudent.gpa = this.state.gpa

        this.props.updateStudent(updatedStudent)
        //PUT request here

        this.setState({edited: true})
    }

    render(){
        if (this.state.edited){
            return(
                <Redirect to={"/students/" + this.props.student.id}/>
            );
        }
        return(
            <div>
                <form onSubmit={this.handleSubmit}>
                    <label>Student Name</label>
                    <input type="text" name="name" value={this.state.name} onChange={this.handleChange}/>
                    <label>GPA</label>
                    <input type="number" name="gpa" value={this.state.gpa} onChange={this.handleChange}/>
                    <label>New Student Image</label>
                    <input type="text" name="image" value={this.state.image} onChange={this.handleChange}/>
                    <input type="submit" value="Save Changes"/>
                </form>
                {this.state.nameErrors}
                {this.state.gpaErrors}
            </div>
        );
    }
}

const mapStateToProps = state => {
    return{
    };
  }
  
  export default connect (mapStateToProps, {
      updateStudent,
  })(StudentEditForm);