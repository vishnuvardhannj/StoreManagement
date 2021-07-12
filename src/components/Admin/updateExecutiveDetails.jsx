import React, { useState } from 'react';
import { connect } from 'react-redux'
import { updateExecutiveDetails } from '../../actions';
import "./updateExecutiveDetails.css"



const UpdateExecutiveDetails = ({ userIdForUpdate, teamList, update_executive_details, crossClick }) => {
    userIdForUpdate = userIdForUpdate || localStorage.getItem('userIdForUpdate')
    const userDetailsForUpdate = teamList.filter(user => user.salesExecutiveId == userIdForUpdate);
    console.log(userDetailsForUpdate[0]);
    const { firstName, lastName, dob, gender, experience } = userDetailsForUpdate[0];
    const [updatedFirstName, setUpdatedFirstName] = useState(firstName)
    const [updatedLastName, setUpdatedLastName] = useState(lastName)
    const [updatedDob, setUpdatedDob] = useState(dob)
    const [updatedExperience, setUpdatedExperience] = useState(experience)

    // Handle Update Details
    const handleExecutiveUpdateDetails = (e) => {
        e.preventDefault();
        var teamListAfterUpdate = JSON.parse(localStorage.getItem('teamList')) || [];
        const indexForUpdate = teamListAfterUpdate.findIndex(item => item.salesExecutiveId === userIdForUpdate
        )
        console.log(teamListAfterUpdate)
        teamListAfterUpdate[indexForUpdate].firstName = updatedFirstName;
        teamListAfterUpdate[indexForUpdate].lastName = updatedLastName;
        teamListAfterUpdate[indexForUpdate].dob = updatedDob;
        teamListAfterUpdate[indexForUpdate].experience = updatedExperience;
        localStorage.setItem('teamList', JSON.stringify(teamListAfterUpdate));

        localStorage.setItem('isUpdateForm', false)
        update_executive_details(teamListAfterUpdate)

    }




    return (<div style={{ textAlign: 'center' }} className="add_executive_details_container">
        <form className="add_executive_form" onSubmit={handleExecutiveUpdateDetails} >
            <p onClick={crossClick} className="remove_update_form_icon"><i className="fas fa-times"></i></p>
            <div className="form-group">
                <label htmlFor="firstName">First Name</label>
                <input type="text" className="form-control" id="firstName" placeholder="First name" onChange={(e) => { setUpdatedFirstName(e.target.value) }} value={updatedFirstName} />
            </div>
            <div className="form-group">
                <label htmlFor="lastName">Last Name</label>
                <input type="text" className="form-control" id="lastName" placeholder="Last Name" onChange={(e) => { setUpdatedLastName(e.target.value) }} value={updatedLastName} />
            </div>
            <div className="form-group">
                <label htmlFor="Dob">DOB</label>
                <input type="Date" className="form-control" id="Dob" placeholder="dob" onChange={(e) => { setUpdatedDob(e.target.value) }} value={updatedDob} />
            </div>
            <div className="form-group">
                <label htmlFor="Gender">Gender(M/F)</label>
                <input type="text" className="form-control" id="Gender" placeholder="Gender" disabled value={gender} />
            </div>
            <div className="form-group">
                <label htmlFor="experience">Experience</label>
                <input type="number" className="form-control" id="experience" placeholder="Experience in years" onChange={(e) => {

                    setUpdatedExperience(e.target.value)
                }} value={updatedExperience} />
            </div>
            <button type="submit" className="btn btn-primary">Update Details</button>
        </form>
    </div>);
}

const mapStateToProps = (state) => ({
    teamList: state.teamList,
    userIdForUpdate: state.userIdForUpdate
})

const mapDispatchToProps = (dispatch) => ({
    update_executive_details: (payload) => dispatch(updateExecutiveDetails(payload)),
})

export default connect(mapStateToProps, mapDispatchToProps)(UpdateExecutiveDetails)
