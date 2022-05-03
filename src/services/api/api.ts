const axios = require('axios');

import * as storage from "../../utils/storage"
import { store } from '../../models';

export default async (endpoint: string, options: any) => {

    let fullURL = endpoint;
    if (
        !endpoint.startsWith('http') &&
        !endpoint.startsWith('//') &&
        !options.keepStableUrl
    ) {
        // validate endpoint
        endpoint = endpoint.startsWith('/') ? endpoint : '/' + endpoint;
        const appApiUrl = store.initStore.api_url
        // calc url
        fullURL =
            endpoint.indexOf(appApiUrl) === -1 ? appApiUrl + endpoint : endpoint;
    }
    let token = await storage.load("access_token");
    let defaultLang = 'vi-VN';

    return new Promise((resolve, reject) => {
        axios({
            method: options.method,
            url: fullURL,
            timeout: 15000,
            headers: token
                ? {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                    'Accept-Language': defaultLang,
                    "Access-Control-Allow-Origin": "*",
                    "Access-Control-Allow-Methods": "POST",
                    "Access-Control-Allow-Headers": "Content-Type, Authorization",
                    "Access-Control-Allow-Credentials": "true",
                    Authorization: 'Bearer ' + token,
                    ...options.headers,
                }
                : {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                    'Accept-Language': defaultLang,
                },
            data: options.data,
            params: options.params,
        }).then((response: any) => {
            // console.log('response fetch', response)
            resolve(response);
        }).catch(async (err: any) => {
            if (err.response && (err.response.status === 401 || err.response.data.code === 401)) {
            }
            reject(err);
        });
    });
};
