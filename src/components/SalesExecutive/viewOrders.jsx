import React from 'react';
import SalesExecutive from '../SalesExecutive';
import { connect } from 'react-redux';
import "./viewOrder.css"
import { updateAllOrders } from '../../actions';


const ViewOrders = ({ allOrders, my_orders_list_after_delete }) => {
    console.log(allOrders)
    const showCartItem = allOrders.filter(item => item.userId === 10001)
    const delete_my_order_by_id = (orderId) => {
        console.log(orderId)
        var myOrdersListAfterDelete = JSON.parse(localStorage.getItem('allOrders')) || [];
        myOrdersListAfterDelete = myOrdersListAfterDelete.filter(item => item.orderId !== orderId)
        localStorage.setItem('allOrders', JSON.stringify(myOrdersListAfterDelete));
        my_orders_list_after_delete(orderId)
    }

    return (<div>
        <SalesExecutive />
        <h1 style={{ textAlign: "center", marginTop: "20px" }}>MY ORDERS</h1>

        {showCartItem.map(order => <OrderById key={Math.random()} myOrderDetails={order}
            delete_my_order_by_id={delete_my_order_by_id} />)}
    </div>);
}



const mapStateToProps = (state) => ({
    allOrders: state.allOrders
})

const mapDispatchToProps = (dispatch) => ({
    my_orders_list_after_delete: (payload) => { dispatch(updateAllOrders(payload)) }
})

export default connect(mapStateToProps, mapDispatchToProps)(ViewOrders)


const OrderById = (props) => {
    const { customerName, contactNumber, orderId, cartItem } = props.myOrderDetails;
    const totalAmount = cartItem.reduce(function (sum, current) {
        return sum + (current.itemQty) * 10;
    }, 0);
    return (
        <div className="my-order-list" key={orderId}>
            <div className="my-order-user-details">
                <p>CUSTOMER NAME: <span>{customerName}</span></p>
                <p>CONTACT NUMBER: <span>{contactNumber}</span></p>
                <p>ORDER ID : <span>{orderId}</span></p>
            </div>
            <div className="cart-item-header ">
                <h4 className="cart-item-name">Name</h4>
                <h4>Quantity</h4>
                <h4>Amount</h4>
            </div>
            {cartItem.map(item =>
                <div className="cart-item-details" key={Math.random()}>
                    <p className="cart-item-name">{item.itemName}</p>
                    <p>{item.itemQty}</p>
                    <p>{item.itemQty * 10}</p>
                </div>
            )}
            { <p style={{ borderTop: "1px solid gray", width: "100%", marginTop: "10px", marginBottom: 0 }}></p>}
            { <div style={{ marginTop: "0px" }}>
                <h3 style={{ margin: 0, marginLeft: "58%", marginTop: "10px" }}>Total Amount = <span style={{ fontWeight: 300 }}>{totalAmount}</span></h3>
            </div>}
            <div className="delete_order_icon" onClick={() => props.delete_my_order_by_id(orderId)} > <i className="fas fa-trash"></i></div>
        </div>
    );
}
