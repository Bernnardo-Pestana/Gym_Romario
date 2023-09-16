import axios from 'axios'

let loginData = localStorage.getItem('loginInfo')
if (!loginData) loginData = localStorage.getItem('loginInfo')

let loginDataAdm = localStorage.getItem('loginInfo')

const api = axios.create({
    baseURL: process.env.REACT_APP_API_URL,
    headers: {
        Authorization:
            loginData && typeof loginData === 'string'
                ? `Bearer ${JSON.parse(loginData).token}`
                : '',
    },
})

const apiAdm = axios.create({
    baseURL: process.env.REACT_APP_API_URL,
    headers: {
        Authorization:
            loginDataAdm && typeof loginDataAdm === 'string'
                ? `Bearer ${JSON.parse(loginDataAdm).token}`
                : '',
    },
})

export default api

const setBearerToken = async (token: string) => {
    api.defaults.headers.Authorization = `Bearer ${token}`
}

const setBearerTokenAdm = async (token: string) => {
    apiAdm.defaults.headers.Authorization = `Bearer ${token}`
}

const GET = (url: string | void) =>
    api
        .get(url || '')
        .then((res) => res.data)
        .then((res) => {
            return res
        })
        .catch((e) => {
            throw e.response
        })

const GET_ADM = (url: string | void) =>
    apiAdm
        .get(url || '')
        .then((res) => res.data)
        .then((res) => {
            return res
        })
        .catch((e) => {
            throw e.response
        })

const POST = (url: string | void, params: object | Array<any | void> | void) =>
    api
        .post(url || '', params)
        .then((res) => res.data)
        .then((res) => {
            return res
        })
        .catch((e) => {
            throw e.response
        })

const POST_ADM = (url: string | void, params: object | Array<any | void> | void) =>
    apiAdm
        .post(url || '', params)
        .then((res) => res.data)
        .then((res) => {
            return res
        })
        .catch((e) => {
            throw e.response
        })

const PUT = (url: string | void, params: object | Array<any> | void) =>
    api
        .put(url || '', params)
        .then((res) => res.data)
        .then((res) => {
            return res
        })
        .catch((e) => {
            throw e.response
        })

const PUT_ADM = (url: string | void, params: object | Array<any> | void) =>
    apiAdm
        .put(url || '', params)
        .then((res) => res.data)
        .then((res) => {
            return res
        })
        .catch((e) => {
            throw e.response
        })

const DELETE = (url: string | void) =>
    api
        .delete(url || '')
        .then((res) => res.data)
        .then((res) => {
            return res
        })
        .catch((e) => {
            throw e.response
        })

const DELETE_ADM = (url: string | void) =>
    apiAdm
        .delete(url || '')
        .then((res) => res.data)
        .then((res) => {
            return res
        })
        .catch((e) => {
            throw e.response
        })

export { GET, POST, PUT, DELETE, GET_ADM, POST_ADM, PUT_ADM, DELETE_ADM, setBearerToken, setBearerTokenAdm }
