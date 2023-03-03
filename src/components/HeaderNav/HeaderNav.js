import { NavLink } from 'react-router-dom'
import { useAuth0 } from '@auth0/auth0-react'

const userIcon = (
  <svg
    className='hover:fill-yellow-400 transition-all'
    width='25'
    fill='rgb(253 244 255)'
    viewBox='0 0 32 32'
    xmlns='http://www.w3.org/2000/svg'
  >
    <title />
    <g id='about'>
      <path d='M16,16A7,7,0,1,0,9,9,7,7,0,0,0,16,16ZM16,4a5,5,0,1,1-5,5A5,5,0,0,1,16,4Z' />
      <path d='M17,18H15A11,11,0,0,0,4,29a1,1,0,0,0,1,1H27a1,1,0,0,0,1-1A11,11,0,0,0,17,18ZM6.06,28A9,9,0,0,1,15,20h2a9,9,0,0,1,8.94,8Z' />
    </g>
  </svg>
)

const cartIcon = (
  <svg
    className='hover:fill-yellow-400 transition-all'
    width='25'
    fill='rgb(253 244 255)'
    viewBox='0 0 30 30'
    xmlns='http://www.w3.org/2000/svg'
  >
    <path d='M10.5 17h14c.278 0 .5.223.5.5s-.222.5-.5.5h-14c-.276 0-.5-.223-.5-.5s.224-.5.5-.5zm-1-4h16c.278 0 .5.223.5.5s-.222.5-.5.5h-16c-.276 0-.5-.223-.5-.5s.224-.5.5-.5zm-9-8c-.653 0-.67 1 0 1h3.6c.078.346.64 2.81 1.312 5.736.717 3.126 1.452 7.32 1.606 7.893.132.494.255 1.055.62 1.544.362.488 1 .826 1.862.826h16c.86 0 1.5-.338 1.863-.826.364-.49.487-1.05.62-1.545.265-.993 1.62-6.944 1.89-7.952.152-.566.202-1.156.022-1.69-.18-.534-.72-.988-1.395-.988h-20c-.653 0-.66 1 0 1h20c.325 0 .366.07.447.31.08.238.076.674-.04 1.108-.267.992-1.62 6.945-1.89 7.953-.135.506-.262.945-.456 1.206-.194.262-.42.424-1.06.424h-16c-.64 0-.866-.162-1.06-.424-.195-.26-.322-.7-.458-1.205-.114-.426-.88-4.732-1.595-7.856-.717-3.125-1.4-6.125-1.4-6.125C4.938 5.16 4.735 5 4.5 5zm23 18c-1.373 0-2.5 1.125-2.5 2.5s1.127 2.5 2.5 2.5c1.376 0 2.5-1.125 2.5-2.5S24.877 23 23.5 23zm0 1c.836 0 1.5.666 1.5 1.5s-.664 1.5-1.5 1.5c-.833 0-1.5-.666-1.5-1.5s.667-1.5 1.5-1.5zm-12-1C10.128 23 9 24.125 9 25.5s1.127 2.5 2.5 2.5c1.376 0 2.5-1.125 2.5-2.5S12.877 23 11.5 23zm0 1c.836 0 1.5.666 1.5 1.5s-.664 1.5-1.5 1.5c-.833 0-1.5-.666-1.5-1.5s.667-1.5 1.5-1.5z' />
  </svg>
)

const HeaderNav = props => {
  const activeLink = 'text-sm hover:text-yellow-400 transition-all underline underline-offset-4'
  const nonActiveLink = 'text-sm hover:text-yellow-400 transition-all'

  const navClass = ({ isActive }) => (isActive ? activeLink : nonActiveLink)

  const { loginWithRedirect, logout, user, isLoading } = useAuth0()

  return (
    <nav className=''>
      <ul className='flex items-center gap-4'>
        {!isLoading && !user && (
          <>
            <button
              className='py-1 px-2 text-sm text-fuchsia-50 bg-sky-500 rounded hover:bg-sky-700 transition-all'
              onClick={() => loginWithRedirect()}
            >
              Увійти або Зареєструватися
            </button>
          </>
        )}
        {!isLoading && user && (
          <>
            <li className='mx-1 flex items-center '>
              <NavLink className={navClass} to='/products'>
                Список товарів
              </NavLink>
            </li>
            <li className='mx-1 flex items-center '>
              <NavLink to='/user_page'>
                {user ? <img className='rounded-full w-12 h-12' src={user.picture} alt={user.name} /> : { userIcon }}
              </NavLink>
            </li>
            <li className='mx-1 flex items-center relative'>
              <NavLink to='/cart'>
                {cartIcon}
                {props.cartQuantity ? (
                  <span className='flex items-center justify-center w-4 h-4 rounded-full bg-green-400 absolute top-0 right-[-5px] text-[10px] font-bold text-gray-900'>
                    {props.cartQuantity}
                  </span>
                ) : null}
              </NavLink>
            </li>
            <button
              className='py-1 px-2 text-sm text-fuchsia-50 bg-sky-500 rounded hover:bg-sky-700 transition-all'
              onClick={() => logout()}
            >
              Вийти
            </button>
          </>
        )}
      </ul>
    </nav>
  )
}

export default HeaderNav
