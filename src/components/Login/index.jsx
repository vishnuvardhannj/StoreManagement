import React, { useState } from 'react';
import "./login.css";
import { useHistory } from 'react-router-dom';
import { connect } from 'react-redux';
import { adminLogin, salesLogin } from "../../actions"



const Login = ({ adminSignedIn, salesSignedIn }) => {
    const [loginEmail, setLoginEmail] = useState('');
    const [loginPassword, setLoginPassword] = useState('')
    const [isAdmin, setIsAdmin] = useState(true);
    const [loginStatus, setLoginStatus] = useState(localStorage.getItem('loginStatus') || false);
    const history = useHistory()



    if (loginStatus !== 'false') {
        localStorage.setItem('loginStatus', loginStatus)
    }

    const handleLogin = (e) => {
        e.preventDefault()
        console.log(loginEmail, loginPassword)
        if (isAdmin) {
            if (loginEmail === "test-admin" && loginPassword === "test-admin") {
                setLoginStatus(true)
                localStorage.setItem('loginStatus', true)
                localStorage.setItem('adminLogin', true)
                history.push('/admin/add_medicine')
                adminSignedIn()
            } else {
                alert("Invalid credentials!")
            }
        } else {
            if (loginEmail === "test-sales" && loginPassword === "test-sales") {
                setLoginStatus(true)
                localStorage.setItem('loginStatus', true)
                localStorage.setItem('salesLogin', true)
                history.push('/sales_executive/create_order')
                salesSignedIn()
            } else {
                alert("Invalid credentials!")
            }
        }
    }

    return (<div className="login-body">
        <form className="login-form" onSubmit={handleLogin
        }>
            <h1>Login</h1>
            <div className="btn-group">
                <p className={isAdmin ? "button active_button" : "button"} onClick={() => setIsAdmin(true)}>Admin</p>
                <p className={!isAdmin ? "button active_button" : "button"} onClick={() => setIsAdmin(false)}>Executive</p>
            </div>
            <div className="form-group form_group">
                <label>Username </label>
                <input type="text" className="form-control" placeholder="Enter username" required
                    onChange={(eVal) => setLoginEmail(eVal.target.value)} />
            </div>

            <div className="form-group form_group">
                <label>Password</label>
                <input type="password" className="form-control" placeholder="Enter password" required onChange={(pVal) => {
                    setLoginPassword(pVal.target.value)
                }} />
            </div>
            <button type="submit" className="btn btn-primary btn-block">Submit</button>
        </form>

    </div>);
}



const mapDispatchToProps = (dispatch) => ({

    adminSignedIn: () => dispatch(adminLogin('')),
    salesSignedIn: () => dispatch(salesLogin(''))

})

export default connect(null, mapDispatchToProps)(Login)
