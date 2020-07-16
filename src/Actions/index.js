//all possible action for the reducers

/* CAMPUSES */

export const createCampus = campus => {
    return {
        type: 'CREATE_CAMPUS',
        payload: campus
    }
}

export const updateCampus = campus => {
    return {
        type: 'UPDATE_CAMPUS',
        payload: campus
    }
}

export const deleteCampus = campus => {
    return {
        type: 'DELETE_CAMPUS',
        payload: campus
    }
}

/* STUDENTS */

export const createStudent = student => {
    return {
        type: 'CREATE_STUDENT',
        payload: student
    }
}

export const updateStudent = student => {
    return {
        type: 'UPDATE_STUDENT',
        payload: student
    }
}

export const deleteStudent = student => {
    return {
        type: 'DELETE_STUDENT',
        payload: student
    }
}