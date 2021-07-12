import React, { useState } from 'react';
import { connect } from 'react-redux'
import { updateInventoryDetails } from '../../actions';
import "./updateExecutiveDetails.css"



const UpdateInventoryDetails = ({ medicineIdForUpdate, inventoryList, update_inventory_details, crossClick }) => {
    medicineIdForUpdate = medicineIdForUpdate || localStorage.getItem('medicineIdForUpdate')
    const medicineDetailsForUpdate = inventoryList.filter(user => user.medicineId == medicineIdForUpdate);
    const { medicineName, manufacturerName, price, stock, discount } = medicineDetailsForUpdate[0];
    const [updatedManufacturerName, setUpdatedManufacturerName] = useState(manufacturerName)
    const [updatedPrice, setUpdatedPrice] = useState(price)
    const [updatedStock, setUpdatedStock] = useState(stock)
    const [updatedDiscount, setUpdatedDiscount] = useState(discount)

    console.log(medicineIdForUpdate)
    console.log(medicineDetailsForUpdate)

    console.log(discount)
    // Handle Update Details
    const handleMedicineUpdateDetails = (e) => {
        e.preventDefault();
        var inventoryListAfterUpdate = JSON.parse(localStorage.getItem('inventoryList')) || [];
        const indexForUpdate = inventoryListAfterUpdate.findIndex(item => item.medicineId === medicineIdForUpdate
        )
        console.log(inventoryListAfterUpdate)
        inventoryListAfterUpdate[indexForUpdate].discount = updatedDiscount;
        inventoryListAfterUpdate[indexForUpdate].manufacturerName = updatedManufacturerName;
        inventoryListAfterUpdate[indexForUpdate].price = updatedPrice;
        inventoryListAfterUpdate[indexForUpdate].stock = updatedStock;
        localStorage.setItem('inventoryList', JSON.stringify(inventoryListAfterUpdate));

        localStorage.setItem('isUpdateMedicineForm', false)
        update_inventory_details(inventoryListAfterUpdate)

    }




    return (<div style={{ textAlign: 'center' }} className="add_executive_details_container">
        <form className="add_executive_form" onSubmit={handleMedicineUpdateDetails} >
            <p onClick={crossClick} className="remove_update_form_icon"><i className="fas fa-times"></i></p>
            <div className="form-group">
                <label htmlFor="Medicine Name">Medicine Name</label>
                <input type="text" className="form-control" id="Medicine Name" placeholder="Medicine Name" disabled value={medicineName} />
            </div>

            <div className="form-group">
                <label htmlFor="ManufacturerName">Manufacturer Name</label>
                <input type="text" className="form-control" id="ManufacturerName" placeholder="Manufacturer Name" onChange={(e) => { setUpdatedManufacturerName(e.target.value) }} value={updatedManufacturerName} />
            </div>

            <div className="form-group">
                <label htmlFor="Price">Price(INR)</label>
                <input type="text" className="form-control" id="Price" placeholder="Price" onChange={(e) => { setUpdatedPrice(e.target.value) }} value={updatedPrice} />
            </div>
            <div className="form-group">
                <label htmlFor="Stock">Stock</label>
                <input type="Number" className="form-control" id="Stock" placeholder="Stock in years" onChange={(e) => {
                    setUpdatedStock(e.target.value)
                }} value={updatedStock} />
            </div>
            <div className="form-group">
                <label htmlFor="Discount">Discount</label>
                <input type="text" className="form-control" id="Discount" placeholder="Discount" onChange={(e) => { setUpdatedDiscount(e.target.value) }} value={updatedDiscount} />
            </div>
            <button type="submit" className="btn btn-primary">Update Details</button>
        </form>
    </div>);
}

const mapStateToProps = (state) => ({
    inventoryList: state.inventoryList,
    medicineIdForUpdate: state.medicineIdForUpdate
})

const mapDispatchToProps = (dispatch) => ({
    update_inventory_details: (payload) => dispatch(updateInventoryDetails(payload)),
})

export default connect(mapStateToProps, mapDispatchToProps)(UpdateInventoryDetails)
