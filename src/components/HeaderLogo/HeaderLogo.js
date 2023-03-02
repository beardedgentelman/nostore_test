import { Link } from 'react-router-dom'

import logo from '../../assets/icons/logo.png'

import './header-logo.css'

const HeaderLogo = () => {
  return (
    <Link to='/' className='w-14'>
      <img className='logo_animation' src={logo} alt='logo' />
    </Link>
  )
}

export default HeaderLogo
