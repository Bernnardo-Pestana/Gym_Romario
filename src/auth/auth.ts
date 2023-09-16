export function setupAxios(axios: any) {
    axios.defaults.headers.Accept = 'application/json'
    axios.interceptors.request.use(
        (config: { headers: { Authorization: string } }) => {
            const auth = getAuth()
            if (auth && auth.api_token) {
                config.headers.Authorization = `Bearer ${auth.api_token}`
            }

            return config
        },
        (err: any) => Promise.reject(err)
    )
}

const getAuth = (): any | undefined => {
    if (!localStorage) {
        return
    }
}
