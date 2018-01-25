import { create } from 'apisauce';
import configs from './config.json';

export const { API_URL, UPLOADS_URL } = configs;

export const service = create({
  baseURL: API_URL,
});
