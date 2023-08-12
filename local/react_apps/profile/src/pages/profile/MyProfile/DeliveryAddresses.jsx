import React, {useEffect, useMemo, useState} from 'react'
import {useDispatch, useSelector} from 'react-redux'

import locationIcon from '../../../assets/images/map-pin.svg'
import {selectAllAddresses, fetchAddresses, deleteAddress, addAddress, changeAddress} from '../../../store/profileSlice'

import UserInfo from '../../../components/Profile/UserInfo/UserInfo'
import AddAddressModal from '../../../components/Profile/modals/AddAddressModal/AddAddressModal'
import DeleteAddressModal from '../../../components/Profile/modals/DeleteAddressModal/DeleteAddressModal'
import ChangeAddressModal from '../../../components/Profile/modals/ChangeAddressModal/ChangeAddressModal'

const DeliveryAddresses = () => {
    const [isShowAddAddressModal, setIsShowAddAddressModal] = useState(false)
    const [isShowDeleteAddressModal, setIsShowDeleteAddressModal] = useState(false)
    const [addressForDeleting, setAddressForDeleting] = useState(null)
    const [isShowChangeAddressModal, setIsShowChangeAddressModal] = useState(false)
    const [addressForChanging, setAddressForChanging] = useState(null)
    const dispatch = useDispatch()
    const addresses = useSelector(selectAllAddresses)

    useEffect(() => {
        if (!addresses) dispatch(fetchAddresses())
    }, [dispatch])

    const preparedAddresses = useMemo(() => addresses?.map(address => (
        {
            id: address.id,
            address: `${address.city.name}, ${address.street}, ${address.building}`
        }
    )), [addresses])

    const showDeleteAddressModal = (address) => {
        setAddressForDeleting(address)
        setIsShowDeleteAddressModal(true)
    }

    const onDeleteAddress = () => {
        dispatch(deleteAddress({ addressId: addressForDeleting.id }))
        setAddressForDeleting(null)
        setIsShowDeleteAddressModal(false)
    }

    const showChangeAddressModal = (addressId) => {
        setAddressForChanging(addresses.find(address => address.id === addressId))
        setIsShowChangeAddressModal(true)
    }

    const onChangeAddress = (changedAddress) => {
        dispatch(changeAddress({ address: changedAddress }))
        setAddressForChanging(null)
        setIsShowChangeAddressModal(false)
    }

    const onAddAddress = (data) => {
        dispatch(addAddress({ address: data }))
        setIsShowAddAddressModal(false)
    }

    return (
        <>
            {preparedAddresses &&
                <UserInfo
                    emptyInfoNotify={'Вы ещё не добавили ни одного адреса'}
                    buttonName={'Добавить адрес'}
                    items={preparedAddresses}
                    icon={locationIcon}
                    addField={() => setIsShowAddAddressModal(true)}
                    deleteField={showDeleteAddressModal}
                    changeField={showChangeAddressModal}
                />
            }

            {isShowAddAddressModal &&
                <AddAddressModal
                    addAddress={onAddAddress}
                    closeModal={() => setIsShowAddAddressModal(false)}
                />
            }

            {isShowChangeAddressModal &&
                <ChangeAddressModal
                    changeAddress={onChangeAddress}
                    closeModal={() => setIsShowChangeAddressModal(false)}
                    addressValues={addressForChanging}
                />
            }

            {isShowDeleteAddressModal &&
                <DeleteAddressModal
                    address={addressForDeleting.address}
                    deleteAddress={onDeleteAddress}
                    closeModal={() => setIsShowDeleteAddressModal(false)}
                />
            }
        </>
    )
}

export default DeliveryAddresses