import React, {Component} from 'react';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import {connect} from 'react-redux';

import Home from './Components/Home.js';

import ListOfCampuses from './Components/Campuses/ListOfCampuses.js';
import CampusRegistrationForm from './Components/Campuses/CampusRegistrationForm.js';
import SingleCampusView from './Components/Campuses/SingleCampusView.js';
import CampusEditForm from './Components/Campuses/CampusEditForm.js';

import ListOfStudents from './Components/Students/ListOfStudents.js';
import StudentRegistrationForm from './Components/Students/StudentRegistrationForm.js';
import SingleStudentView from './Components/Students/SingleStudentView.js';
import StudentEditForm from './Components/Students/StudentEditForm.js';

class App extends Component {
  constructor(){
    super()

    this.loadCampuses = this.loadCampuses.bind(this);
    this.loadStudents = this.loadStudents.bind(this);
  }

  //load initial data
  componentDidMount(){
    this.loadCampuses();
    this.loadStudents();
  }

  //loads campuses from the database
  async loadCampuses(){
    //axios call
  }

  //loads students from the database
  async loadStudents(){
    //axios call
  }

  render(){

    //Components for the router
    const HomeComponent = () => (<Home/>)
    const ListOfCampusesComponent = () => (<ListOfCampuses/>)
    const CampusRegistrationFormComponent = () => (<CampusRegistrationForm/>)
    const ListOfStudentsComponent = () => (<ListOfStudents/>)
    const StudentRegistrationFormComponent = () => (<StudentRegistrationForm/>)

    return (
      <div>
        <Router>
          <Route path = "/" render={HomeComponent}/>
          <Switch>
            <Route exact path = "/campuses" component={ListOfCampusesComponent}/>
            <Route exact path = "/campusRegistration" component={CampusRegistrationFormComponent}/>

            <Route exact path = "/students" component={ListOfStudentsComponent}/>
            <Route exact path = "/studentRegistration" component={StudentRegistrationFormComponent}/>


            {/* Routes to the view and edit pages of each campus */}
            {this.props.campuses.map(campus => {
              return(
                <Route key={"singleCampusView" + campus.id} exact path = {"/campuses/" + campus.id}
                  render = {() => {
                    return(
                      <SingleCampusView campus = {campus}/>
                    );
                  }}
                />
              );
            })}

            {this.props.campuses.map(campus => {
              return(
                <Route key={"editCampus" + campus.id} exact path = {"/campuses/" + campus.id + "/edit"}
                  render = {() => {
                    return(
                      <CampusEditForm campus = {campus}/>
                    );
                  }}
                />
              );
            })}

            {/* Routes to the view and edit pages of each student */}
            {this.props.students.map(student => {
              return(
                <Route key={"singleStudentView" + student.id} exact path = {"/students/" + student.id}
                  render = {() => {
                    return(
                      <SingleStudentView student = {student}/>
                    );
                  }}
                />
              );
            })}

            {this.props.students.map(student => {
              return(
                <Route key={"editStudent" + student.id} exact path = {"/students/" + student.id + "/edit"}
                  render = {() => {
                    return(
                      <StudentEditForm student = {student}/>
                    );
                  }}
                />
              );
            })}


          </Switch>
        </Router>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return{
    campuses: state.campuses,
    students: state.students
  };
}

export default connect (mapStateToProps, {
  //functions for creating campuses and students from Actions (fill in when the db is set up)
})(App);
