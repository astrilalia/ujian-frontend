import React, { useState } from 'react'
// useDispatch itu action creator dari Redux
import { useSelector, useDispatch } from 'react-redux';
import { Login } from '../Redux/Action'

const Review = () => {
    const [contoh, setContoh] = useState(0)
    // const logged = useSelector((state) => state.auth.logged)
    const logged = useSelector((state) => {
        return{
            logged: state.auth.logged,
            role: state.auth.role
        }
    })

    const dispatch = useDispatch()

const LoginHooks = () => {
    dispatch(Login({
        username : 'astrila',
        email : 'astrilaikhlasia@gmail.com',
        role : 'admin',
        password : '123'
    }))
}

    console.log(logged)
    return (
        <div>
            <input type='button' value='-' onClick={() => setContoh(contoh-1)}/>
            {contoh}
            {logged.role}
            <input type='button' value='+' onClick={() => setContoh(contoh+1)}/>
            <input type='button' value='Login' onClick={LoginHooks}/>
        </div>
    );
}

export default Review;