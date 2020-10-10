import http from '../tools/http.js'

/**
 * delete teacher by id
 * @param {teacherId} teacherId
 */
var deleteTeacherById = async (teacherId) => {
    var ret = ''
    await http.delete(`/api/teacher/${teacherId}`).then((res) => {
        ret = res.data
    })
    return ret
}

/**
 * upload the file
 * @param {upload file} file
 */
var uploadTeacherXML = async (file) => {
    const data = new FormData()
    data.append('file', file)
    var ret = ''
    await http.post('api/teacher/upload', data, {
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
 * @param {teacher json} teacher
 */
var insertOneTeacher = async (teacher) => {
    var data = ''
    await http.post('api/teacher', teacher).then(res => {
        data = res
    })
    return data
}

var updateTeacher = async (teacher) => {
    var data = ''
    await http.post('api/teacher/update', teacher).then(res => {
        data = res
    })
    return data
}

/**
 * get teacher table data
 * @param {pageNumber}} page
 * @param {pageSize} size
 */
var getTeacherTableData = async (page = 0, size = 10) => {
    var data = ""
    await http.get(`/api/teacher/${page}/${size}`).then(res => {
        data = res
    })
    return data
}

/**
 * get teacher table data by major
 * @param {page number, start with index 0} page
 * @param {the maximum page size} size
 * @param {user major} major
 */
var getTeacherTableDataByMajor = async (page = 0, size = 10, major) => {
    var data = ""
    await http.get(`/api/teacher/getByMajor/${page}/${size}/${major}`).then(res => {
        data = res
    })
    return data
}

export default {
    getTeacherTableData: getTeacherTableData,
    uploadTeacherXML: uploadTeacherXML,
    insertOneTeacher: insertOneTeacher,
    deleteTeacherById: deleteTeacherById,
    getTeacherTableDataByMajor: getTeacherTableDataByMajor,
    updateTeacher: updateTeacher
}