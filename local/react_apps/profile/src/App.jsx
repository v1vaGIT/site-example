import React from 'react'
import {Route, Routes} from 'react-router-dom'

import s from './assets/styles/index.module.scss'

import ProfileTitle from './UI/Profile/ProfileTitle/ProfileTitle'
import Layout from './components/Profile/Layout/Layout'
import SectionLayout from './components/Profile/SectionLayout/SectionLayout'

import MyProfile from './pages/profile/MyProfile/MyProfile'
import DeliveryAddresses from './pages/profile/MyProfile/DeliveryAddresses'
import MyCars from './pages/profile/MyProfile/MyCars'
import Relatives from './pages/profile/MyProfile/Relatives'

import CurrentOrders from './pages/profile/OrdersHistory/CurrentOrders'
import OrdersHistory from './pages/profile/OrdersHistory/OrdersHistory'

import Calendar from './pages/profile/Calendar/Calendar'
import BonusClub from './pages/profile/BonusClub/BonusClub'
import Favorites from './pages/profile/Favorites/Favorites'

import {myProfileTabs, ordersHistoryTabs} from './utils/consts'

function App() {

    return (
        <div className={s.appWrapper}>
            <ProfileTitle/>
            <Routes>
                <Route path={'profile/'} element={<Layout/>}>
                    <Route path={'my/'} element={<SectionLayout sectionTabs={myProfileTabs}/>}>
                        <Route path="data/" element={<MyProfile/>}/>
                        <Route path="delivery-addresses/" element={<DeliveryAddresses/>}/>
                        <Route path="cars/" element={<MyCars/>}/>
                        <Route path="relatives/" element={<Relatives/>}/>
                    </Route>
                    <Route path="orders/" element={<SectionLayout sectionTabs={ordersHistoryTabs}/>}>
                        <Route path="current/" element={<CurrentOrders/>}/>
                        <Route path="history/" element={<OrdersHistory/>}/>
                    </Route>
                    <Route path="calendar/" element={<Calendar/>}/>
                    <Route path="bonus-club/" element={<BonusClub/>}/>
                    <Route path="favorites/" element={<Favorites/>}/>
                </Route>
            </Routes>
        </div>
    )
}


export default App
