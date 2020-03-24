import React, { Component } from 'react';
import { Table, Button, Input } from 'reactstrap';
import Axios from 'axios';
import { API_URL } from '../Support/API_URL';
import Swal from 'sweetalert2'

class ManageProduct extends Component{
    state ={
        data : [],
        //ini properti untuk simpen id untuk dipake sebagai pengkondisian dalam suatu function
        selectedId : null
    }

    //karena mau ambil data pake componentDidMount
    componentDidMount(){
        let token = localStorage.getItem('token')
        let role = JSON.parse(token)
        Axios.get(`${API_URL}/users`)
        .then((res) => {
            console.log(role.role)
            if(res.data[1].role === role.role){
                this.fetchData()
            } else {
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: 'Kamu bukan admin!'
                })
            }
        })
    }

    fetchData = () => {
        Axios.get(`${API_URL}/products`)
        .then((res) => {
            this.setState({
                data : res.data
            })
            // console.log(this.state.data)
        })
        .catch((err) => {
            console.log(err)
        })
    }

    selectEdit = (id) => {
        this.setState({
            selectedId : id
        })
    }

    // Buat save data
    // pake input reactstrap
    confirmEdit = (id) => {
        let name = this.editName.value;
        let brand = this.editBrand.value;
        let price = parseInt(this.editPrice.value);
        let category = this.editCategory.value;
        let image = this.editImage.value;

        let productDataEdit = {
            name,
            brand,
            price,
            category,
            image
        }
        
        Axios.patch(`${API_URL}/products/${id}`, productDataEdit)
        .then((res) => {
            console.log(res.data)
            this.fetchData()
            this.setState({
                selectedId : null
            })
            Swal.fire(
                'Data tersimpan!',
                'Data telah berubah!',
                'success'
            )
        })
        .catch((err) => {
            console.log(err)
        })
    }

    // Buat nambah data
    // pake input html
    addProduct = () => {
        let name = this.refs.name.value;
        let brand = this.refs.brand.value;
        let price = parseInt(this.refs.price.value);
        let category = this.refs.category.value;
        let image = this.refs.image.value;

        let productData = {
            name,
            brand,
            price,
            category,
            image
        }
        Axios.post(`${API_URL}/products`, productData)
        .then((res) => {
            console.log(res.data)
            this.fetchData()
            Swal.fire(
                'Berhasil!',
                'Data berhasil ditambah!',
                'success'
            )
        })
        .catch((err) => {
            console.log(err)
        })
    }

    // Buat hapus data
    deleteData = (id, image) => {
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            imageUrl: image,
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        }).then((result) => {
            if (result.value) {
                Axios.delete(`${API_URL}/products/${id}`)
                .then((res) => {
                    console.log(res.data)
                    this.fetchData()
                    Swal.fire(
                        'Deleted!',
                        'Your file has been deleted.',
                        'success'
                    )
                })
                .catch((err) => {
                    console.log(err)
                })
            }
        })
    }

    renderTable(){
        return this.state.data.map((val) => {
            //bikin if untuk ngerender input box
            if (val.id === this.state.selectedId){
                return(
                    <tr>
                        <td>{val.id}</td>
                        <td>
                            <Input defaultValue={val.name} innerRef={(editName) => this.editName = editName}/>
                        </td>
                        <td>
                            <Input defaultValue={val.brand} innerRef={(editBrand) => this.editBrand = editBrand}/>
                        </td>
                        <td>
                            <Input defaultValue={val.price} type='number' innerRef={(editPrice) => this.editPrice = editPrice}/>
                        </td>
                        <td>
                            <Input defaultValue={val.category} innerRef={(editCategory) => this.editCategory = editCategory}/>
                        </td>
                        <td>
                            <Input defaultValue={val.image} innerRef={(editImage) => this.editImage = editImage}/>
                        </td>
                        <td>
                            <Button color='danger' onClick={() => this.setState({selectedId : null})}>
                                Cancel
                            </Button>
                        </td>
                        <td>
                            <Button color='primary' onClick={() => this.confirmEdit(val.id)}>
                                Save
                            </Button>
                        </td>
                    </tr>
                )
            }
            return(
                <tr style={{fontWeight: 'bold'}}>
                    <td>{val.id}</td>
                    <td>{val.name}</td>
                    <td>{val.brand}</td>
                    <td>{val.price}</td>
                    <td>{val.category}</td>
                    <td><img src={val.image} alt={val.name} height='160px' width='200px'/></td>
                    <td>
                        <Button color='success' onClick={() => this.selectEdit(val.id)}>
                            Edit
                        </Button>
                    </td>
                    <td>
                        <Button color='danger' onClick={() => this.deleteData(val.id, val.image)}>
                            Delete
                        </Button>
                    </td>
                </tr>
            )
        })
    }

    render(){
        return(
            <div>
                <Table>
                    <thead>
                        <tr>
                            <th>Id</th>
                            <th>Name</th>
                            <th>Brand</th>
                            <th>Price</th>
                            <th>Category</th>
                            <th>Image</th>
                            <th colSpan='2'>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.renderTable()}
                    </tbody>
                    {/* <tfoot>
                        <tr>
                            <td></td>    
                            <td><input type='text' ref='name' placeholder='Name'/></td>
                            <td><input type='text' ref='brand' placeholder='Brand'/></td>
                            <td><input type='number' ref='price' placeholder='Price'/></td>
                            <td>
                                <select ref='category'>
                                    <option>Men</option>
                                    <option>Women</option>
                                    <option>Kids</option>
                                </select>
                            </td>
                            <td><input type='text' ref='image' placeholder='Image'/></td>
                            <td>
                                <Button color='primary' onClick={this.addProduct}>
                                    Add Product
                                </Button>
                            </td>
                        </tr>
                    </tfoot> */}
                </Table>
            </div>
        )
    }
}

export default ManageProduct;