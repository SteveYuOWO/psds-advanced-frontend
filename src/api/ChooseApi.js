import http from '../tools/http.js'

var studentChooseTeacher = async(studentId, teacherId) => {
    var ret = ''
    await http.post(`api/select/studentChooseTeacher/${studentId}/${teacherId}`).then(res => {
        ret = res
    })
    return ret
}

var unFinalChoose = async(chooseId) => {
    var ret = ''
    await http.post(`api/select/unFinalChoose/${chooseId}`).then(res => {
        ret = res
    })
    return ret
}

var finalChoose = async(chooseId) => {
    var ret = ''
    await http.post(`api/select/finalChoose/${chooseId}`).then(res => {
        ret = res
    })
    return ret
}

var teacherUnChooseStudent = async(chooseId) => {
    var ret = ''
    await http.post(`api/select/teacherUnChooseStudent/${chooseId}`).then(res => {
        ret = res
    })
    return ret
}

var teacherChooseStudent = async(chooseId) => {
    var ret = ''
    await http.post(`api/select/teacherChooseStudent/${chooseId}`).then(res => {
        ret = res
    })
    return ret
}

var getAllChoosesByTeacherId = async (page = 0, size = 10, teacherId) => {
    var ret = ''
    await http.get(`api/select/teacher/hasChoose/${page}/${size}/${teacherId}`).then(res => {
        ret = res
    })
    return ret
}

var getAllChoosesByStudentId = async (page = 0, size = 10, studentId) => {
    var ret = ''
    await http.get(`api/select/student/hasChoose/${page}/${size}/${studentId}`).then(res => {
        ret = res
    })
    return ret
}

var removeChoose = async (studentId, teacherId) => {
    var ret = ''
    await http.delete(`api/select/student/${studentId}/${teacherId}`).then(res => {
        ret = res
    })
    return ret
}

var getChooseTableData = async (page = 0, size = 10) => {
    var data = ""
    await http.get(`/api/select/${page}/${size}`).then(res => {
        data = res
    })
    return data
}

export default {
    studentChooseTeacher: studentChooseTeacher,
    teacherChooseStudent: teacherChooseStudent,
    teacherUnChooseStudent: teacherUnChooseStudent,
    finalChoose: finalChoose,
    getAllChooses: getAllChoosesByStudentId,
    getAllChoosesByTeacherId: getAllChoosesByTeacherId,
    removeChoose: removeChoose,
    getChooseTableData: getChooseTableData,
    unFinalChoose: unFinalChoose
}