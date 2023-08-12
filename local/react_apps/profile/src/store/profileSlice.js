import {createAsyncThunk, createSlice} from '@reduxjs/toolkit'
import {profileApi} from '../api/profileApi'

export const fetchUserData = createAsyncThunk('profile/fetchUserData', async () => {
    const response = await profileApi.fetchUserData()
    return { user: response.data.user }
})

export const changeUserData = createAsyncThunk('profile/changeUserData', async ({ user }) => {
    const response = await profileApi.changeUserData(user)
    return { user }
})

export const fetchAddresses = createAsyncThunk('profile/fetchAddresses', async () => {
    const response = await profileApi.fetchAddresses()
    return { addresses: response.data.addresses }
})

export const addAddress = createAsyncThunk('profile/addAddress', async ({ address }) => {
    const response = await profileApi.addAddress(address)
    return { address: { id: response.data.id, ...address } }
})

export const deleteAddress = createAsyncThunk('profile/deleteAddress', async ({ addressId }) => {
    const response = await profileApi.deleteAddress(addressId)
    return { addressId: response.data.id }
})

export const changeAddress = createAsyncThunk('profile/changeAddress', async ({ address }) => {
    const response = await profileApi.changeAddress(address)
    return { address }
})

const initialState = {
    user: null,
    addresses: null,
    status: 'idle',
    error: null
}

export const counterSlice = createSlice({
    name: 'profile',
    initialState,
    reducers: {},
    extraReducers(builder) {
        builder
            .addCase(fetchUserData.fulfilled, (state, action) => {
                state.user = action.payload.user
            })
            .addCase(changeUserData.fulfilled, (state, action) => {
                state.user = action.payload.user
            })
            .addCase(fetchAddresses.fulfilled, (state, action) => {
                state.addresses = action.payload.addresses
            })
            .addCase(addAddress.fulfilled, (state, action) => {
                if (state.addresses) {
                    state.addresses.push(action.payload.address)
                }
            })
            .addCase(deleteAddress.fulfilled, (state, action) => {
                state.addresses = state.addresses.filter(address => address.id !== action.payload.addressId)
            })
            .addCase(changeAddress.fulfilled, (state, action) => {
                const addressIndex = state.addresses.findIndex(address => address.id === action.payload.address.id)
                state.addresses[addressIndex] = action.payload.address
            })
    }
})

export const { increment } = counterSlice.actions

export default counterSlice.reducer

export const selectAllAddresses = state => state.profile.addresses

export const selectUserData = state => state.profile.user

// export const selectPostById = (state, postId) => state.posts.posts.find(post => post.id === postId)

// const post = useSelector(state => selectPostById(state, postId))