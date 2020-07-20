// Etar kaz holo ekta object return kora ba kono kisu return kora
// payload ekta obejct
// authaction hote pare login, register, logout
import Axios from 'axios'
import jwtDecode from 'jwt-decode'
import * as Types from './types'
import setAuthToken from '../../utils/setAuthToken'

export const register = (user, history) => dispatch => {
    // export const register = (user, history) => {
    // return dispatch => {

    // }
    Axios.post('/api/users/register', user)
        .then((res) => {
            dispatch({
                type: Types.USERS_ERROR,
                payload: {
                    error: {}
                }
            })
            console.log(res)
            history.push('/login')
        })
        .catch(error => {
            dispatch({
                type: Types.USERS_ERROR,
                payload: {
                    error: error.response.data
                }
            })
        })
}

export const login = (user, history) => dispatch => {
    Axios.post('/api/users/login', user)
        .then(res => {
            // save our token to local storage
            // set auth header (Axios er header a add korar jonno)
            // decode token
            // dispatch set user
            let token = res.data.token
            localStorage.setItem('auth_token', token) // second argument obossy string prvide korte hobe jodio token ta already string. String na hole convert kore nite hoto.
            setAuthToken(token)
            let decode = jwtDecode(token)

            dispatch({
                type: Types.SET_USER,
                payload: {
                    user: decode
                }
            })
            history.push('/dashboard')
        })
        .catch(error => {
            dispatch({
                type: Types.USERS_ERROR,
                payload: {
                    error: error.response.data
                }
            })
        })
}

export const logout = history => {
    localStorage.removeItem('auth_token')
    history.push('/login')
    return {
        type: Types.SET_USER,
        payload: {
            user: {}
        }
    }
}