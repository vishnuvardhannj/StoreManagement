import React from 'react';
import "./salesExecutive.css";
import { Link } from "react-router-dom";


const SalesExecutive = () => {

    return (<div className="sales_executive_body">
        <div className="sales_executive_header">
            <Link to="/sales_executive/create_order" className="sales_executive_button" style={{ marginTop: "40px" }}>Create Order</Link>
            <Link to="/sales_executive/view_orders" className="sales_executive_button">View Orders</Link>
        </div>
    </div>);
}

export default SalesExecutive;






