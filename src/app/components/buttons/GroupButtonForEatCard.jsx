'use client'
import React from 'react'
import { addToCart} from '@/Redux/cartSlice';
import { useDispatch, useSelector } from 'react-redux';
import QuantityButton from '@/app/components/buttons/QuantityButton';
import { totalPriceSelector } from '@/Redux/Selectors';
import { useModal } from '../../hooks/useModal';
import ModalWindow from '../modal/ModalWindow';
//Button to add food to the cart
function GroupButtonForEatCard({eat}) {
    const dispatch = useDispatch();
    const cart = useSelector((state) => state.eats);
    const totalPrice = useSelector(totalPriceSelector)
    const { isModalOpen, openModal, closeModal } = useModal();

    const handleAddToCart = (eat) => {
      const cartFromOtherShops = cart.some((item) => item.shopId !== eat.shopId);
      if (cartFromOtherShops) {
        openModal();
        return;
      }
      dispatch(addToCart(eat));
    };

    const isAddedToCart = cart.some((item) => item.id === eat.id); 
    const total = totalPrice[eat.id];

  return (
    <div className="flex items-end">
              <p className="text-gray-700 font-bold mt-3">{total||eat.price} грн</p>
              {isAddedToCart ? (<QuantityButton eatId={eat.id}/>):(
          <button onClick={() => handleAddToCart(eat)}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 ml-auto">
           Add to Cart
         </button>
         )}
         {isModalOpen && (<ModalWindow onClick={closeModal} text='Dishes can only be ordered from one shop. To order food from this shop, empty the cart.' />)}
   </div>
  )
}

export default GroupButtonForEatCard