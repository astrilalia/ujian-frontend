import React, { Component } from 'react'
import Axios from 'axios'
// import DropdownLatihan from '../Components/DropdownLatihan'

class LatihanAxios extends Component{
    // lokal state
    state = {
        data : [],
        idData : 1,
        form : {
            nama : '',
            boolean : '',
            laptop : ''
        }
    }

    // ambil data dari API gratis pakai axios
    componentDidMount = () => {
        // Axios.get(`http://jsonplaceholder.typicode.com/posts`)
        // .then((res) => {
        //     console.log(res)
        //     // untuk mengganti isi properti data
        //     this.setState ({
        //         data : res.data
        //     })
        // })
        // .catch((err) => {
        //     console.log(err)
        // })

        this.fetchData()
    }

    fetchData =() => {
        Axios.get('http://localhost:2000/latihan')
        .then((res) => {
            this.setState({
                data : res.data
            })
        })
        .catch((err) => {
            console.log(err)
        })
    }

    // bikin function buat nambah data ke JSON
    onBtnAddData = () => {
        let { nama, boolean, laptop } = this.state.form
        // param 1 untuk ambil data, param dua untuk kasih data
        Axios.post('http://localhost:2000/latihan', { nama, boolean, laptop })
        .then((res) => {
            console.log(res, 'ini post')
            this.fetchData()
        })
        .catch((err) => {

        })
    }

    // bikin function buat edit data di JSON
    onBtnEditData = () => {
        // ini nama baru yang gantiin
        // let nama = this.refs.nama.value; <= buat ganti table nama

        // nama variable ini adalah nama properti object (nama, boolean, laptop)
        let { nama, boolean, laptop } = this.state.form;
        // properti dalam ini sudah diganti sesuai onChange

        //patch untuk ganti nama. param dua nentuin data mana yang diubah var name = this.state.form.nama
        let obj = {}
        if (nama){
            obj.nama = nama
        }
        if (boolean){
            obj.boolean = boolean
        }
        if (laptop){
            obj.laptop = laptop
        }
        // kalo yang diganti cuma nama, maka properti yang bertambah dalam obj cuma if(nama). Jadi boolean sama laptop masih pakai data sebelumnya.
        // Ingat! Patch itu untuk ganti isi data!
        Axios.patch(`http://localhost:2000/latihan/${this.state.idData}`, obj)
        .then((res) => {
            console.log(res)

            this.fetchData()
        })
        .catch((err) => {
            console.log(err)
        })
        
        
    }

    // param 2 untuk meniban semua data yang diedit dan menghilangkan properti yang ga dipanggil
    onBtnEditDataPut = () => {
        let { nama, boolean, laptop } = this.state.form
        Axios.put(`http://localhost:2000/latihan/${this.state.idData}`, { nama, boolean, laptop })
            .then((res) => {
                console.log(res)
                this.fetchData()
            })
            .catch((err) => {
                console.log(err)
            })
    }

    onBtnDeleteData = () => {
        Axios.delete(`http://localhost:2000/latihan/${this.state.idData}`)
        .then((res) => {
            console.log(res)
            this.fetchData()
        })
        .catch((err) => {
            console.log(err)
        })
    }

    onBtnDeleteDataAll = () => {
        // return this.state.data.map((val) => {
        //     return Axios.delete(`http://localhost:2000/latihan/${val.id}`)
        //     .then((res) => {
                Axios.get('http://localhost:2000/latihan')
                .then((res) => {
                    console.log(res)
                    res.data.forEach((val) => {
                        Axios.delete(`http://localhost:2000/latihan/${val.id}`)
                        .then((res) => {
                            console.log(res)
                        })
                        .catch((err) => {
                            console.log(err )
                        })
                    })
                })
                this.fetchData()
        //     })
        //     .catch((err) => {
        //         console.log(err)
        //     })
        // })
    }

    // renderDropdown = () => {
    //     return this.state.data.map((val, index) => {
    //         return(
    //             <div key={index}>
    //                 {val.id}
    //             </div>
    //         )
    //     })
    // }

    renderSelect = () => {
        return this.state.data.map ((val) => {
            return(
                <option value={val.id} key={val.id}>
                    {val.id}
                </option>
            )
        })
    }

    // renderData = () => {
    //     // harus di map karena object gabisa dirender.
    //     return this.state.data.map((val, index) => {
    //         return(
    //             <div key={index} style={{border : "1px solid black", width : '100px'}}>
    //                 <div>{val.id}. {val.nama}</div>
    //             </div>
    //         )
    //     })
    // }

    handleChange = (e) => {
        this.setState({
            form : {
                ...this.state.form,
                [e.target.id] : e.target.value
            }
        })
    }

    render() {
        console.log(this.state.form)
        console.log(this.state.idData)
        return (
            <div>
                Ini halaman latihan
                <div>
                    {/* <DropdownLatihan id={this.renderDropdown()}/> */}
                    {/* e itu function bawaan dari react untuk event onChange
                    pakai e supaya ngejalanin setstate sekali. kalo ga pake nanti ngeloop */}
                    <select onChange= {(e)=> this.setState({idData:e.target.value})}>
                        {this.renderSelect()}
                    </select>
                    {/* {this.renderData()} */}
                </div>
                <div>
                    <table>
                        <thead>
                            <tr style ={{border: "1px solid black"}}>
                                <th style ={{border: "1px solid black"}}>Id</th>
                                <th style ={{border: "1px solid black"}}>Nama</th>
                                <th style ={{border: "1px solid black"}}>Boolean</th>
                                <th style ={{border: "1px solid black"}}>Laptop</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                this.state.data.map((val) => {
                                    return(
                                        <tr style ={{border: "1px solid black"}}>
                                            <td style ={{border: "1px solid black"}}>{val.id}</td>
                                            <td style ={{border: "1px solid black"}}>{val.nama}</td>
                                            <td style ={{border: "1px solid black"}}>{val.boolean}</td>
                                            <td style ={{border: "1px solid black"}}>{val.laptop}</td>
                                        </tr>
                                    )
                                })
                            }
                        </tbody>
                    </table>
                </div>
                <div>
                    <input type='text' ref='nama' placeholder='Nama' onChange={this.handleChange} id='nama'/>
                    <input type='text' ref='boolean' placeholder='Boolean' onChange={this.handleChange} id='boolean'/>
                    <input type='text' ref='laptop' placeholder='Laptop' onChange={this.handleChange} id='laptop'/>

                    <input type='button' value='Add' onClick={this.onBtnAddData}/>
                    <input type='button' value='Edit' onClick={this.onBtnEditData}/>
                    <input type='button' value='EditPut' onClick={this.onBtnEditDataPut}/>
                    <input type='button' value='Delete' onClick={this.onBtnDeleteData}/>
                    <input type='button' value='DeleteAll' onClick={this.onBtnDeleteDataAll}/>
                </div>
            </div>
        )
    }
    
}

export default LatihanAxios