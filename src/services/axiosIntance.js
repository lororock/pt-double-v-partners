import axios from "axios";

const baseURL = 'https://api.themoviedb.org/3/';
const apiKey = '9c05951cb7f1a3f3a5f9bfcabed45091';

const bearerToken = 'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI5YzA1OTUxY2I3ZjFhM2YzYTVmOWJmY2FiZWQ0NTA5MSIsInN1YiI6IjY0ZjI2YjNhZGJiYjQyMDEzYTIzODQxNiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.ZcHwMkMMzPtIOA_bPyRruwYIlE3F3Gj47TW6XOsDcS0';

const axiosInstance = axios.create({
  baseURL: baseURL,
  headers: { Authorization: `Bearer ${bearerToken}` },
  params: { apiKey },
});

export default axiosInstance;