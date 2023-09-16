import Link from 'next/link'
import React from 'react'

const HeaderPage = () => {
  return (
    <div className='flex justify-between max-w-[1200px] m-auto items-center h-[80px]'>
        <h1 className='text-[24px] font-bold'>Synapsis Blog.</h1>
        <ul className='flex gap-6'>
            <li>
              <Link href="/">
                <span>Home</span>
              </Link>
            </li>
            <li>
              <Link href="/user-list">
                <span>User List</span>
              </Link>
            </li>
        </ul>
    </div>
  )
}

export default HeaderPage