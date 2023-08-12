import React, {useMemo} from 'react'
import {Link, useLocation} from 'react-router-dom'
import clsx from 'clsx'
import s from './styles.module.scss'

const SectionTabs = ({sectionTabs}) => {
    const location = useLocation()

    const sectionTabList = useMemo(() => sectionTabs?.map((tab) => {
        const buttonStyle = clsx(s.link, { [s.linkActive]: location.pathname.includes(tab.link) })

        return (
            <Link to={tab.link} key={tab.id} className={buttonStyle}>
                {tab.svg}
                {tab.name}
            </Link>
        )
    }), [location.pathname])

    return (
        <div className={s.container}>
            {sectionTabList}
        </div>
    )
}

export default SectionTabs