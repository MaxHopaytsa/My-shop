import React from 'react'
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline'
//Button for Mobile menu
function ButtonToggleResponsiveMenu({open,onClick}) {
  return (
    <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
    <button
      onClick={onClick}
      className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
    >
      <span className="sr-only">Open main menu</span>
      {open ? (
        <XMarkIcon className="block h-8 w-6" aria-hidden="true" />
      ) : (
        <Bars3Icon className="block h-8 w-6" aria-hidden="true" />
      )}
    </button>
  </div>
  )
}

export default ButtonToggleResponsiveMenu