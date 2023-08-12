import React from 'react'
import {Outlet} from 'react-router-dom'
import SectionTabs from './SectionTabs/SectionTabs'

const SectionLayout = ({sectionTabs}) => {

    return (
        <>
            <SectionTabs sectionTabs={sectionTabs}/>
            <Outlet/>
        </>
    )
}

export default SectionLayout