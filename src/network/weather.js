import axios from 'axios';

const API_KEY = process.env.REACT_APP_OWM_API_KEY;

const baseUrl = `https://api.openweathermap.org/data/2.5/weather?appid=${API_KEY}&units=metric&&lang=pt_br`;

export const getWeatherData = ({ latitude, longitude }) => axios.get(`${baseUrl}&lat=${latitude}&lon=${longitude}`);
