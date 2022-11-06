import axios from 'axios'

const baseURL = process.env.REACT_APP_SERVER_API

export const fetchUsers = async () => {
    try {
        const users = await axios.get(`${baseURL}/users`);
        return users.data;
    } catch (error) {
        return error
    }
}

export const login = async (credentials) => {
    try {
        const response = await axios.post(`${baseURL}/users/signin`, credentials)
        return response.data
    } catch (error) {
        return error.response.data
    }
}

export const fetchTaxes = async () => {
    try {
        const taxes = await axios.get(`${baseURL}/tax`)
        return taxes.data;
    } catch (error) {
        return error
    }
}