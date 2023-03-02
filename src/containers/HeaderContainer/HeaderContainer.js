import { useEffect } from 'react'

import './header-container.css'

const HeaderContainer = props => {
  useEffect(() => {
    let timeout
    let scroll = 0

    window.onscroll = () => {
      if (timeout) {
        clearTimeout(timeout)
      }

      timeout = setTimeout(() => {
        if (scroll >= window.scrollY && window.scrollY > 10) {
          document.getElementById('header').classList.add('sticky')
        } else {
          document.getElementById('header').classList.remove('sticky')
        }

        scroll = window.scrollY
      }, 10)
    }

    return () => {
      window.onscroll = null
    }
  }, [])

  return (
    <header
      id='header'
      className='bg-slate-900 text-fuchsia-50 text-xl w-full h-[80px] py-2 px-4 flex-shrink-0 flex items-center justify-center z-10'
    >
      <div className='w-full flex items-center justify-between container'>{props.children}</div>
    </header>
  )
}

export default HeaderContainer
