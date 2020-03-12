import React, { Component } from 'react';
import './App.css';
import Home from './Pages/Home';
import { Route } from 'react-router-dom';
import Header from './Components/Header';
import Footer from './Components/Footer';
import LoginPage from './Pages/LoginPage';
// import RegisterPage from './Pages/RegisterPage'
import RegisterPage from './Pages/RegisterHooks';
import ProductPage from './Pages/ProductPage';
import LatihanAxios from './Pages/LatihanAxios';
import Review from './Pages/Review';
import ProductDetail from './Pages/ProductDetail';
// import Axios from 'axios';
// import { API_URL } from './Support/API_URL';
import { Login, keepLogin } from './Redux/Action';
import { connect } from 'react-redux';
import ManageProduct from './Pages/ManageProduct'

class App extends Component{

  //untuk menyimpan data user di semua local storage halaman website
  componentDidMount(){
    let token = localStorage.getItem('token')
    if(token){
      this.props.keepLogin(token)
    }
    //Dicomment pas belajar reduxthunk

    // let token = localStorage.getItem('username')
    // if(token) {
    //   // di parse untuk dapetin jadi object lagi
    //   // console.log(JSON.parse(token))
    //   let tokenParse = JSON.parse(token)
    //   Axios.get(`${API_URL}/users?username=${tokenParse.username}&password=${tokenParse.password}`)
    //   .then((res) => {
    //     // console.log(res.data)
    //     let { username, email, role, id } = res.data[0]
    //     this.props.Login({
    //       username,
    //       email,
    //       role,
    //       id
    //     })
    //   })
    //   .catch((err) => {
    //     console.log(err)
    //   })
    // }
  }

  render(){
    return(
      <div>
        <Header />
        <Route path='/' component={Home} exact/>
        <Route path='/login' component={LoginPage} />
        <Route path='/register' component={RegisterPage} />
        <Route path='/products' component={ProductPage} />
        <Route path='/latihan' component={LatihanAxios} />
        <Route path='/review' component={Review} />
        <Route path='/product-detail' component={ProductDetail} />
        <Route path='/manage-product' component={ManageProduct} />
        <Footer/>
      </div>
    )
  }
}

export default connect(null, { Login, keepLogin })(App);