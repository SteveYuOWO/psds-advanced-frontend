import axios from 'axios';


const http = axios.create({
    baseURL: 'http://localhost:8080/psds',
    timeout: 1000 * 30,
    withCredentials: true,
    // transformRequest: [(data) => JSON.stringify(data.data)],
    headers: {
        'Content-Type': 'application/json;charset=UTF-8',
    }
})

export default http