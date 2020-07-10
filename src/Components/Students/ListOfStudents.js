import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import StudentCard from './StudentCard.js';

class ListOfStudents extends Component{
    render(){
        if (this.props.students.length > 0){
            return(
                <div>
                    <div>Students</div>
                    <Link to="studentRegistration">Register a New Student</Link>
                    <div>
                        {/* Map students from props */}
                        {this.props.students.map(student => (<StudentCard key={student.id} student={student}/>))}
                    </div>
                </div>
            );
        }
        else{
            return(
                <div>
                    <div>Students</div>
                    <Link to="studentRegistration">Register a New Student</Link>
                    <div>
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
  