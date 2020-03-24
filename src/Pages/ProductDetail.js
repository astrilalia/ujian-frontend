import React, { Component } from 'react'
// import Axios from 'axios'
// import { API_URL } from '../Support/API_URL'
import { Button } from 'reactstrap'
import Select from 'react-select'
import { fetchDataById } from '../Redux/Action'
import { connect } from 'react-redux'
import Loader from 'react-loader-spinner'
import Axios from 'axios'
import { API_URL } from '../Support/API_URL'
import Swal from 'sweetalert2'
import { Link } from 'react-router-dom'

class ProductDetail extends Component {
    state = {
        data : {},
        sizes : [
            {
                value: 40,
                label: 40
            },
            {
                value: 41,
                label: 41
            },
            {
                value: 42,
                label: 42
            },
            {
                value: 43,
                label: 43
            },
            {
                value: 44,
                label: 44
            },
            {
                value: 45,
                label: 45
            }
        ],
        qty : [
            { value: 1, label: 1 },
            { value: 2, label: 2 },
            { value: 3, label: 3 },
            { value: 4, label: 4 },
            { value: 5, label: 5 },
            { value: 6, label: 6 },
            { value: 7, label: 7 },
            { value: 8, label: 8 },
            { value: 9, label: 9 },
            { value: 10, label: 10 }
        ],
        sizeValue: 0,
        quantityValue: 0
    }

    componentDidMount(){
        // pakai split untuk ambil angkanya aja
        let id = this.props.location.search.split('=')[1]

        // //function ini menerima param id dari let id
        // this.props.fetchDataById(id)
        // console.log(id)
        Axios.get(`${API_URL}/products/${id}`)
        .then((res) => {
            this.setState({
                data : res.data
            })
            console.log(this.state.data)
        })
        .catch((err) => {
            console.log(err)
        })
    }

    selectedSize = (num) => {
        let size = num.value
        if (size !== 0){
            this.setState({
                sizeValue: size
            })
        }
    }

    selectedQty = (val) => {
        let quantity = val.value
        // console.log(val.value)
        if(quantity !== 0){
            this.setState({
                quantityValue: quantity
            })
        }
    }

    //ini function untuk nambah data ke JSON Cart
    addToCart = () => {
        let { name, id, price, image, category, brand } = this.state.data
        let obj = {
            name,
            price,
            size: this.state.sizeValue,
            qty: this.state.quantityValue,
            image,
            category,
            brand,
            userID: this.props.userId,
            productID: id
        }

        Axios.post(`${API_URL}/cart`, obj)
        .then((res)=> {
            console.log(res.data)
            this.setState({
                data : res.data
            })
            Swal.fire({
                icon: 'success',
                title: 'Berhasil!',
                text: 'Pesanan sudah disimpan!'
            })
        .catch((err) => {
            console.log(err)
        })
        })
        .catch((err)=> {

        })

        
    }

    render() {
        let { data } = this.state;
        if(this.props.loading){
            return(
                <div className='d-flex justify-content-center'>
                <Loader type="Watch" color="#somecolor" height={80} width={80} />
            </div>
            )
        }
        return(
            <div className='row'>
                <div className='col-5' style={{border: '1px solid black'}}>
                    <img src={data.image} alt='sepatu' width='400px'/> 
                </div>
                <div className='col-5'>
                    <div style={{}}>
                        <h3>    
                            {data.name}
                        </h3>
                    </div>
                    <div>
                        {data.brand}
                    </div>
                    <div>
                        {data.category}
                    </div>
                    <div>
                        Rp.
                        {
                            data.price
                            ?
                            data.price.toLocaleString('id-ID')
                            :
                            null
                        }
                    </div>
                    <br/>
                    <div>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Elementum eu facilisis sed odio morbi quis commodo odio. Etiam dignissim diam quis enim lobortis.
                    </div>
                    <br></br>
                    <div style={{width: '60%'}}>
                        Size:<Select options={this.state.sizes} placeholder="40" onChange={this.selectedSize}/>
                        Quantity:<Select options={this.state.qty} placeholder="1" onChange={this.selectedQty}/>
                    </div>
                    <br></br>
                    <div>
                        <Link to='./cart'>
                            <Button color="primary" onClick={this.addToCart}>Add To Cart</Button>
                        </Link>
                    </div>
                </div>
            </div>
        )
    }
}

const mapStatetoProps = (state) => {
    return{
        data : state.product.productById,
        loading : state.product.loading,
        userId : state.auth.id
    }
}

export default connect(mapStatetoProps, { fetchDataById })(ProductDetail);