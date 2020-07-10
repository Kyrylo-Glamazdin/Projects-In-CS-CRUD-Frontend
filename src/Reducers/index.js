import {combineReducers} from 'redux';

let campuses = [
    {id: 1, name: "Campus 1", address: "Address 1", description: "Description 1", image: ""},
    {id: 2, name: "Campus 2", address: "Address 2", description: "Description 2", image: ""},
    {id: 3, name: "Campus 3", address: "Address 3", description: "Description 3", image: ""},
    {id: 4, name: "Campus 4", address: "Address 4", description: "Description 4", image: ""},
    {id: 5, name: "Campus 5", address: "Address 5", description: "Description 5", image: ""}
];

let students = [
    {id: 1, campusId: 1, name: "Student 1", email: "student1@gmail.com", gpa: 4.0, image: ""},
    {id: 2, campusId: 3, name: "Student 2", email: "student2@gmail.com", gpa: 3.9, image: ""},
    {id: 3, campusId: 5, name: "Student 3", email: "student3@gmail.com", gpa: 3.8, image: ""},
    {id: 4, campusId: 4, name: "Student 4", email: "student4@gmail.com", gpa: 3.7, image: ""},
    {id: 5, campusId: 3, name: "Student 5", email: "student5@gmail.com", gpa: 3.6, image: ""}
];

let nextCampusId = 6;
let nextStudentId = 6;

const campusesReducer = (prevCampuses = campuses, action) => {
    switch(action.type){
        case "CREATE_CAMPUS":
            action.payload.id = nextCampusId; //remove when db is set up and conected
            nextCampusId++; //remove when db is set up and connected
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
            action.payload.id = nextStudentId; //remove when db is set up and conected
            nextStudentId++; //remove when db is set up and connected
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