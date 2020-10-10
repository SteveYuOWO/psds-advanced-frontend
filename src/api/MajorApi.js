import http from '../tools/http.js'

var getMajorTableData = async (page = 0, size = 10) => {
    var data = ""
    await http.get(`/api/major/${page}/${size}`).then(res => {
        data = res
    })
    return data
}

var deleteMajorById = async (majorId) => {
    var ret = ''
    await http.delete(`/api/major/${majorId}`).then((res) => {
        ret = res.data
    })
    return ret
}

export default {
    getMajorTableData: getMajorTableData,
    deleteMajorById: deleteMajorById
}