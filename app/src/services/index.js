import { create } from 'apisauce';
import configs from '../config.json';

export const API_URL = configs.API_URL;
export const UPLOADS_URL = configs.UPLOADS_URL;

export const service = create({
    baseURL: API_URL
});