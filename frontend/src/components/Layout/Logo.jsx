import React from 'react'
import logo from '../../assets/logo.png'
import { Link } from 'react-router-dom'

export default function LogoImage() {
    return (
        <Link className='m-1' to={'/'}>
            <img className='h-9 md:h-11 xl:h-12' src={logo} alt="Logo" />
        </Link>
    )
}