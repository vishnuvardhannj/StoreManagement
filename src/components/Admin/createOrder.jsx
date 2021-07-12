import React, { useState } from 'react';
import { connect } from 'react-redux'
import Admin from '.';
import { createOrder, emptyCart } from "../../actions/index";
import { addToCart } from "../../actions/index"
import "../SalesExecutive/createOrder"



const CreateAdminOrder = ({ create_order, add_to_cart, cartItem, empty_cart }) => {
    const [customerName, setCustomerName] = useState('')
    const [contactNumber, setContactNumber] = useState('')
    const [addToCartName, setAddToCartName] = useState('');
    const [addToCartQty, setAddToCartQty] = useState('');



    const handleFormSubmit = (e) => {
        const orderDetails = { customerName: customerName, contactNumber: contactNumber, cartItem: cartItem, orderId: Math.floor((Math.random() * 100000000) + 1) }

        e.preventDefault();
        e.target[0].value = ''
        e.target[1].value = ''

        create_order(orderDetails)
        var allOrders = JSON.parse(localStorage.getItem('allOrders')) || [];
        allOrders.push(orderDetails);
        localStorage.setItem('allOrders', JSON.stringify(allOrders));


        localStorage.setItem('cartItem', JSON.stringify([]));
        empty_cart()
    }
    const handleAddToCart = (e) => {

        const cartItemDetails = { itemName: addToCartName, itemQty: addToCartQty }

        cartItem = JSON.parse(localStorage.getItem('cartItem')) || [];
        cartItem.push(cartItemDetails);
        localStorage.setItem('cartItem', JSON.stringify(cartItem));
        add_to_cart(cartItemDetails);
    }
    // Total amount
    const totalAmount = cartItem.reduce(function (sum, current) {
        return sum + (current.itemQty) * 10;
    }, 0);

    return (<div>
        <Admin />
        <h1 style={{ margin: "20px", textAlign: "center", marginLeft: "14%" }}>Make an Order</h1>
        <div style={{ display: "flex", justifyContent: "center" }}>
            <div className="add_to_cart">
                <label type="text" onChange={(e) => setAddToCartName(e.target.value)}>Medicine <input /></label>
                <label type="Number" onChange={(e) => setAddToCartQty(e.target.value)}>Quantity <input /></label>
                <p>Price per unit {20}</p>
                <button className="btn btn-secondary" onClick={handleAddToCart}>Add to Cart</button>
            </div>
            <form className="create_order_form" onSubmit={handleFormSubmit}>
                <div className="executive_details">
                    <div className="form-group">
                        <label htmlFor="customerName">Customer Name</label>
                        <input type="text" className="form-control" id="customerName" placeholder="Cutsomer name" onChange={(e) => { setCustomerName(e.target.value) }} required />
                    </div>
                    <div className="form-group">
                        <label htmlFor="contactNumber">Contact Number</label>
                        <input type="text" className="form-control" id="contactNumber" placeholder="Contact Number" onChange={(e) => { setContactNumber(e.target.value) }} required />
                    </div>
                </div>

                {cartItem.length > 0 && <div className="cart-item-header">
                    <p className="cart-item-name">Name</p>
                    <p>Quantity</p>
                    <p>Amount</p>
                </div>}
                {cartItem.map(item =>
                    <div className="cart-item-details" key={Math.random()}>
                        <p className="cart-item-name">{item.itemName}</p>
                        <p>{item.itemQty}</p>
                        <p>{item.itemQty * 10}</p>
                    </div>
                )}
                {cartItem.length > 0 && <p style={{ borderTop: "1px solid gray", width: "500px", marginTop: "10px", marginBottom: 0 }}></p>}
                {cartItem.length > 0 && <div style={{ marginTop: "0px" }}>
                    <h3 style={{ margin: 0, marginLeft: "160px" }}>Total Amount = <span style={{ fontWeight: 300 }}>{totalAmount}</span></h3>
                </div>}

                <button type="submit" className="btn btn-primary">Create Order</button>
                <p className="clear-cart-button" onClick={() => {
                    empty_cart()
                }}>Clear Cart</p>

            </form>
        </div>
    </div >);
}


const mapStateToProps = (state) => ({
    cartItem: state.cartItem
})

const mapDispatchToProps = (dispatch) => ({
    create_order: (payload) => dispatch(createOrder(payload)),
    add_to_cart: (payload) => dispatch(addToCart(payload)),
    empty_cart: () => dispatch(emptyCart())
})

export default connect(mapStateToProps, mapDispatchToProps)(CreateAdminOrder)
