import React, { Component } from 'react';
import { Table, Button } from 'reactstrap';
import Axios from 'axios';
import { API_URL } from '../Support/API_URL';
import ModalDetail from '../Components/ModalDetail'
// import Swal from 'sweetalert2'

class Transaction extends Component{
    state={
        data: []
    }

    componentDidMount = () =>{
        let token = localStorage.getItem('token')
        // console.log(token)
        let userID = JSON.parse(token)
        this.fetchData(userID.id)
    }

    fetchData = (userID) => {
        Axios.get(`${API_URL}/transaction?userID=${userID}`)
        .then((res) => {
            // console.log(res.data)
            this.setState({
                data: res.data
            })
        })
        .catch((err) => {
            console.log(err)
        })
    }

    modalBtn = (items, date, id, total) => {
        let innerHTML = `<strong><p>ID: ${id}</p><p>Tanggal: ${date}</p></strong>`
        items.forEach((val) => {
            innerHTML += `<img width='30%' src='${val.image}' alt='foto'/>
            <h5>${val.name}</h5>
            <p>Size: ${val.size}</p>
            <p>Quantity: ${val.qty} (@ Rp.${val.price.toLocaleString()})</p>
            <p>Subtotal: Rp. ${(val.qty * val.price).toLocaleString()}</p>
            <hr/>
            `
        })
        Swal.fire({
            html: innerHTML + `<strong><p>Total: Rp. ${(total).toLocaleString()}</p></strong>`,
            confirmButtonText:
            '<i class="fa fa-thumbs-up"></i> Mantap!',
            confirmButtonAriaLabel: 'Thumbs up, great!'
        })   
    }

    renderTable(){
        console.log(this.state.data)
        return this.state.data.map((val) => {
            return(
                <tr key={val.id}>
                    <td>{val.id}</td>
                    <td>{val.date}</td>
                    <td>Rp {(val.total.toLocaleString('id-ID'))}</td>
                    <td>
                        <Button onClick={() => this.modalBtn(val.items, val.date, val.id, val.total)}>
                            Details
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
                            <th>id</th>
                            <th>Date</th>
                            <th>Total</th>
                            <th>Details</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.renderTable()}
                    </tbody>
                </Table>
            </div>
        )
    }
}

export default Transaction
