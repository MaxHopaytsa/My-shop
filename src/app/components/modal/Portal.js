'use client'
import {useState, useEffect} from 'react'
import { createPortal } from 'react-dom'

function Portal({children}) {
    const [mounted, setMounted]=useState(false)
    useEffect(()=>{
        setMounted(true);
        return ()=> setMounted(false)
    },[])
  return mounted? createPortal(children, document.getElementById('portal-root')):null
}

export default Portal