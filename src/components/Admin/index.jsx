import React from 'react';
import "./admin.css";
import { Link } from "react-router-dom";


const Admin = () => {

    return (<div className="admin_body">
        <div className="admin_header">
            <h2 className="inventory_menu">INVENTORY</h2>
            <Link to="/admin/add_medicine" className="admin_button">Add Medicine</Link>
            <Link to="/admin/view_inventory" className="admin_button">View Inventory</Link>
            <h2 className="team_menu">TEAM</h2>
            <Link to="/admin/add_sales_executive" className="admin_button">Add Sales Executive</Link>
            <Link to="/admin/view_team" className="admin_button" >View Team</Link>
            <h2 className="order_menu">ORDERS</h2>
            <Link to="/admin/show_all_orders" className="admin_button" >Show All Orders</Link>
            <Link to="/admin/create_orders" className="admin_button" >Create Order</Link>
        </div>
    </div >);
}

export default Admin;
