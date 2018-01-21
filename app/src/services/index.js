
import Axios from 'axios';

export const API_URL = "http://simplesvet.local/api";

export const login = userData => Axios.post(`${API_URL}/auth/login`, userData)
export const validate = token => Axios.post(`${API_URL}/auth/validate`, { token })
export const getList = (endpoint) => Axios.get(`${API_URL}/${endpoint}`);