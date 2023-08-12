import React from 'react'

import s from './style.module.scss'

import Button from '../../../../UI/Button/Button'
import {useOutsideClick} from '../../../../hooks/useOutsideClick'

const DeleteAddressModal = ({ address, closeModal, deleteAddress }) => {
    const onCloseModal = (e) => {
        e.stopPropagation()
        closeModal()
    }

    const modalRef = useOutsideClick(onCloseModal)

    return (
        <div className={s.modalWrapper}>
            <div ref={modalRef} className={s.modal}>
                <div className={s.modalHeader}>
                    <p className={s.modalTitle}>Удаление адреса</p>
                    <svg className={s.closeButton} onClick={onCloseModal} xmlns="http://www.w3.org/2000/svg" width="35"
                         height="35"
                         viewBox="0 0 35 35" fill="none">
                        <circle cx="17.5" cy="17.5" r="17" transform="matrix(-1 0 0 1 35 0)" stroke="#2E2E2E"/>
                        <path d="M10.4502 10.7271L24.2723 24.5491" stroke="#2E2E2E" strokeLinecap="round"/>
                        <path d="M24.2725 10.7271L10.4504 24.5491" stroke="#2E2E2E" strokeLinecap="round"/>
                    </svg>
                </div>

                <div className={s.modalBody}>
                    <p className={s.addressText}>Вы действительно хотите удалить адрес?</p>

                    <div className={s.addressWrapper}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32" fill="none">
                            <path
                                d="M16 1.99951C13.0837 2.00297 10.2878 3.16301 8.22565 5.22516C6.1635 7.28731 5.00346 10.0832 5 12.9995C5 22.4116 15 29.521 15.4258 29.8188C15.5942 29.9364 15.7946 29.9995 16 29.9995C16.2054 29.9995 16.4058 29.9364 16.5742 29.8188C17 29.521 27 22.4116 27 12.9995C26.9965 10.0832 25.8365 7.28731 23.7744 5.22516C21.7122 3.16301 18.9163 2.00297 16 1.99951ZM16.0007 8.99987C16.7919 8.99987 17.5652 9.23447 18.223 9.674C18.8808 10.1135 19.3935 10.7382 19.6963 11.4691C19.999 12.2 20.0782 13.0043 19.9239 13.7802C19.7695 14.5562 19.3886 15.2689 18.8292 15.8283C18.2697 16.3877 17.557 16.7687 16.7811 16.923C16.0052 17.0774 15.2009 16.9981 14.47 16.6954C13.7391 16.3926 13.1144 15.88 12.6749 15.2222C12.2353 14.5644 12.0007 13.791 12.0007 12.9999C12.0007 12.4746 12.1042 11.9544 12.3052 11.4691C12.5062 10.9838 12.8008 10.5429 13.1723 10.1714C13.5437 9.79998 13.9847 9.50534 14.47 9.30433C14.9553 9.10331 15.4754 8.99986 16.0007 8.99987Z"
                                fill="#2E2E2E"/>
                        </svg>
                        <p className={s.addressText}>{address}</p>
                    </div>
                </div>

                <div className={s.buttonsWrapper}>
                    <Button handleClick={deleteAddress} activated={true}>Удалить</Button>
                    <Button handleClick={onCloseModal}>Отмена</Button>
                </div>
            </div>
        </div>
    )
}

export default DeleteAddressModal