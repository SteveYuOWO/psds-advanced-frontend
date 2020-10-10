import http from '../tools/http.js'

/**
 * delete admin by id
 * @param {adminId} adminId
 */
var deleteAdminById = async (adminId) => {
    var ret = ''
    await http.delete(`/api/admin/${adminId}`).then((res) => {
        ret = res.data
    })
    return ret
}

var insertOneAdmin = async (admin) => {
    var data = ''
    await http.post('api/admin', admin).then(res => {
        data = res
    })
    return data
}

var getAdminTableData = async (page = 0, size = 10) => {
    var data = ""
    await http.get(`/api/admin/${page}/${size}`).then(res => {
        data = res
    })
    return data
}

export default {
    getAdminTableData: getAdminTableData,
    deleteAdminById: deleteAdminById,
    insertOneAdmin: insertOneAdmin
}