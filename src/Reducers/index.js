import {combineReducers} from 'redux';

let campuses = [

];

let students = [

];

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