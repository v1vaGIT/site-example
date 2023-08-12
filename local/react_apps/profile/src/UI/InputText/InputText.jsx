import React from 'react'
import clsx from 'clsx'
import s from './style.module.scss'

const InputText = ({ fieldName, value, onChange, error, ...props }) => {
    const inputStyle = clsx(s.inputField, { [s.inputFieldError]: error })

    return (
        <div className={s.inputFieldContainer}>
            <p className={s.fieldName}>{fieldName}</p>
            <input className={inputStyle} value={value || ''} onChange={onChange} {...props}/>
            {error?.message && <p className={s.error}>{error?.message}</p>}
        </div>
    )
}

export default InputText