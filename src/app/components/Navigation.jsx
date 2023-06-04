"use client"
import React from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation';

const navigation = [
    { name: 'Shop', href: '/shop' },
    { name: 'Order history', href: '/history' },
    { name: 'About us', href: '/about' },
    { name: 'Shares', href: '/shares' },
    { name: 'Leave a review', href: '/reviews'},
  ]

const Navigation = ({display}) =>{
  const pathname = usePathname();
  return (
    <>
    {navigation.map((item) => {
   const isActive = pathname===item.href;
      return(
        <Link href={item.href} key={item.name}
        className={`${
          isActive ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white'
        }  ${display} px-3 py-2 rounded-md text-sm font-medium`}>
            {item.name}
      
        </Link>
      )}
      )}
      </>
  )
}

export  default Navigation