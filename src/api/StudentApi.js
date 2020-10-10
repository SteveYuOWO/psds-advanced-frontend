import http from '../tools/http.js'

/**
 * delete student by id
 * @param {studentId} studentId
 */
var deleteStudentById = async (studentId) => {
    var ret = ''
    await http.delete(`/api/student/${studentId}`).then((res) => {
        ret = res.data
    })
    return ret
}

/**
 * upload the file
 * @param {upload file} file
 */
var uploadStudentXML = async (file) => {
    const data = new FormData()
    data.append('file', file)
    var ret = ''
    await http.post('api/student/upload', data, {
        headers: {'Content-Type': 'multipart/form-data'}
    }).then((res) => {
        ret = res.data
    }).catch((err) => {
        ret = err.message
    })
    return ret
}

/**
 * insert one record
 * @param {student json} student
 */
var insertOneStudent = async (student) => {
    var data = ''
    await http.post('api/student', student).then(res => {
        data = res
    })
    return data
}

/**
 * get student table data
 * @param {pageNumber}} page
 * @param {pageSize} size
 */
var getStudentTableData = async (page = 0, size = 10) => {
    var data = ""
    await http.get(`/api/student/${page}/${size}`).then(res => {
        data = res
    })
    return data
}

var updateStudent = async (student) => {
    var data = ''
    await http.post('api/student/update', student).then(res => {
        data = res
    })
    return data
}

export default {
    getStudentTableData: getStudentTableData,
    insertOneStudent: insertOneStudent,
    uploadStudentXML: uploadStudentXML,
    deleteStudentById: deleteStudentById,
    updateStudent: updateStudent
}