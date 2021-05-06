import {getCookie} from './cookie';

export const isLogin = () => {
    const auth_token = getCookie("auth_token");
    const refresh_token = getCookie("refresh_token");
    return auth_token && refresh_token;
}