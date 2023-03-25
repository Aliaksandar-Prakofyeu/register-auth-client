import {instance} from './api'
import axios from 'axios'


export const getUsers = async () => {
    const {data} = await instance.get('users')
    return data
}

export const updateStatus = async (id, status) => {
    const {data} = await instance.put(`updateStatus/${id}`, {status})
    return data
}

export const deleteUser = async (id) => {
    const data = await axios.delete(`https://rose-adorable-chipmunk.cyclic.app/api/user/${id}`)
    return data
}

