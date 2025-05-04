import axios from 'axios';

const api = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL,   // Axios 기본 url 설정 
    withCredentials: true                       // 요청에 쿠키 자동 포함
});

export default api;