import axios from "axios";
import {apiKey, bearerToken} from "./credentials"

export const baseURL = 'https://api.themoviedb.org/3/';

const axiosInstance = axios.create({
  baseURL: baseURL,
  headers: { Authorization: `Bearer ${bearerToken}` },
  params: { apiKey },
});

export default axiosInstance;