import React from 'react'
import './Toggle.css'

const Toggle = ({ permit, onClick }) => {
    return (
        <label className="switch">
            <input type="checkbox" checked={permit} onChange={onClick} />
            <span className="slider round"></span>
        </label>
    )
}

export default Toggle
