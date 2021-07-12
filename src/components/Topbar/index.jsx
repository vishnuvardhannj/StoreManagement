import React from 'react';
import "./topbar.css";
import { connect } from 'react-redux';
import { adminLogout } from '../../actions';
import { useHistory } from "react-router-dom";



const Topbar = ({ loginStatus, logOutAdmin }) => {
    const history = useHistory()

    return (<div className="topbar">
        <div><img src="https://cdn.dribbble.com/users/2214129/screenshots/6098465/medicart.png" alt="pharmacy-management-software" /></div>
        <div className="topbar-menu">
            {loginStatus && <p onClick={() => {
                localStorage.setItem('loginStatus', false)
                localStorage.setItem('adminLogin', false)
                localStorage.setItem('salesLogin', false)
                history.push("/");
                logOutAdmin()
            }} style={{ cursor: 'pointer' }}>Logout</p>}
        </div>
    </div>);
}



const mapStateToProps = (state) => ({
    loginStatus: state.loginStatus
})

const mapDispatchToProps = (dispatch) => ({
    logOutAdmin: () => dispatch(adminLogout(''))

})

export default connect(mapStateToProps, mapDispatchToProps)(Topbar)
