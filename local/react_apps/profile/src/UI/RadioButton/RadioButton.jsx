import React from 'react'
import s from './style.module.scss'
import clsx from 'clsx'

const RadioButton = ({ name, text, checked, onChange }) => {

    return (
        <label className={s.radioLabel}>
            <input
                className={s.radioInput}
                type="radio"
                name={name}
                onChange={onChange}
                checked={checked}
            />
            <span className={s.customRadio} />
            {text}
        </label>
    )
}

export default RadioButton