// ACTION CREATOR: function yang mereturn adalah object

// axios dimulai pas belajar redux-thunk.
import Axios from 'axios';
import { API_URL } from '../../Support/API_URL';

// export const Login = (data) => {
//     return{
//         // type gunanya untuk nentuin case mana yang mau dipakai direducer
//         type : 'LOGIN',
//         // payload gunanya untuk ngebawa apa yang mau diganti di reducer
//         payload : data
//     }
// }

export const Login = (username, password) => {
    //Disini ngereturn function yang manggil axios
    return(dispatch) =>
        // Data yang diambil dari axios mau ditaro di global state
        Axios.get(`${API_URL}/users?username=${username}&password=${password}`)
        .then((res) => {
            console.log(res.data)
            localStorage.setItem('token', JSON.stringify({username, password}))
            //function yang kasih action ke reducer
            dispatch({
                type: 'LOGIN',
                payload: res.data[0]
            })
        })
        .catch((err) => {
            console.log(err)
            dispatch({
                type: 'LOGOUT'
            })
        })
}

export const keepLogin = (token) => {
    return(dispatch) => {
        token = JSON.parse(token)
        let { username, password } = token;
        Axios.get(`${API_URL}/users?username=${username}&password=${password}`)
        .then((res) => {
            dispatch({
                type: 'LOGIN',
                payload: res.data[0]
            })
        })
        .catch((err) => {
            console.log(err)
            dispatch({
                type: 'LOGOUT'
            })
        })
    }
}

export const Logout = () => {
    return{
        type : 'LOGOUT'
    }
}