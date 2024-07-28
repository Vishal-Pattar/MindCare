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
        const fetchCoupons = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/coupons');
                const data = response.data;
                setCoupons(data);
                setUsedCount(data.filter(coupon => coupon.status).length);
                setAvailableCount(data.filter(coupon => !coupon.status).length);
            } catch (error) {
                console.error('Error fetching coupons:', error);
            }
        };

        fetchCoupons();
    }, []);

    const handleGenerate = async () => {
        if (!numCodesToGenerate) return;

        try {
            const response = await axios.post('http://localhost:5000/api/coupons', {
                numCode: parseInt(numCodesToGenerate)
            });
            setCoupons([...coupons, ...response.data]);
            setAvailableCount(availableCount + response.data.length);
            setNumCodesToGenerate('');
        } catch (error) {
            console.error('Error generating coupon codes:', error);
        }
    };

    return (
        <>
            <div className='coupon__generations'>
                <span className='coupon__title'>Coupon Stats</span>
                <div className='coupon__stats'>
                    <div className='coupon__stat'>Coupons Used:&nbsp;<span className='redColor'>{usedCount}</span></div>
                    <div className='coupon__stat'>Coupons Available:&nbsp;<span className='greenColor'>{availableCount}</span></div>
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