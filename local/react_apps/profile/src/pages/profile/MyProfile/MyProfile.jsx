import React, {useEffect, useMemo, useState} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {Controller, useForm} from 'react-hook-form'
import {IMaskInput} from 'react-imask'

import s from './style.module.scss'
import {fetchUserData, changeUserData, selectUserData} from '../../../store/profileSlice'

import Checkbox from '../../../UI/Checkbox/Checkbox'
import InputText from '../../../UI/InputText/InputText'
import Button from '../../../UI/Button/Button'

const MyProfile = () => {
    const [isEditableForm, setIsEditableForm] = useState(false)
    const dispatch = useDispatch()
    const userData = useSelector(selectUserData)
    const {
        handleSubmit,
        getValues,
        control,
        reset,
        formState: { errors, isDirty }
    } = useForm({ mode: 'onBlur', reValidateMode: 'onChange' })

    useEffect(() => {
        if (userData) {
            reset(userData)
            return
        }

        dispatch(fetchUserData())
    }, [userData])

    const hasDifference = useMemo(() => {
        const currentState = getValues()

        for (let key in currentState) {
            if (currentState[key] !== undefined && currentState[key] !== userData[key]) return true
        }

        return false
    }, [isEditableForm, getValues()])

    const unlockForm = (e) => {
        e.preventDefault()
        setIsEditableForm(true)
    }

    const changeData = (userData) => {
        dispatch(changeUserData({ user: userData }))
        setIsEditableForm(false)
    }

    const onResetChanges = (e) => {
        e.preventDefault()
        reset(userData)
        setIsEditableForm(false)
    }

    const changePassword = (e) => {
        e.preventDefault()
        console.log('changePassword')
    }

    return (
        <div className={s.myProfile}>
            <form className={s.form} onSubmit={handleSubmit(changeData)}>
                <div className={s.fieldSet}>
                    <div className={s.field}>
                        <Controller
                            name="firstName"
                            control={control}
                            rules={{
                                pattern: {
                                    value: /^\s*([а-яА-Яёa-zA-Z]+\s*){1,3}$/,
                                    message: 'Введите корректное имя'
                                },
                                required: {
                                    value: true,
                                    message: 'Это поле необходимо заполнить.'
                                }
                            }}
                            render={({ field }) => (
                                <InputText
                                    fieldName={'Имя'}
                                    value={field.value}
                                    onChange={(e) => field.onChange(e.target.value)}
                                    placeholder={'Укажите имя'}
                                    disabled={!isEditableForm}
                                    error={errors?.firstName}
                                />
                            )}
                        />
                    </div>
                    <div className={s.field}>
                        <Controller
                            name="lastName"
                            rules={{
                                pattern: {
                                    value: /^\s*([а-яА-Яёa-zA-Z]+\s*){1,3}$/,
                                    message: 'Введите корректную фамилию'
                                },
                                required: {
                                    value: true,
                                    message: 'Это поле необходимо заполнить.'
                                }
                            }}
                            control={control}
                            render={({ field }) => (
                                <InputText
                                    fieldName={'Фамилия'}
                                    value={field.value}
                                    onChange={(e) => field.onChange(e.target.value)}
                                    placeholder={'Укажите фамилию'}
                                    disabled={!isEditableForm}
                                    error={errors?.lastName}
                                />
                            )}
                        />
                    </div>
                    <div className={s.field}>
                        <Controller
                            name="date"
                            control={control}
                            rules={{
                                pattern: {
                                    value: /^(?:(?:31(\/|-|\.)(?:0?[13578]|1[02]))\1|(?:(?:29|30)(\/|-|\.)(?:0?[13-9]|1[0-2])\2))(?:(?:1[6-9]|[2-9]\d)?\d{2})$|^(?:29(\/|-|\.)0?2\3(?:(?:(?:1[6-9]|[2-9]\d)?(?:0[48]|[2468][048]|[13579][26])|(?:(?:16|[2468][048]|[3579][26])00))))$|^(?:0?[1-9]|1\d|2[0-8])(\/|-|\.)(?:(?:0?[1-9])|(?:1[0-2]))\4(?:(?:1[6-9]|[2-9]\d)?\d{2})$/,
                                    message: 'Введите корректную дату рождения',
                                },
                                required: {
                                    value: true,
                                    message: 'Это поле необходимо заполнить.'
                                },
                                valueAsDate: true,
                            }}
                            render={({ field }) => (
                                <InputText
                                    fieldName={'Дата рождения'}
                                    value={field.value}
                                    onChange={(e) => field.onChange(e.target.value)}
                                    placeholder={'Укажите дату рождения'}
                                    disabled={!isEditableForm}
                                    error={errors?.date}
                                />
                            )}
                        />
                    </div>
                    <div className={s.field}>
                        <Controller
                            name="gender"
                            control={control}
                            render={({ field }) => (
                                <InputText
                                    fieldName={'Пол'}
                                    value={field.value}
                                    onChange={(e) => field.onChange(e.target.value)}
                                    placeholder={'Укажите пол'}
                                    disabled={!isEditableForm}
                                />
                            )}
                        />
                    </div>
                    <div className={s.field}>
                        <div className={s.fieldContainer}>
                            <p>Укажите телефон</p>
                            <Controller
                                name="phone"
                                control={control}
                                rules={{
                                    pattern: {
                                        value: /(^8|7|\+7)((\d{10})|(\s\(\d{3}\)\s\d{3}\s\d{2}\s\d{2}))/,
                                        message: 'Введите корректный номер телефона'
                                    },
                                    required: {
                                        value: true,
                                        message: 'Это поле необходимо заполнить.'
                                    }
                                }}
                                render={({ field }) => (
                                    <IMaskInput
                                        mask={'+{7} (#00) 000-00-00'}
                                        definitions={{ '#': /9/ }}
                                        value={field.value}
                                        onAccept={value => field.onChange(value.replace(/\D/g, ''))}
                                        placeholder={'Укажите номер телефона'}
                                        disabled={!isEditableForm}
                                    />
                                )}
                            />
                            {errors?.phone?.message && <p className={s.error}>{errors?.phone?.message}</p>}
                        </div>
                    </div>
                    <div className={s.field}>
                        <Controller
                            name="email"
                            control={control}
                            rules={{
                                pattern: {
                                    value: /^\S+@\S+\.\S+$/,
                                    message: 'Введите корректную почту'
                                },
                                required: {
                                    value: true,
                                    message: 'Это поле необходимо заполнить.'
                                }
                            }}
                            render={({ field }) => (
                                <InputText
                                    fieldName={'Почта'}
                                    value={field.value}
                                    onChange={(e) => field.onChange(e.target.value)}
                                    placeholder={'Укажите e-mail'}
                                    disabled={!isEditableForm}
                                    error={errors?.email}
                                />
                            )}
                        />
                    </div>
                </div>

                <div className={s.fieldAgreement}>
                    <Controller
                        name="agreement"
                        control={control}
                        render={({ field }) => (
                            <Checkbox
                                label={'Согласие на получение e-mail и SMS-рассылок'}
                                checked={field.value}
                                onChange={(e) => field.onChange(e.target.checked)}
                                disabled={!isEditableForm}
                            />
                        )}
                    />
                </div>

                <div className={s.buttons}>
                    {isEditableForm
                        ? <>
                            <Button disabled={!hasDifference} activated={hasDifference}>
                                <p>Сохранить изменения</p>
                            </Button>
                            <Button handleClick={onResetChanges} activated={hasDifference}>
                                <p>Сбросить изменения</p>
                            </Button>
                        </>
                        : <>
                            <Button handleClick={unlockForm}>
                                <svg width="21" height="21" viewBox="0 0 21 21" fill="none"
                                     xmlns="http://www.w3.org/2000/svg">
                                    <path
                                        d="M17.7188 17.0625H9.45935L16.2137 10.3081L16.2141 10.3077L16.2144 10.3073L18.3749 8.14685C18.4968 8.02499 18.5935 7.8803 18.6595 7.72106C18.7255 7.56182 18.7594 7.39114 18.7594 7.21877C18.7594 7.0464 18.7255 6.87572 18.6595 6.71647C18.5936 6.55722 18.4969 6.41253 18.375 6.29065L14.7093 2.62488C14.4629 2.37917 14.1292 2.2412 13.7812 2.24121C13.4332 2.24123 13.0995 2.37923 12.8531 2.62496L3.00936 12.4688C2.88191 12.5962 2.78215 12.7486 2.71635 12.9164C2.7096 12.9327 2.70391 12.9494 2.69854 12.9662C2.65013 13.1046 2.62527 13.2501 2.625 13.3968V17.0625C2.6254 17.4104 2.76381 17.744 3.00986 17.9901C3.25592 18.2362 3.58953 18.3746 3.9375 18.375H17.7188C17.8928 18.375 18.0597 18.3058 18.1828 18.1828C18.3059 18.0597 18.375 17.8928 18.375 17.7187C18.375 17.5447 18.3059 17.3777 18.1828 17.2547C18.0597 17.1316 17.8928 17.0625 17.7188 17.0625ZM13.7812 3.55302L17.4469 7.21871L15.75 8.91557L12.0844 5.24996L13.7812 3.55302Z"
                                        fill="#2E2E2E"/>
                                </svg>
                                <p>Изменить данные</p>
                            </Button>
                            <Button handleClick={changePassword}>
                                <svg width="21" height="21" viewBox="0 0 21 21" fill="none"
                                     xmlns="http://www.w3.org/2000/svg">
                                    <path
                                        d="M13.0741 2C12.1387 2.00068 11.2168 2.2226 10.3836 2.64763C9.55042 3.07266 8.82958 3.68875 8.27996 4.44557C7.73034 5.2024 7.36754 6.07851 7.22119 7.00233C7.07484 7.92615 7.14908 8.87149 7.43786 9.76114L3.17354 14.0254C3.06243 14.1365 3 14.2873 3 14.4444V17.4074C3.00001 17.5646 3.06244 17.7153 3.17357 17.8264C3.28471 17.9376 3.43543 18 3.59259 18H6.55556C6.71272 18 6.86344 17.9376 6.97457 17.8264C7.0857 17.7153 7.14814 17.5646 7.14815 17.4074V16.2222H8.33333C8.4905 16.2222 8.64122 16.1598 8.75235 16.0486C8.86348 15.9375 8.92592 15.7868 8.92593 15.6296V14.4444H10.1111C10.2683 14.4444 10.419 14.382 10.5302 14.2709L11.2389 13.5621C12.0536 13.8274 12.9161 13.9128 13.7671 13.8125C14.618 13.7122 15.437 13.4286 16.1678 12.9812C16.8986 12.5339 17.5236 11.9334 17.9999 11.2212C18.4762 10.5089 18.7924 9.70191 18.9267 8.85569C19.061 8.00947 19.0103 7.14419 18.7779 6.31948C18.5456 5.49477 18.1372 4.73025 17.5809 4.0786C17.0246 3.42695 16.3336 2.90367 15.5555 2.54482C14.7775 2.18598 13.9309 2.0001 13.0741 2ZM14.5554 7.62963C14.321 7.62963 14.0918 7.56012 13.8969 7.42989C13.702 7.29966 13.5501 7.11456 13.4604 6.89799C13.3707 6.68143 13.3472 6.44313 13.393 6.21323C13.4387 5.98332 13.5516 5.77214 13.7173 5.60639C13.8831 5.44064 14.0943 5.32776 14.3242 5.28203C14.5541 5.2363 14.7924 5.25977 15.0089 5.34948C15.2255 5.43918 15.4106 5.59109 15.5408 5.78599C15.6711 5.98089 15.7406 6.21004 15.7406 6.44444C15.7406 6.75877 15.6157 7.06023 15.3934 7.28249C15.1712 7.50476 14.8697 7.62963 14.5554 7.62963Z"
                                        fill="#2E2E2E"/>
                                </svg>
                                <p>Изменить пароль</p>
                            </Button>
                        </>
                    }
                </div>
            </form>
        </div>
    )
}

export default MyProfile