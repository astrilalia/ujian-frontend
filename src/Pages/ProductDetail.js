import React, { Component } from 'react'
// import Axios from 'axios'
// import { API_URL } from '../Support/API_URL'
import { Button } from 'reactstrap'
import Select from 'react-select'
import { fetchDataById } from '../Redux/Action'
import { connect } from 'react-redux'
import Loader from 'react-loader-spinner'

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
        ]
    }

    componentDidMount(){
        // pakai split untuk ambil angkanya aja
        let id = this.props.location.search.split('=')[1]
        //function ini menerima param id dari let id
        this.props.fetchDataById(id)
        // console.log(id)
        // Axios.get(`${API_URL}/products/${id}`)
        // .then((res) => {
        //     this.setState({
        //         data : res.data
        //     })
        //     console.log(this.state.data)
        // })
        // .catch((err) => {
        //     console.log(err)
        // })
    }

    render() {
        let { data } = this.props;
        if(this.props.loading){
            return(
                <div className='d-flex  justify-content-center'>
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
                    <div style={{width: '60%'}}>
                        <Select options={this.state.sizes}/>
                    </div>
                    <div>
                        <Button color="primary">Add To Cart</Button>
                    </div>
                </div>
            </div>
        )
    }
}

const mapStatetoProps = (state) => {
    return{
        data : state.product.productById,
        loading : state.product.loading
    }
}

export default connect(mapStatetoProps, { fetchDataById })(ProductDetail);