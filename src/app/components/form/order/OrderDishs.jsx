import React,{memo} from 'react'
import {  XMarkIcon } from '@heroicons/react/24/outline'
import { useSelector,useDispatch } from 'react-redux'
import { removeFromCart } from '@/Redux/cartSlice';
import QuantityButton from '../../buttons/QuantityButton';
import { totalPriceSelector} from '@/Redux/Selectors';
import MyImage from '../../other/MyImage';

//List of dishes in the order
function OrderDishes({eats,totalPriceSum}) {
    const dispatch = useDispatch();
    const totalPrice = useSelector(totalPriceSelector)

    const onRemove = (id) => {dispatch(removeFromCart(id));};

  return (
    <div className="space-y-4">
    {eats.length?(
      <>
      {eats.map((eat) => {
      const total = totalPrice[eat.id];
      return(
     <div key={eat.id} className="flex bg-gray-100 p-4 rounded-lg relative">
        <MyImage src={eat.imageSrc} width="160" height="104" className="w-32 h-32 object-cover rounded"  alt={eat.imageAlt}/>
        <div className="flex justify-between items-center mt-2">
      <h3 className="text-md ml-3 font-bold "> {eat.name}</h3>
      <div className="flex flex-col items-center justify-between ml-5 sm:ml-40">
        <QuantityButton eatId={eat.id}/>
        <p className="text-gray-700 text-md font-bold ">{total||eat.price} UAH</p>
      </div>
        <button onClick={() => onRemove(eat.id)} className=" text-red-500  p-1 rounded-md absolute top-0 right-0">
          <XMarkIcon className="h-6 w-6" />
        </button>
      </div>
      </div>
    )})}
    <p className=" text-gray-700 text-md font-bold text-center ">To pay: {totalPriceSum} UAH</p>
    </>
    ):(<p className=" text-center ">Please add a dish</p>)}
  </div>
  )
}

export default memo(OrderDishes)