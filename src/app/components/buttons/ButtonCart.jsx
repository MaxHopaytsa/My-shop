'use client'
import React from 'react'
import {ShoppingCartIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';
import { useSelector } from 'react-redux';
import  {totalPriceSumSelector } from '@/Redux/Selectors';

function ButtonCart() {
    const totalPriceSum = useSelector(totalPriceSumSelector)
return (
    <div className="fixed top-4 right-4 bg-white rounded-full shadow-lg p-2 flex items-center z-20">
      <Link href="/shopcart" className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white">
        <ShoppingCartIcon className="block h-6 w-auto" />
        <span className="ml-2 text-gray-700 font-bold">{totalPriceSum} грн</span>
      </Link>
    </div>
  );
}

export default ButtonCart