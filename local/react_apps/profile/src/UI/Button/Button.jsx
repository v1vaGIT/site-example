import React from 'react'
import clsx from 'clsx'
import s from './style.module.scss'

const Button = ({ handleClick, color, activated = false, children, ...props }) => {
    const buttonStyle = clsx(s.button, {
        [s.greyColor]: color === 'grey',
        [s.active]: activated
    })

    return (
        <button className={buttonStyle} onClick={handleClick} {...props}>
            {children}
        </button>
    )
}

export default Button