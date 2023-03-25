import axios from 'axios'


const instance = axios.create({
    baseURL: 'https://rose-adorable-chipmunk.cyclic.app/api/'
})

const authInstance = axios.create({
    baseURL: 'https://rose-adorable-chipmunk.cyclic.app/api/'
})

const authInterceptor = config => {
    config.headers.authorization = `Bearer ${localStorage.getItem('token')}`
    return config
}

authInstance.interceptors.request.use(authInterceptor)


export {instance, authInstance}