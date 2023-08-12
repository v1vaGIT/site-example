import React from 'react'
import {Controller, useForm} from 'react-hook-form'

import s from './style.module.scss'

import InputText from '../../../../UI/InputText/InputText'
import Select from '../../../../UI/Select/Select'
import Button from '../../../../UI/Button/Button'
import Textarea from '../../../../UI/Textarea/Textarea'
import {useOutsideClick} from '../../../../hooks/useOutsideClick'

const AddAddressModal = ({ defaultValues, closeModal, addAddress }) => {
    const onCloseModal = (e) => {
        e.stopPropagation()
        closeModal()
    }

    const modalRef = useOutsideClick(onCloseModal)
    const { handleSubmit, control, formState: { errors, isValid } } = useForm({
        defaultValues: {
            building: '',
            city: '',
            street: '',
            entrance: '',
            floor: '',
            flat: '',
            comment: '',
            ...defaultValues || null
        }
    })

    return (
        <div className={s.modalWrapper}>
            <form ref={modalRef} className={s.modal} onSubmit={handleSubmit(addAddress)}>
                <div className={s.modalHeader}>
                    <p className={s.modalTitle}>Добавление адреса</p>
                    <svg className={s.closeButton} onClick={onCloseModal} xmlns="http://www.w3.org/2000/svg" width="35"
                         height="35"
                         viewBox="0 0 35 35" fill="none">
                        <circle cx="17.5" cy="17.5" r="17" transform="matrix(-1 0 0 1 35 0)" stroke="#2E2E2E"/>
                        <path d="M10.4502 10.7271L24.2723 24.5491" stroke="#2E2E2E" strokeLinecap="round"/>
                        <path d="M24.2725 10.7271L10.4504 24.5491" stroke="#2E2E2E" strokeLinecap="round"/>
                    </svg>
                </div>
                <div className={s.fieldSet}>
                    <div className={s.field}>
                        <Controller
                            name="city"
                            control={control}
                            rules={{ required: true }}
                            render={({ field }) => (
                                <Select
                                    fieldName={'Город'}
                                    label="Укажите город"
                                    onChange={(e) => field.onChange(e)}
                                    values={[
                                        { id: 1, name: 'Владивосток' },
                                        { id: 2, name: 'Хабаровск' },
                                        { id: 3, name: 'Благовещенск' },
                                    ]}
                                />
                            )}
                        />
                    </div>

                    <div className={s.field}>
                        <Controller
                            name="street"
                            control={control}
                            rules={{ required: true }}
                            render={({ field }) => (
                                <InputText
                                    fieldName={'Улица'}
                                    value={field.value}
                                    onChange={(e) => field.onChange(e.target.value)}
                                    placeholder={'Укажите улицу'}
                                />
                            )}
                        />
                    </div>

                    <div className={s.fieldsGroup}>
                        <div className={s.field}>
                            <Controller
                                name="building"
                                control={control}
                                rules={{ required: true }}
                                render={({ field }) => (
                                    <InputText
                                        fieldName={'Дом'}
                                        value={field.value}
                                        onChange={(e) => field.onChange(e.target.value)}
                                        placeholder={'Номер'}
                                    />
                                )}
                            />
                        </div>
                        <div className={s.field}>
                            <Controller
                                name="entrance"
                                control={control}
                                rules={{ required: true }}
                                render={({ field }) => (
                                    <InputText
                                        fieldName={'Подъезд'}
                                        value={field.value}
                                        onChange={(e) => field.onChange(e.target.value)}
                                        placeholder={'Номер'}
                                    />
                                )}
                            />
                        </div>
                        <div className={s.field}>
                            <Controller
                                name="floor"
                                control={control}
                                rules={{ required: true }}
                                render={({ field }) => (
                                    <InputText
                                        fieldName={'Этаж'}
                                        value={field.value}
                                        onChange={(e) => field.onChange(e.target.value)}
                                        placeholder={'Номер'}
                                    />
                                )}
                            />
                        </div>
                        <div className={s.field}>
                            <Controller
                                name="flat"
                                control={control}
                                rules={{ required: true }}
                                render={({ field }) => (
                                    <InputText
                                        fieldName={'Квартира'}
                                        value={field.value}
                                        onChange={(e) => field.onChange(e.target.value)}
                                        placeholder={'Номер'}
                                    />
                                )}
                            />
                        </div>
                    </div>

                    <div className={s.field}>
                        <Controller
                            name="comment"
                            control={control}
                            render={({ field }) => (
                                <Textarea
                                    fieldName={'Комментарий'}
                                    placeholder={'Напишите что-нибудь...'}
                                    onChange={(e) => field.onChange(e)}
                                />
                            )}
                        />
                    </div>
                </div>
                <Button activated={isValid} color={'grey'}>
                    Сохранить
                </Button>
            </form>
        </div>
    )
}

export default AddAddressModal