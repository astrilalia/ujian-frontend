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
            //bikin if untuk kalo login gagal
            if(res.data.length === 0){
                window.alert('Login Failed')
            }
            console.log(res.data)
            // localstorage= untuk nyimpan data biar tetep login
            localStorage.setItem('token', JSON.stringify({
                username: res.data[0].username,
                password: res.data[0].password,
                id: res.data[0].id,
                role: res.data[0].role
            }))
            //function yang kasih action ke reducer
            dispatch({
                type: 'LOGIN',
                payload: res.data[0]
            })
        })
        .catch((err) => {
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
            console.log(res.data)
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