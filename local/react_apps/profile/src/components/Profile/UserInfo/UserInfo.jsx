import React, {useMemo} from 'react'
import s from './style.module.scss'
import Button from '../../../UI/Button/Button'

const UserInfo = ({ emptyInfoNotify, buttonName, items, addField, deleteField, changeField, icon }) => {
    const onAddField = (e) => {
        e.stopPropagation()
        addField()
    }

    const onDeleteField = (e, address) => {
        e.stopPropagation()
        deleteField(address)
    }

    const onChangeField = (e, addressId) => {
        e.stopPropagation()
        changeField(addressId)
    }

    const itemList = useMemo(() => items?.map(item => (
        <div key={item.id} className={s.infoItem}>
            <p className={s.infoText}>
                <img src={icon} alt="адрес"/>
                {item.address}
            </p>
            <div className={s.buttonsContainer}>
                <div className={s.button} onClick={(e) => onChangeField(e, item.id)}>Изменить</div>
                <div className={s.button} onClick={(e) => onDeleteField(e, item)}>Удалить</div>
            </div>
        </div>
    )), [items])

    return (
        <div className={s.userInfoContainer}>
            <div className={s.infoList}>
                {items.length === 0
                    ? <p className={s.notify}>{emptyInfoNotify}</p>
                    : itemList
                }
            </div>
            <div className={s.buttonWrapper}>
                <Button handleClick={onAddField}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="21" height="21" viewBox="0 0 21 21" fill="none">
                        <path
                            d="M17.7188 9.84375H11.1562V3.28125C11.1562 3.1072 11.0871 2.94028 10.964 2.81721C10.841 2.69414 10.674 2.625 10.5 2.625C10.326 2.625 10.159 2.69414 10.036 2.81721C9.91289 2.94028 9.84375 3.1072 9.84375 3.28125V9.84375H3.28125C3.1072 9.84375 2.94028 9.91289 2.81721 10.036C2.69414 10.159 2.625 10.326 2.625 10.5C2.625 10.674 2.69414 10.841 2.81721 10.964C2.94028 11.0871 3.1072 11.1562 3.28125 11.1562H9.84375V17.7188C9.84375 17.8928 9.91289 18.0597 10.036 18.1828C10.159 18.3059 10.326 18.375 10.5 18.375C10.674 18.375 10.841 18.3059 10.964 18.1828C11.0871 18.0597 11.1562 17.8928 11.1562 17.7188V11.1562H17.7188C17.8928 11.1562 18.0597 11.0871 18.1828 10.964C18.3059 10.841 18.375 10.674 18.375 10.5C18.375 10.326 18.3059 10.159 18.1828 10.036C18.0597 9.91289 17.8928 9.84375 17.7188 9.84375Z"
                            fill="#2E2E2E"/>
                    </svg>
                    {buttonName}
                </Button>
            </div>
        </div>
    )
}

export default UserInfo