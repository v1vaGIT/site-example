import React, {useMemo} from 'react'
import {Link, useLocation,} from 'react-router-dom'
import clsx from 'clsx'

import s from './styles.module.scss'

import {profileTabs} from '../../../../utils/consts'

const Header = () => {
    const location = useLocation()

    const sectionsButtons = useMemo(() => profileTabs?.map((section) => {
        const buttonStyle = clsx(s.sectionLink, { [s.linkActive]: location.pathname.includes(section.link.split('/')[0]) })

        return (
            <Link to={section.link} key={section.id} className={buttonStyle}>
                {section.name}
            </Link>
        )
    }), [location.pathname])

    return (
        <div className={s.mainSections}>
            {sectionsButtons}
        </div>
    )
}

export default Header