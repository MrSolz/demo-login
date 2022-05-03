import fetchApi from "../api/api"
import { store } from '../../models';
const login = (user: { username: string, password: string }, project: { id: string }) => {
    let clientId = project.id;

    let queryString = `?username=${user.username}&password=${encodeURIComponent(
        user.password,
    )}&grant_type=password&scope=all&client_id=${clientId}`;
    return new Promise((resolve, reject) => {
        fetchApi(store.initStore.api_login_url + `/token${queryString}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            keepStableUrl: true,
        })
            .then((res: any) => {
                resolve(res);
            })
            .catch((err: any) => reject(err));
    });
}
export {
    login
}