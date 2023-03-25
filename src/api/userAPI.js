import jwt_decode from 'jwt-decode'
import {authInstance, instance} from './api'


export const registration = async (name, email, password) => {
    const {data} = await instance.post('registration', {name, email, password})
    localStorage.setItem('token', data.token)
    return jwt_decode(data.token)
}

export const login = async (email, password) => {
    const {data} = await instance.post('login', {email, password})
    localStorage.setItem('token', data.token)
    return jwt_decode(data.token)
}

export const check = async () => {
    const {data} = await authInstance.post('auth')
    localStorage.setItem('token', data.token)
    return data
}


