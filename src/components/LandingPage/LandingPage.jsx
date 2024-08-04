import React from 'react';
import './LandingPage.css';
import gif from '../../assets/MindCare2.gif';

const LandingPage = () => {
    return (
        <div className='landingpage__container'>
            <div className='landingpage__boardborder'>
                <div className='landingpage__boardcontent'>
                    <img src={gif} alt='MindCare' className='landingpage__gif' />
                </div>
            </div>
        </div>
    );
}

export default LandingPage;