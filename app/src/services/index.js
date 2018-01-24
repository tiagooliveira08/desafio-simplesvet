import { create } from 'apisauce';

export const API_URL = "http://simplesvet.local/api";
export const UPLOADS_URL = API_URL + '/public/uploads/';

export const service = create({
    baseURL: API_URL
});