import React, { Component } from 'react';
import { Table, Button } from 'reactstrap';
import Axios from 'axios';
import { API_URL } from '../Support/API_URL';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import Swal from 'sweetalert2'


class Cart extends Component{
    state={ 
        data: [],
        total : 0
    }

    componentDidMount = () => {
        this.setState({
            total: 0
        })
        let token = localStorage.getItem('token')
        let tokenUser = JSON.parse(token)
        console.log(tokenUser)
        Axios.get(`${API_URL}/cart?userID=${tokenUser.id}`)
        .then((res) => {
            this.setState({
                data: res.data
            })
            this.fetchData()
            this.countGrandTotal()
        })
        .catch((err)=> {
            console.log(err)
        })
    }

    componentWillUnmount = () => {
        this.setState({ total: 0 })
    }

    fetchData = () => {
        Axios.get(`${API_URL}/cart`)
        .then((res) => {
            this.setState({
                data: res.data
            })
        })
        .catch((err) => {
            console.log(err)
        })
    }

    countGrandTotal = () => {
        // console.log(this.state.data)
        this.state.data.forEach(val => {
			this.setState(prevState => {
				// console.log(prevState)
				return {
					total: prevState.total + (val.price * val.qty)
				}
			})
		})
    }

    deleteProduct = (id, angka) => {
        Swal.fire({
			title: 'Yakin mau dihapus?',
			text: "Pesananmu tidak akan kembali!",
			icon: 'warning',
			showCancelButton: true,
			confirmButtonColor: '#3085d6',
			cancelButtonColor: '#d33',
			confirmButtonText: 'Yes, delete it!'
		}).then(result => {
			if (result.value) {
				Axios.delete(`${API_URL}/cart/${id}`)
					.then(() => {
						// console.log(res)
						this.fetchData()
						Swal.fire(
							'Deleted!',
							'Your file has been deleted.',
							'success'
						)
					})
			}
		})
    }

    handleBtn = (id, angka) => {
        Axios.get(`${API_URL}/cart?userID=${this.props.userID}&id=${id}`)
        .then((res) => {
            console.log(res.data[0].qty)
            Axios.patch(`${API_URL}/cart/${res.data[0].id}`, {qty:res.data[0].qty + angka})
            .then((res) => {
                // console.log(res.data)
                this.fetchData()
                if (res.data.count === 0) {
                    this.deleteData(id, angka)
                }
            })
            .catch((err) => {
                console.log(err)
            })
        })
        .catch((err) => {
            // console.log(err)
        })
    }

    addToTransaction = () => {
        Axios.get(`${API_URL}/cart?userID=${this.props.userID}`)
        .then((res) => {
            console.log(res.data)
            let date = new Date()
            let time = `${date.getDate()}/${date.getMonth()}/${date.getFullYear()}`
            let obj = {
            date: time,
            total: this.state.total,
            items: res.data,
            userID: this.props.userID
            }
            Axios.post(`${API_URL}/transaction`, obj)
            .then((res) => {
                // console.log(res)
            })
            .catch((err) => {
                console.log(err)
            })
            res.data.forEach(val => {
                Axios.delete(`${API_URL}/cart/${val.id}`)
                    .then(res => {
                        console.log(res)
                    })
                    .catch(err => console.log(err))
            })
        })
        .catch((err) => {
            console.log(err)
        })
        
    }

    renderTable(){
        return this.state.data.map((val) => {
            return(
                <tr key={val.id}>
                    <td>{val.id}</td>
                    <td>{val.name}</td>
                    <td><img src={val.image} alt={val.name} height='80px' width='120px'/></td>
                    <td>{val.size}</td>
                    <td>
                        <div>
                            <Button color='info' onClick={() => this.handleBtn(val.id, -1)}>-</Button>
                            <span>{val.qty}</span>
                            <Button color='info' onClick={() => this.handleBtn(val.id, 1)}>+</Button>
                        </div>
                    </td>
                    <td>Rp {(val.price * val.qty).toLocaleString('id-ID')}</td>
                    <td>
                        <Button color="danger" onClick={() => this.deleteProduct(val.id)}>Delete</Button>
                    </td>
                </tr>
            )
        })
    }

    render(){
        return(
            <div>
                <h3>Your Cart</h3>
                <Table>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Name</th>
                            <th>Image</th>
                            <th>Size</th>
                            <th>Quantity</th>
                            <th>Price</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.renderTable()}
                    </tbody>
                    <tfoot>
                        <tr>
                            <th colSpan='5' style={{ textAlign: "right"}}>Grand Total</th>
                            <th>Rp {(this.state.total).toLocaleString('id-ID')}</th>
                            <th>
                                <Link to='./transaction'>
                                    <Button color="primary" onClick={this.addToTransaction}>Check Out</Button>
                                </Link>
                            </th>
                        </tr>
                    </tfoot>
                </Table>
            </div>
        )
    }
}

const mapStatetoProps = (state) => {
    return{
        userID: state.auth.id
    }
}

export default connect(mapStatetoProps)(Cart)