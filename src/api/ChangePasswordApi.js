import http from '../tools/http.js'

var changePassword = async (userId, oldPassword, newPassword, type) => {
    var ret = ''
    let data = {
        userId: userId,
        oldPassword: oldPassword,
        newPassword: newPassword,
        type: type
    }
    await http.post('api/changePassword', data).then(res => {
        console.log(res)
        ret = res
    })
    return ret
}

export default {
    changePassword: changePassword
}