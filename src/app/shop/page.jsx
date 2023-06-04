
import Link from 'next/link'
import React from 'react'
import { getAllShops } from '../../../prisma/shop'
import MyImage from '../components/other/MyImage';

export const metadata = {
  title: 'Shop | My shop'
}

export const revalidate = 3600;

async function Shops() {
  const shops = await getAllShops();
  return (
    <div className="bg-white">
      <div className="mx-auto max-w-2xl  px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
        <h2 className="sr-only">Shops</h2>
        <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
          {shops.map((shop) =>(
            <Link key={shop._id} href={shop.href} className="group">
              <div className="aspect-h-1 h-50  aspect-w-1 w-full overflow-hidden rounded-lg bg-gray-200 xl:aspect-h-8 xl:aspect-w-7">
                <MyImage src={shop.imageSrc} width="291" height="291"  alt={shop.imageAlt}/>
              </div>
              <h3 className="mt-2 font-bold text-lg ">{shop.title}</h3>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Shops