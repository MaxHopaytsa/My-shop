import React from 'react'
import {  PlusIcon, MinusIcon } from '@heroicons/react/24/outline'
import { useDispatch, useSelector } from 'react-redux';
import { quantitySelector } from '@/Redux/Selectors';
import { increaseQuantity, decreaseQuantity, removeFromCart } from '@/Redux/cartSlice';

//Buttons for adding and subtracting dishes from the cart
function QuantityButton({eatId}) {
    const dispatch = useDispatch();
    const quantityArray = useSelector(quantitySelector);
    const quantity = quantityArray[eatId];
    
    const handleIncreaseQuantity = (id) => {
        dispatch(increaseQuantity({ id }));
      };
    
      const handleDecreaseQuantity = (id,quantity) => {
        if (quantity === 1) {
          dispatch(removeFromCart(id));
        } else {
          dispatch(decreaseQuantity({ id }));
        }
      };

  return (
    <div className="flex items-center ml-auto">
                      <button type="button" className="bg-green-500 text-white p-1 rounded-full"
                       onClick={() => handleDecreaseQuantity(eatId,quantity)}
                      >
                        <MinusIcon className="h-4 w-4" />
                      </button>
                      <p className="text-gray-700 font-bold m-1 "> {quantity} </p>
                      <button type="button" className="bg-green-500 text-white p-1 rounded-full"
                      onClick={() => handleIncreaseQuantity(eatId)}
                      >
                        <PlusIcon className="h-4 w-4" />
                      </button>
                    </div>
  )
}

export default QuantityButton