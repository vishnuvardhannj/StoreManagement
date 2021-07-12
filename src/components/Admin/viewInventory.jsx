import React, { useState } from 'react';
import Admin from '.';
import { connect } from 'react-redux';
import "./viewInventory.css"
import { updateInventoryList } from '../../actions';
import UpdateInventoryDetails from './updateInventoryDetails';
import { medicineIdForUpdate } from '../../actions';


const ViewInventory = ({ inventoryList, inventory_list_after_delete_ById, medicine_id_for_update }) => {
    const [isUpdateMedicineForm, setIsUpdateMedicineForm] = useState(false);


    const delete_medicine_by_id = (medicineName) => {
        var inventoryListAfterDelete = JSON.parse(localStorage.getItem('inventoryList')) || [];
        inventoryListAfterDelete = inventoryListAfterDelete.filter(item => item.medicineName !== medicineName)
        localStorage.setItem('inventoryList', JSON.stringify(inventoryListAfterDelete));
        inventory_list_after_delete_ById(medicineName)
    }


    //   // Update Medicine details By ID
    const update_medicine_by_id = (id) => {
        setIsUpdateMedicineForm(true)
        console.log(id)
        localStorage.setItem('medicineIdForUpdate', id)
        medicine_id_for_update(id)
    }

    const crossClick = () => {
        console.log("Clicked")
        setIsUpdateMedicineForm(false)
    }

    return (<div className="view_inventory">
        <Admin />
        {isUpdateMedicineForm && <UpdateInventoryDetails medicineIdForUpdate={medicineIdForUpdate} crossClick={crossClick} />}

        <div className="inventory_container">
            <div className="inventory_container_header">
                <p>Medicine</p>
                <p>Manufacturer</p>
                <p>Price</p>
                <p>Quantity</p>
                <p>Discount</p>
            </div>
            {inventoryList.map(item => <InventoryMedicineCard medicineDetails={item} delete_medicine_by_id={delete_medicine_by_id} key={Math.random()} update_medicine_by_id={update_medicine_by_id} />)}
        </div>
    </div >);
}


const mapStateToProps = (state) => ({
    inventoryList: state.inventoryList,
    medicineIdForUpdate: state.medicineIdForUpdate
})

const mapDispatchToProps = (dispatch) => ({
    inventory_list_after_delete_ById: (payload) => dispatch(updateInventoryList(payload)),
    medicine_id_for_update: (payload) => dispatch(medicineIdForUpdate(payload))
})


export default connect(mapStateToProps, mapDispatchToProps)(ViewInventory)




// Inventory Medicne card
const InventoryMedicineCard = (props) => {
    const { medicineName, manufacturerName, price, stock, discount, medicineId } = props.medicineDetails;


    return (
        <div style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
            <div className="medicine-card" key={Math.random()} >
                <span className="medicine-name">{medicineName}</span>
                <span className="manufacturer-name">{manufacturerName}</span>
                <span className="medicine-price">{price}</span>
                <span className="medicine-quantity">{stock}</span>
                <span className="medicine-discount">{discount}</span>
            </div>
            <div style={{ marginLeft: "10px", cursor: "pointer" }} onClick={() => props.delete_medicine_by_id(medicineName)} > <i className="fas fa-trash"></i></div>
            <div style={{ cursor: "pointer", marginLeft: "10px" }} onClick={() => props.update_medicine_by_id(medicineId)} > <i className="fas fa-edit"></i></div>
        </div>
    );
}
