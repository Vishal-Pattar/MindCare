import React from 'react';
import { IoShieldCheckmarkSharp } from "react-icons/io5";
import { MdIndeterminateCheckBox } from "react-icons/md";

const CouponTable = ({ coupon }) => {
    return (
        <table className="coupon__table">
            <tbody>
                <tr>
                    <td>Status</td>
                    <td>{coupon.status ? <MdIndeterminateCheckBox className='coupon__status redColor' /> : <IoShieldCheckmarkSharp className='coupon__status greenColor' />}</td>
                </tr>
                <tr>
                    <td>Coupon Code</td>
                    <td>{coupon.code}</td>
                </tr>
                <tr>
                    <td>Credits</td>
                    <td>{coupon.credits}</td>
                </tr>
                <tr>
                    <td>Created At</td>
                    <td>{new Date(coupon.created_at).toLocaleString()}</td>
                </tr>
                <tr>
                    <td>Used By</td>
                    <td>{coupon.used_by || "---"}</td>
                </tr>
                <tr>
                    <td>Used Date</td>
                    <td>{coupon.used_date ? new Date(coupon.used_date).toLocaleString() : '---'}</td>
                </tr>
            </tbody>
        </table>
    );
};

export default CouponTable;