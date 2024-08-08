import React from 'react';
import { IoShieldCheckmarkSharp } from "react-icons/io5";
import { MdIndeterminateCheckBox } from "react-icons/md";
import formatDateTime from '../../../utils/formatDateTime';

const CouponTable = ({ coupon }) => {
    const handleCopyCode = () => {
        navigator.clipboard.writeText(coupon.code)
            .catch(err => {
                console.error("Failed to copy: ", err);
            });
    };

    return (
        <table className="admin__table">
            <tbody>
                <tr>
                    <td>Status</td>
                    <td>{coupon.status ? <MdIndeterminateCheckBox className='admin__status redColor' /> : <IoShieldCheckmarkSharp className='coupon__status greenColor' />}</td>
                </tr>
                <tr>
                    <td>Coupon Code</td>
                    <td className='admin__table_code' onClick={handleCopyCode} >{coupon.code}</td>
                </tr>
                <tr>
                    <td>Credits</td>
                    <td>{coupon.credits}</td>
                </tr>
                <tr>
                    <td>Created Date</td>
                    <td>{formatDateTime(coupon.created_at).split(" ")[0]}</td>
                </tr>
                <tr>
                    <td>Created Time</td>
                    <td>{formatDateTime(coupon.created_at).split(" ")[1]}</td>
                </tr>
                <tr>
                    <td>Used By</td>
                    <td>{coupon.used_by || "---"}</td>
                </tr>
                <tr>
                    <td>Used Date</td>
                    <td>{coupon.used_date ? formatDateTime(coupon.used_date).split(" ")[0] : '---'}</td>
                </tr>
                <tr>
                    <td>Used Time</td>
                    <td>{coupon.used_date ? formatDateTime(coupon.used_date).split(" ")[1] : '---'}</td>
                </tr>
            </tbody>
        </table>
    );
};

export default CouponTable;