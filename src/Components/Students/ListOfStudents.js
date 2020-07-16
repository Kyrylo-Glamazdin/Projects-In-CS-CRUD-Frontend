import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import StudentCard from './StudentCard.js';
import '../../Styles/Students/ListOfStudents.css';

//component that shows the list of students in the database
class ListOfStudents extends Component{
    //show each registered student or display an informative message indicating that there's no students in the database
    render(){
        if (this.props.students.length > 0){
            return(
                <div className="students-main-container">
                    <div>
                        <div className="page-header">Students</div>
                        <Link className="register-button-link" to="/studentRegistration/">
                            <button className="registration-button">
                                Register a New Student
                            </button>
                        </Link>
                    </div>
                    <div className="list-of-students">
                        {/* Map students from props */}
                        {this.props.students.map(student => (<StudentCard key={student.id} student={student}/>))}
                    </div>
                </div>
            );
        }
        else{
            return(
                <div className="students-main-container">
                    <div>
                        <div className="page-header">Students</div>
                        <Link className="register-button-link" to="/studentRegistration/">
                            <button className="registration-button">
                                Register a New Student
                            </button>
                        </Link>
                    </div>
                    {/* message that there's no students */}
                    <div className="empty-students-list">
                        There are no students registered in the database.
                    </div>
                </div>
            );
        }
    }
}

const mapStateToProps = state => {
    return{
      students: state.students
    };
  }
  
  export default connect (mapStateToProps, {
  })(ListOfStudents);
  