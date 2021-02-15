import axios from 'axios'
export default class FormService {
    constructor() {
        this.api = axios.create({
            baseURL: process.env.REACT_APP_API_URL,
            withCredentials: true
        })
    }
    
    newEntry = entry => this.api.post('/newEntry', entry)
    getCode = code => this.api.get(`/codes/${code}`)
    uploadImage = imageForm => this.api.post('/upload', imageForm)

}