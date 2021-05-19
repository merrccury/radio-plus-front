import {getCookie, deleteCookie} from './cookie';

export const isLogin = () => {
    const auth_token = getCookie("accessToken");
    const refresh_token = getCookie("refreshToken");
    return auth_token && refresh_token;
}

export const isAdmin = () => getCookie('roles') === 'USER,ADMIN'

export const logout = () =>{
    deleteCookie('accessToken');
    deleteCookie('refreshToken');
    return true;
}