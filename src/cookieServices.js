import Cookies from 'js-cookie';

const COOKIE_EXPIRATION_DAYS = 7;

const setCookie = (key, value) => {
    Cookies.set(key, value, { expires: COOKIE_EXPIRATION_DAYS });
};

const getCookie = (key) => {
    return Cookies.get(key);
};

const removeCookie = (key) => {
    Cookies.remove(key);
};
const setToken = (setTokenState, token) => {
    setTokenState(token);
};


export { setCookie, getCookie, removeCookie, setToken };
