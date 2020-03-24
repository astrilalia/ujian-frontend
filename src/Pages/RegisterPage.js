import React, { Component } from 'react';
import { Input, FormGroup, Label, Form, Button } from 'reactstrap';
import { Link, Redirect } from 'react-router-dom';
import axios from 'axios'
import { API_URL } from '../Support/API_URL';
import { connect } from 'react-redux';
import { Login } from '../Redux/Action';
import ReactPasswordStrength from 'react-password-strength';

class LoginPage extends Component {
    state = {  }

    // #1 bikin data dulu
    onBtnRegister = () => {
        let username = this.username.value;
        let email = this.email.value;
        let password = this.password.value;
        let confirmPass = this.confirmPass.value;

        // #2 untuk proteksi agar passwordnya bener
        if (password === confirmPass){
            axios.get(`${API_URL}/users?username=${username}`)
            .then((res) => {
                // #3 untuk melihat apakah usernamenya sudah ada atau belum?
                if(res.data.length > 0){
                    window.alert('Username already exists')
                // #4 Berarti res.data === 0, data baru dan ditambah ke database
                }else{
                    // #5 pakai param kedua, untuk menampilkan apa yang mau dipost: object username, dll.
                    axios.post(`${API_URL}/users`, {
                        username,
                        email,
                        password,
                        role : 'user'
                    })
                    // axios selalu ngereturn promise. Untuk menentukan gimana kondisi pengambilan data
                    // #6 jika berhasil dipost, ambil lagi dengan .then untuk diloginin sehingga langsung masuk home
                    .then((res) => {
                        console.log(res.data)
                        let { username, email, role, id } = res.data;

                        //untuk isi global state, buat nandain user udah login
                        this.props.Login({
                            username,
                            email,
                            role,
                            id
                        })
                    })
                }
            })
            .catch((err) => {
                console.log(err)
            })
        }else{
            window.alert('Invalid Password')
        }
    }
//Edit input, ditambah innerRef
    render() {
        // #7 jika sudah login, maka masuk ke sini -> langsung dikirim ke Home
        if(this.props.logged){
            return(
                <Redirect to='/'/>
            )
        }
        return ( 
            <div className='d-flex justify-content-center' style={{height : '100vh', alignItems : 'center'}}>
                <Form style={{width : '400px', height: '400px'}}>
                    <FormGroup>
                        <Label for="exampleEmail">Username</Label>
                        <Input type="text" name="email" id="exampleEmail" placeholder="Username" innerRef={(username) => this.username = username}/>
                    </FormGroup>
                    <FormGroup>
                        <Label for="examplePassword">Email</Label>
                        <Input type="text" name="password" id="examplePassword" placeholder="Email" innerRef={(email) => this.email = email}/>
                    </FormGroup>
                    <FormGroup>
                        <Label for="examplePassword">Password</Label>
                        <Input type="password" name="password" id="examplePassword" placeholder="Password" innerRef={(password) => this.password = password}/>
                        <ReactPasswordStrength
                        className="customClass"
                        style={{ display: 'none' }}
                        minLength={5}
                        minScore={2}
                        scoreWords={['weak', 'okay', 'good', 'strong', 'stronger']}
                        changeCallback={foo}
                        inputProps={{ name: "password_input", autoComplete: "off", className: "form-control" }}
                        />
                    </FormGroup>
                    <FormGroup>
                        <Label for="examplePassword">Confirm Password</Label>
                        <Input type="password" name="password" id="examplePassword" placeholder="Password" innerRef={(confirmPass) => this.confirmPass = confirmPass}/>
                    </FormGroup>
                    <div style={{display: 'flex', justifyContent: 'space-around'}}>
                        <Button onClick={this.onBtnRegister}>
                            Register
                        </Button>
                        <Link to='/login'>
                            <Button>
                                Login
                            </Button>
                        </Link>
                    </div>
                </Form>
            </div>
        );
    }
}

const mapStatetoProps = (state) => {
    return{
        logged : state.auth.logged
    }
}

export default connect(mapStatetoProps, { Login })(LoginPage);