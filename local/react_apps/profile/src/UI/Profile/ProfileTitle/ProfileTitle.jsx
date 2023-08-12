import React from 'react'
import s from './styles.module.scss'
import Button from '../../Button/Button'

const ProfileTitle = () => {

    const logout = (e) => {
        e.preventDefault()
        console.log('logout')
    }

    return (
        <div className={s.profileTitle}>
            <p className={s.text}>Мой профиль</p>
            <Button handleClick={logout} color={'grey'}>
                <svg width="18" height="16" viewBox="0 0 18 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <rect x="8" width="10" height="16" rx="1" fill="#2E2E2E"/>
                    <path d="M5 12L1 8L5 4" stroke="#2E2E2E" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M9 8L13 8" stroke="white" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M1 8L7 8" stroke="#2E2E2E" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                Выйти
            </Button>
        </div>
    )
}

export default ProfileTitle