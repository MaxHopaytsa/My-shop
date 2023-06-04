
import React from 'react'
import { getAllShops, getEatsByShopId } from '../../../../prisma/shop';
import MyImage from '@/app/components/other/MyImage';
import GroupButtonForEatCard from '@/app/components/buttons/GroupButtonForEatCard';

export const revalidate = 3600;

async function Shop({ params: { name } }) {
  const shops = await getAllShops();
  const currentShop = shops.find((shop) => shop.name === name);
 
  if (currentShop) {
  const eats = await getEatsByShopId(currentShop.id);
    return (
      <div className="bg-white">
        <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
          <h2 className="sr-only">Shops</h2>
          <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-1 lg:grid-cols-2 xl:grid-cols-2 xl:gap-x-8">
            {eats.map((eat) => (
              <div key={eat._id} className="group flex">
                <div className="mr-4">
                  <div className="w-30 h-30 overflow-hidden rounded-lg flex-shrink-0">
                    <MyImage src={eat.imageSrc} width="160" height="104"  alt={eat.imageAlt}/>
                  </div>
                </div>
                <div className="flex flex-col justify-between flex-grow">
                  <div>
                    <h3 className="text-lg font-bold">{eat.name}</h3>
                    <p className="text-gray-500 mt-2">{eat.ingredients}</p>
                  </div>
                  <GroupButtonForEatCard eat={eat} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  } else {
    return null
  }
}
export default Shop