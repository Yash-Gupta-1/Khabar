import axios from 'axios'
import { apiUrl } from './constants/Utils'


let authAxios = axios.create({
    baseURL: apiUrl
})

class Request {
    getPosts() {
        return new Promise((next, error) => {
            authAxios
                .get()
                .then(d => {
                    next(d.data)
                })
                .catch(err => {
                    next({ error: true, err })
                    setTimeout(() => this.error(err), 0)
                })
        })
    }

}

export default new Request();