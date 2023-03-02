import { Link } from 'react-router-dom'

const FooterContainer = props => {
  return (
    <footer className='mt-auto w-full py-2 px-4 bg-slate-900 flex-shrink-0 flex flex-col'>
      <div className='flex-auto'>{props.children}</div>
      <p className='text-xs text-fuchsia-50 text-center'>
        &#9400; Andrii Hirskyi | <Link to='/privacy-policy'>Privacy Policy</Link>
      </p>
    </footer>
  )
}

export default FooterContainer
