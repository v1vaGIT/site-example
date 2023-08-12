import React from 'react'
import s from './style.module.scss'

const Checkbox = ({ label, checked = false, onChange, ...props }) => {

    return (
        <label className={s.checkboxLabel}>
            <input
                type="checkbox"
                checked={checked}
                onChange={onChange}
                {...props}
            />
            <span>
                <svg xmlns="http://www.w3.org/2000/svg" width="12" height="10" viewBox="0 0 12 10" fill="none">
                    <path d="M1 4.69231L4.52941 9L11 1" stroke="white"/>
                </svg>
                {label}
            </span>
        </label>
    )
}

export default Checkbox