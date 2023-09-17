const BASE_URL = 'https://gorest.co.in/public/v2';
const TOKEN_KEY = 'Bearer f9ceed7cb27dbdebd17406c364854410d1ce17373ca4fb0ce6a774e32f44f521';

export const SERVICES = {
    // TOKEN
    TOKEN: TOKEN_KEY,

    // ENDPOINT API
    GET_POST: `${BASE_URL}/posts`,
    GET_USERS: `${BASE_URL}/users`,
}