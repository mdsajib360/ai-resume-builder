import React from 'react'
import { Button } from '../ui/button'

function Header() {
  return (
    <div className='p-3 px-5'>
      <img src="/logo.svg" width={100} height={100} alt="logo" />
      <Button className="">Get Started</Button>
    </div>
  )
}

export default Header