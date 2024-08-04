import React, { useState, useEffect } from 'react';
import './Coupon.css';
import CouponTable from './CouponTable';
import axios from 'axios';
import withAuthorization from '../../../utils/withAuthorization';
import { Permissions } from '../../../utils/roles';

const Coupon = () => {
    const [coupons, setCoupons] = useState([]);
    const [couponStats, setCouponStats] = useState([]);
    const [numCodesToGenerate, setNumCodesToGenerate] = useState('');

    useEffect(() => {
        fetchCoupons();
    }, []);

    const fetchCoupons = async () => {
        try {
            const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/v1/coupons`);
            const data = response.data.data;
    
            const sortedCoupons = data.sort((a, b) => {
                if (a.status !== b.status) {
                    return a.status - b.status;
                }
                return new Date(a.created_at) - new Date(b.created_at);
            });
            setCouponStats(response.data.count);
            setCoupons(sortedCoupons);
        } catch (error) {
            console.error('Error fetching coupons:', error);
        }
    };

    const handleGenerate = async () => {
        if (!numCodesToGenerate) return;

        try {
            const response = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/api/v1/coupons`, {
                numberOfCoupons: parseInt(numCodesToGenerate)
            });
            const newCoupons = response.data.data;
            console.log('newCoupons:', response);

            const sortedCoupons = [...coupons, ...newCoupons].sort((a, b) => {
                if (a.status !== b.status) {
                    return a.status - b.status;
                }
                return new Date(a.created_at) - new Date(b.created_at);
            });

            setCoupons(sortedCoupons);
            setCouponStats(response.data.count);
            setNumCodesToGenerate('');
        } catch (error) {
            console.error('Error generating coupon codes:', error);
        }
    };

    const handleRefresh = () => {
        fetchCoupons();
    };

    return (
        <>
            <div className='coupon__generations'>
                <span className='coupon__title'>Coupon Stats</span>
                <div className='coupon__stats'>
                    <div className='coupon__stat'>Used:&nbsp;<span className='redColor'>{couponStats.used}</span></div>
                    <div className='coupon__stat'>Available:&nbsp;<span className='greenColor'>{couponStats.available}</span></div>
                    <div className='coupon__button' onClick={handleRefresh}>Refresh</div>
                </div>
                <div className='coupon__generatebox'>
                    <input
                        type="text"
                        className='coupon__input'
                        placeholder='Value'
                        value={numCodesToGenerate}
                        onChange={(e) => setNumCodesToGenerate(e.target.value)}
                    />
                    <button className='coupon__button' onClick={handleGenerate}>Generate</button>
                </div>
            </div>
            <div className='coupon__boxcodes'>
                {coupons.map(coupon => (
                    <CouponTable key={coupon._id} coupon={coupon} />
                ))}
            </div>
        </>
    );
};

export default withAuthorization(Permissions.Admin_Access)(Coupon);