import { useLogin } from './msal';
import { AuthenticationResult } from "@azure/msal-browser"

export type Method = 'GET' | 'POST' | 'PUT' | 'HEAD' | 'DELETE';

export const sendRequest = (
    auth: AuthenticationResult, 
    url: string,
    method: Method = 'GET',
    body?: string,
) => {
    const options: RequestInit = {
        method,
        body,
        headers: {
            'Authorization': 'Bearer ' + auth.accessToken,
            'Content-Type': 'application/json',
        }
    };

    return fetch(url, options);
}

export const useRequest = () => {
    const login = useLogin();
    return async (
        url: string,
        method: Method = 'GET',
        body?: string,
    ) => sendRequest((await login()), url, method, body);
}
