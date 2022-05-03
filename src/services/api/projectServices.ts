import fetchApi from "../api/api"

const getCurrentProject = () => {
    return new Promise((resolve, reject) => {
        // console.log('vào project')
        fetchApi('/tenants/current', { method: 'GET' })
            .then((res) => {
                return resolve(res);
            })
            .catch((err) => {
                return reject(err);
            });
    });
}

export { getCurrentProject }