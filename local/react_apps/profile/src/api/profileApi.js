import {instance} from './index'

const profileApi = {
    async fetchUserData() {
        // return await instance.get(`/profile/user/`)
        return {
            data: {
                user: {
                    agreement: false,
                    firstName: 'Олег',
                    lastName: 'Юдин',
                    date: '18.08.1993',
                    gender: 'Мужской',
                    phone: '79662725142',
                    email: 'oleg.udin@tokyo.vdk'
                }
            }
        }
    },
    async changeUserData(userData) {
        // return await instance.put(`/profile/user/change`, {user: userData})
        return { status: 200, data: {} }
    },
    async fetchAddresses() {
        // return await instance.get(`/profile/addresses/`)
        return {
            data: {
                addresses: [{
                    id: 1,
                    building: '23',
                    city: { id: 11, name: 'Владивосток' },
                    street: 'роспект Красного Знамени',
                    entrance: '32',
                    floor: '32',
                    flat: '47',
                    comment: '',
                }, {
                    id: 2,
                    building: '23',
                    city: { id: 21, name: 'Хабаровск' },
                    street: 'проспект Красного Знамени',
                    entrance: '32',
                    floor: '32',
                    flat: '47',
                    comment: '',
                }, {
                    id: 3,
                    building: '23',
                    city: { id: 31, name: 'Благовещенск' },
                    street: 'проспект Красного Знамени',
                    entrance: '32',
                    floor: '32',
                    flat: '47',
                    comment: '',
                }]
            }
        }
    },
    async addAddress(address) {
        // return await instance.post(`/profile/addresses/add/${address}`, {address})
        return { status: 200, data: { id: Math.random() } }
    },
    async deleteAddress(addressId) {
        // return await instance.get(`/profile/addresses/delete/${addressId}`)
        return { status: 200, data: { id: addressId } }
    },
    async changeAddress(address) {
        // return await instance.pus(`/profile/addresses/change/${address}`, {address})
        return { status: 200 }
    },
}

export {profileApi}