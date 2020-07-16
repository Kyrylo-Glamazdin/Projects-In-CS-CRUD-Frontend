import {combineReducers} from 'redux';

//empty array to be filled with data from the backend

let campuses = [

];

let students = [

];

//reducer for campuses. performs creating, updating, and deleting campuses in the redux store
const campusesReducer = (prevCampuses = campuses, action) => {
    switch(action.type){
        case "CREATE_CAMPUS":
            return prevCampuses.concat(action.payload);
        case "UPDATE_CAMPUS":
            for (let i = 0; i < prevCampuses.length; i++){
                if (prevCampuses[i].id === action.payload.id){
                    prevCampuses[i] = action.payload;
                    return prevCampuses;
                }
            }
            return prevCampuses;
        case "DELETE_CAMPUS":
            return prevCampuses.filter(campus => (campus.id !== action.payload.id));
        default:
            return prevCampuses;
    }
}

//reducer for students. performs creating, updating, and deleting students in the redux store
const studentsReducer = (prevStudents = students, action) => {
    switch(action.type){
        case "CREATE_STUDENT":
            return prevStudents.concat(action.payload);
        case "UPDATE_STUDENT":
            for (let i = 0; i < prevStudents.length; i++){
                if (prevStudents[i].id === action.payload.id){
                    prevStudents[i] = action.payload;
                    return prevStudents;
                }
            }
            return prevStudents;
        case "DELETE_STUDENT":
            return prevStudents.filter(student => (student.id !== action.payload.id));
        default:
            return prevStudents;
    }
}

export default combineReducers({
    campuses: campusesReducer,
    students: studentsReducer
});