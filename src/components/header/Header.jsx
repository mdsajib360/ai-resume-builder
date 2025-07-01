import React from 'react'
import { Button } from '../ui/button'
import { Link } from 'react-router-dom'
import { UserButton, useUser } from '@clerk/clerk-react'

function Header() {
  const {user, isSignedIn, isLoaded} = useUser() 
  return (
    <div className=' p-3 px-5 flex item-center justify-between shadow-md'>
      <Link to="/" > 
      <img src="../../../public/logo.png" width={50} height={100} alt="logo" />
      </Link>
      {!isSignedIn && isLoaded &&
        <div>
           <Link to="/" >
          <Button className="text-white">Home</Button>
        </Link>
        <Link to="/auth/sign-in" >
          <Button className="text-white">Get Started</Button>
        </Link>
      </div>
    
      }{ isSignedIn && isLoaded &&
        <div className='flex items-center gap-2'>
           <Link to="/" >
          <Button className="text-white">Home</Button>
        </Link>
          <Link className='text-white' to="/dashboard" >
            <Button>Dashboard</Button>
          </Link>
          <UserButton />
        </div>
    }
    </div>
  )
}

export default Header