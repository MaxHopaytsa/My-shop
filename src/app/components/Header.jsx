
import React from 'react'
import Navigation from './Navigation';
import ResponsiveMenu from './ResponsiveMenu';
import { HomeIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';
import ButtonCart from './buttons/ButtonCart';
export default function Header() {

  return (
    <header className=" bg-gray-800">
    <nav>
      <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8 relative">
        <div className="flex items-center justify-between h-16">
        <ResponsiveMenu />
          <div className="flex items-center justify-center sm:items-stretch sm:justify-start  ">
            <Link href='/' className="inline-flex items-center justify-center p-2 rounded-md text-gray-400  hover:text-white">
              <HomeIcon className="block h-6 w-auto  ml-10"/>
            </Link>
            <div className="hidden h-8  sm:block sm:ml-6 ">
              <div className="flex space-x-4 ">
                <Navigation/>
              </div> 
             </div> 
          </div>
        <ButtonCart/>
        </div>
      </div>
      </nav>
    </header>
  )
}