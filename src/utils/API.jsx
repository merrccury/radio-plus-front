import axios from "axios";


let instance = axios.create({
    baseURL: "https://DESKTOP-V8HU7V3:8080/api/",
    responseType: "json"
});
instance.interceptors.request(()=>{

})


export const login = (login,password) =>instance.post('auth/login')
export const logout = (login,password) =>instance.post('auth/login')
export const register = (login,password) =>instance.post('auth/login')
export const restore = (login,password) =>instance.post('auth/login')