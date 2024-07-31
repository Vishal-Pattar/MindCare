import React, { useState, useEffect } from 'react';
import './Coupon.css';
import CouponTable from './CouponTable';
import axios from 'axios';

const Coupon = () => {
    const [coupons, setCoupons] = useState([]);
    const [usedCount, setUsedCount] = useState(0);
    const [availableCount, setAvailableCount] = useState(0);
    const [numCodesToGenerate, setNumCodesToGenerate] = useState('');

    useEffect(() => {
        fetchCoupons();
    }, []);

    const fetchCoupons = async () => {
        try {
            const response = await axios.get('http://localhost:5000/api/coupons');
            const data = response.data;

            // Sort coupons by status (false first) and then by created_at (oldest first)
            const sortedCoupons = data.sort((a, b) => {
                if (a.status !== b.status) {
                    return a.status - b.status; // false (0) comes before true (1)
                }
                return new Date(a.created_at) - new Date(b.created_at); // sort by date
            });

            setCoupons(sortedCoupons);
            setUsedCount(sortedCoupons.filter(coupon => coupon.status).length);
            setAvailableCount(sortedCoupons.filter(coupon => !coupon.status).length);
        } catch (error) {
            console.error('Error fetching coupons:', error);
        }
    };

    const handleGenerate = async () => {
        if (!numCodesToGenerate) return;

        try {
            const response = await axios.post('http://localhost:5000/api/coupons', {
                numCode: parseInt(numCodesToGenerate)
            });
            const newCoupons = response.data;

            const sortedCoupons = [...coupons, ...newCoupons].sort((a, b) => {
                if (a.status !== b.status) {
                    return a.status - b.status;
                }
                return new Date(a.created_at) - new Date(b.created_at);
            });

            setCoupons(sortedCoupons);
            setAvailableCount(availableCount + newCoupons.length);
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
                    <div className='coupon__stat'>Coupons Used:&nbsp;<span className='redColor'>{usedCount}</span></div>
                    <div className='coupon__stat'>Coupons Available:&nbsp;<span className='greenColor'>{availableCount}</span></div>
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

export default Coupon;