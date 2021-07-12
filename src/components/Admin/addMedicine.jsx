import React, { useState } from 'react';
import Admin from '.';
import "./addMedicine.css";
import { connect } from 'react-redux'
import { addMedicine } from '../../actions/index'



const AddMedicine = ({ add_medicine_to_inventory }) => {
    const [medicineName, setMedicineName] = useState('')
    const [manufacturerName, setManufacturerName] = useState('')
    const [price, setPrice] = useState(0)
    const [stock, setStock] = useState(0)
    const [discount, setDiscount] = useState(0)


    const handleFormSubmit = (e) => {
        const medicineDetails = { medicineName: medicineName, manufacturerName: manufacturerName, price: price, stock: stock, discount: discount, medicineId: Math.floor((Math.random() * 100000000) + 1) }

        e.preventDefault();
        e.target[0].value = ''
        e.target[1].value = ''
        e.target[2].value = ''
        e.target[3].value = ''
        e.target[4].value = ''

        add_medicine_to_inventory(medicineDetails)
        var inventoryList = JSON.parse(localStorage.getItem('inventoryList')) || [];
        inventoryList.push(medicineDetails);
        localStorage.setItem('inventoryList', JSON.stringify(inventoryList));
    }



    return (<div>
        <Admin />
        <h1 style={{ margin: "20px", textAlign: "center", marginLeft: "14%" }}>Medicine Details</h1>
        <form className="add_medicine_form" onSubmit={handleFormSubmit}>
            <div className="form-group">
                <label htmlFor="medicineName">Medicine Name</label>
                <input type="text" className="form-control" id="medicineName" placeholder="Medicine name" onChange={(e) => { setMedicineName(e.target.value) }} />
            </div>
            <div className="form-group">
                <label htmlFor="manufacturerName">Manufacturer Name</label>
                <input type="text" className="form-control" id="manufacturerName" placeholder="Manufacturer Name" onChange={(e) => { setManufacturerName(e.target.value) }} />
            </div>
            <div className="form-group">
                <label htmlFor="medicinePrice">Price(INR)</label>
                <input type="Number" className="form-control" id="medicinePrice" placeholder="price" onChange={(e) => { setPrice(e.target.value) }} />
            </div>
            <div className="form-group">
                <label htmlFor="medicineInStock">Stock</label>
                <input type="Number" className="form-control" id="medicineInStock" placeholder="Available quantity" onChange={(e) => { setStock(e.target.value) }} />
            </div>
            <div className="form-group">
                <label htmlFor="discountPercent">Discount</label>
                <input type="text" className="form-control" id="discountPercent" placeholder="Discount in percent" onChange={(e) => { setDiscount(e.target.value) }} />
            </div>
            <button type="submit" className="btn btn-primary">Add to the Inventory</button>
        </form>
    </div>);
}


const mapDispatchToProps = (dispatch) => ({
    add_medicine_to_inventory: (payload) => dispatch(addMedicine(payload))
})

export default connect(null, mapDispatchToProps)(AddMedicine)
