
import Axios from 'axios';

export const API_URL = "http://simplesvet.local/api";
export const UPLOADS_URL = API_URL + '/public/uploads/';

export const login = userData => Axios.post(`${API_URL}/auth/login`, userData)
export const validate = token => Axios.post(`${API_URL}/auth/validate`, { token })
export const getList = (endpoint) => Axios.get(`${API_URL}/${endpoint}`);
export const getEntry = (endpoint, id) => Axios.get(`${API_URL}/${endpoint}/${id}`);

export const upload = (file) => {
    const formData = new FormData();
    formData.append('foto',file)

    const config = {
        headers: {
            'content-type': 'multipart/form-data'
        }
    }

    return Axios.post(`${API_URL}/upload`, formData, config);
};