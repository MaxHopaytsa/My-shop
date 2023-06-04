"use client"
import React,{useState, useEffect} from 'react'
import Navigation from './Navigation'
import ButtonToggleResponsiveMenu from './buttons/ButtonToggleMenu';
import { usePathname } from 'next/navigation';
function ResponsiveMenu() {
  const [open, setOpen] = useState(false); 
  const pathname = usePathname();

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  const handleToggleMenu = () => {
    setOpen(!open);
  };
  return (
    <>
   <ButtonToggleResponsiveMenu open={open} onClick={handleToggleMenu}/>
    {open && (
        <div className="sm:hidden h-fit absolute top-16 left-0 right-0 bottom-0 bg-gray-800 z-10 " >
          <div className="px-2 pt-2 pb-3 space-y-1">
            <Navigation display='block'/>
            </div>
        </div>
       )}
      </>
  )
}

export default ResponsiveMenu