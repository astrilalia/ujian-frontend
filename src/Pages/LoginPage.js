import React, { Component } from 'react';
import { Input, FormGroup, Label, Form, Button } from 'reactstrap';
import { Link } from 'react-router-dom';
// import axios from 'axios'
// Connect dipakai untuk menghubungi dan mengganti isi global state.
import { connect } from 'react-redux';
import { Login } from '../Redux/Action';
import { Redirect } from 'react-router-dom';
// import { API_URL } from '../Support/API_URL'

class LoginPage extends Component {
    state = {  }

    onBtnLogin = () => {
        let username = this.username.value;
        let password = this.password.value;

        this.props.Login(username, password);
    
        // // untuk ambil data, untuk kontak API, API untuk mengambil database url
        // // username dan password sifatnya dinamis, tergantung isian user
        // axios.get(`${API_URL}/users?username=${username}&password=${password}`)
        // // kalo API berhasil dapat data maka masuk .then
        // .then((res) => {
        //     // kalo dapet data, bentuk datanya adalah res.data
        //     console.log(res.data)
        //     // kalo username dan passwordnya ga sync, maka gagal
        //     if(res.data.length === 0){
        //         window.alert('User does not Exist')
        //     /* kalo sync, maka datanya berhasil kita ambil. Lalu kita loginin pakai action creator. Untuk 
        //     isi global state dan nandain bahwa user telah login*/
        //     }else{
        //         let {id, username, email, role, password } = res.data[0]

        //         //untuk isi global state, buat nandain user udah login
        //         this.props.Login({
        //             id,
        //             username,
        //             email,
        //             role
        //         })
        //         // setelah berhasil login, maka semua data itu disimpen di local storage
        //         // stringify untuk membuat [object, object] bisa dibaca jadi object dalam bentuk string
        //        localStorage.setItem('username', JSON.stringify({username, password}))
        //     }
        // })
        // // kalo API gagal ambil data, maka masuk .catch
        // .catch ((err) => {
        //     console.log(err)
        // })
    }

    render() { 
        if (this.props.logged){
            return(
                <Redirect to='/'/>
            )
        }
        console.log(this.props.logged)
        return ( 
            <div className='d-flex justify-content-center' style={{height : '100vh', alignItems : 'center'}}>
                <Form style={{width : '400px', height: '400px'}}>
                    <FormGroup>
                      <Label for="exampleEmail">Username</Label>
                      <Input type="text" name="email" id="exampleEmail" placeholder="Username" innerRef={(username) => this.username = username} />
                    </FormGroup>
                    <FormGroup>
                      <Label for="examplePassword">Password</Label>
                      <Input type="password" name="password" id="examplePassword" placeholder="Password" innerRef={(password) => this.password = password} />
                    </FormGroup>
                    <div style={{display: 'flex', justifyContent: 'space-around'}}>
                        <Button onClick={this.onBtnLogin}>
                            Login
                        </Button>
                        <Link to='/register'>
                            <Button>
                                Register
                            </Button>
                        </Link>
                    </div>
                </Form>
            </div>
        );
    }
}

//Function untuk ambil data dari Global State
const mapStateofProps = (state) => {
    return{
        logged : state.auth.logged
    }
}
 
export default connect(mapStateofProps, { Login })(LoginPage);