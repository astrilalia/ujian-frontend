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

    modalBtn = () => {
        return this.state.data.map((val)=> {
            return(
                // Swal.fire({
                //     title: '<strong></strong>',
                //     icon: 'info',
                //     html:
                //       'You can use <b>bold</b>, ' +
                //       '<a href="//sweetalert2.github.io">links</a> ' +
                //       'and other HTML tags',
                //     showCloseButton: true,
                //     showCancelButton: true,
                //     focusConfirm: false,
                //     confirmButtonText:
                //       '<i class="fa fa-thumbs-up"></i> Mantap!',
                //     confirmButtonAriaLabel: 'Thumbs up, great!'
                //   })
                <ModalDetail
                id = {val.id}
                name = {val.name}
                image = {val.image}
                size = {val.size}
                quantity = {val.qty}
                price = {val.total}
                />
            )
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
                        <Button onClick={() => this.modalBtn()}>
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