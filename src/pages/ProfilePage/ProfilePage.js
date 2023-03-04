import { useAuth0 } from '@auth0/auth0-react'

const ProfilePage = () => {
  const { user } = useAuth0()

  const bgImg =
    'https://images.unsplash.com/photo-1499336315816-097655dcfbda?ixlib=rb-1.2.1&amp;ixid=eyJhcHBfaWQiOjEyMDd9&amp;auto=format&amp;fit=crop&amp;w=2710&amp;q=80'
  if (user) {
    return (
      <section className='py-16 bg-blueGray-50' style={{ background: `url(${bgImg}) center/cover` }}>
        <div className='w-full lg:w-4/12 px-4 mx-auto'>
          <div className='relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-xl rounded-lg mt-16'>
            <div className='px-6'>
              <div className='flex flex-col justify-center'>
                <div className='w-full relative'>
                  <img
                    alt='...'
                    src={user.picture}
                    className='shadow-xl rounded-full w-[120px] h-auto align-middle border-none absolute -top-[60px] right-1/2 translate-x-1/2 lg:-top-[60px]'
                  />
                </div>
                <div className='w-full px-4 text-center mt-20'>
                  <div className='flex justify-center py-4 lg:pt-4 pt-8'>
                    <div className='mr-4 p-3 text-center w-40'>
                      <span className='text-xl font-bold block uppercase tracking-wide text-blueGray-600'>0</span>
                      <span className='text-sm text-blueGray-400'>Purchases</span>
                    </div>
                    <div className='mr-4 p-3 text-center w-40'>
                      <span className='text-xl font-bold block uppercase tracking-wide text-blueGray-600'>0</span>
                      <span className='text-sm text-blueGray-400'>Wallet</span>
                    </div>
                  </div>
                </div>
              </div>
              <div className='text-center mt-12'>
                <h3 className='text-xl font-semibold leading-normal mb-2 text-blueGray-700'>{user.name}</h3>
                <div className='text-sm leading-normal mt-0 mb-2 text-blueGray-400 font-bold uppercase'>
                  <i className='fas fa-map-marker-alt mr-2 text-lg text-blueGray-400'></i>
                  {user.locale}
                </div>
                <div className='mb-2 text-blueGray-600 mt-10'>
                  <i className='fas fa-briefcase mr-2 text-lg text-blueGray-400'></i>
                  {user.birthdate}
                </div>
                <div className='mb-2 text-blueGray-600'>
                  <i className='fas fa-university mr-2 text-lg text-blueGray-400'></i>
                  {user.email}
                </div>
              </div>
              <div className='mt-10 py-10 border-t border-blueGray-200 text-center'>
                <div className='flex flex-wrap justify-center'>
                  <div className='w-full lg:w-9/12 px-4'>
                    <p className='mb-4 text-lg leading-relaxed text-blueGray-700'>{user.phone_number}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    )
  } else {
    return <div className='text-xl font-bold'>Loading...</div>
  }
}

export default ProfilePage
