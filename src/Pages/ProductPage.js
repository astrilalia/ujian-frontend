import React, { Component } from 'react';
import ProductCard from '../Components/ProductCard'
// import Axios from 'axios';
// import { API_URL } from '../Support/API_URL';
import { Link } from 'react-router-dom';
import { fetchProducts } from '../Redux/Action';
import { connect } from 'react-redux';
import Loader from 'react-loader-spinner'

class Product extends Component{
    state={ 
        data : []   
    }
    
    componentDidMount =()=>{
        this.props.fetchProducts()
        // Axios.get(`${API_URL}/products`)
        // .then((res) => {
        //     this.setState({
        //         data : res.data
        //     })
        // })
        // .catch((err) => {
        //     console.log(err)       
        // })
    }
    
    renderProductCard = () => {
        return this.props.product.map((val) => {
            return (
                <div>
                    <Link to={`/product-detail?id=${val.id}`}>
                        <ProductCard 
                        image = {val.image}
                        name = {val.name}
                        brand = {val.brand}
                        price= {val.price}
                        />
                    </Link>
                </div>
            )
        })
    }

render () {
    if(this.props.error){
        return(
            <div>
                error
            </div>
        )
    }
    if(this.props.loading){
        return(
            <div className='d-flex  justify-content-center'>
                <Loader type="Circle" color="#somecolor" height={80} width={80} />
            </div>
        )
    }
    return(
        <div className='d-flex'>
            <div style={{display:'flex', justifyContent:'center'}}>
                {this.renderProductCard()}
            </div>
        </div>
    )
}
}

const mapStatetoProps = (state) => {
    return{
        product : state.product.productList,
        loading : state.product.loading,
        error : state.product.error
    }
}

export default connect(mapStatetoProps, { fetchProducts })(Product)