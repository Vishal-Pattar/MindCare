import React from 'react'
import { IoShieldCheckmarkSharp } from "react-icons/io5";
import { MdIndeterminateCheckBox } from "react-icons/md";

const ReferralTable = () => {
    return (
        <table className="referral__table">
            <tr>
                <td>Status</td>
                <td><MdIndeterminateCheckBox className='referral__status' /></td>
            </tr>
            <tr>
                <td>Referral Code</td>
                <td>3D39130A</td>
            </tr>
            <tr>
                <td>Created At</td>
                <td>7/24/2024,
                    2:55:58 AM</td>
            </tr>
            <tr>
                <td>Used By</td>
                <td>Vishal</td>
            </tr>
            <tr>
                <td>Used Date</td>
                <td>7/24/2024, 3:00:34 AM</td>
            </tr>
        </table>
    )
}

export default ReferralTable