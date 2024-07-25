import React from 'react'
import './Referral.css'
import ReferralTable from './ReferralTable'

const Referral = () => {
  return (
    <>
      <div className='referral__generations'>
        <span className='referral__title'>Referral Stats</span>
        <div className='referral__stats'>
          <div className='referral__stat'>Referrals Used:&nbsp;<span className='redColor'>12</span></div>
          <div className='referral__stat'>Referrals Available:&nbsp;<span className='greenColor'>12</span></div>
        </div>
        <div className='referral__generatebox'>
          <input type="text" className='referral__input' placeholder='Value' />
          <button className='referral__button'>Generate</button>
        </div>
      </div>
      <div className='referral__boxcodes'>
        <ReferralTable />
        <ReferralTable />
        <ReferralTable />
        <ReferralTable />
        <ReferralTable />
      </div>
    </>
  )
}

export default Referral