import React, {useState} from 'react'
import s from './style.module.scss'
import clsx from 'clsx'
import {useOutsideClick} from '../../hooks/useOutsideClick'

const Select = ({ label, value, values, onChange, fieldName, error }) => {
    const [currentValue, setCurrentValue] = useState(value)
    const [isOpen, setIsOpen] = useState(false)

    const handleOpen = (e) => {
        e.stopPropagation()
        setIsOpen(prevState => !prevState)
    }
    const handleClose = () => {
        setIsOpen(false)
    }
    const handleValueChange = (value) => setCurrentValue(value)
    const handleChange = (value, event) => {
        event.stopPropagation()

        handleValueChange(value)

        if (onChange) onChange(value)

        handleClose()
    }

    const selectRef = useOutsideClick(handleClose)

    const buttonStyle = clsx(s.selectLabelButton, { [s.buttonOpen]: isOpen, [s.placeholder]: !currentValue })
    const dropdownStyle = clsx(s.dropdownStyle, { [s.dropdownStyleHidden]: !isOpen })

    return (
        <div className={s.selectContainer}>
            <p className={s.fieldName}>{fieldName}</p>

            <div className={buttonStyle} onClick={handleOpen}>
                {currentValue ? currentValue.name : label}

                <svg xmlns="http://www.w3.org/2000/svg" width="9" height="6" viewBox="0 0 9 6" fill="none">
                    <path d="M8 1L4.5 5L1 1" stroke="#2E2E2E" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>

                <div ref={selectRef} className={dropdownStyle}>
                    {values.map((value) => (
                        <div
                            key={value.id}
                            onClick={(event) => handleChange(value, event)}
                            className={clsx(s.dropdownItem, { [s.dropdownItemActive]: value.id === currentValue })}
                        >
                            {value.name}
                        </div>
                    ))}
                </div>
            </div>

            {error?.message && <p className={s.error}>{error?.message}</p>}
        </div>
    )
}

export default Select