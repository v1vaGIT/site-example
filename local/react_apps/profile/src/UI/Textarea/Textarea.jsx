import React from 'react'
import s from './style.module.scss'

const Textarea = ({ fieldName, onChange, error, ...props }) => {

    return (
        <div className={s.textareaContainer}>
            <p className={s.fieldName}>{fieldName}</p>
            <textarea onChange={onChange} {...props}/>
            {error?.message && <p className={s.error}>{error?.message}</p>}
        </div>
    )
}

export default Textarea