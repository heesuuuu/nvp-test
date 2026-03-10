import axios from 'axios';
/*
const api = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL,   // Axios 기본 url 설정 
    withCredentials: true                       // 요청에 쿠키 자동 포함
});

export default api;
*/


const api = {
    get: () => Promise.reject(new Error("서버가 없습니다. lib/storage.js를 사용하세요.")),
    post: () => Promise.reject(new Error("서버가 없습니다. lib/storage.js를 사용하세요.")),
    put: () => Promise.reject(new Error("서버가 없습니다. lib/storage.js를 사용하세요.")),
    delete: () => Promise.reject(new Error("서버가 없습니다. lib/storage.js를 사용하세요.")),
};

export default api;
