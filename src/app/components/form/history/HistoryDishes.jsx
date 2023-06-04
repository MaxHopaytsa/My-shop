import React from 'react'
import MyImage from '../../other/MyImage';

//List of dishes in the order history
const HistoryDishes = ({ eats }) => {
  return (
    <div className="bg-white">
    <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
      <h2 className="sr-only">Order History</h2>
      {eats.map((order, index) =>(
        <div key={index} className="my-8">
          <h3 className="text-lg font-bold">Order {index + 1}</h3>
          <p>
           Address: {order.city}, {order.street}, {order.house}
          </p>
          <p>Created: {new Date(order.created).toLocaleDateString()} {new Date(order.created).toLocaleTimeString()}</p>
          {order.orderEats.map((orderEat, orderEatIndex) => (
            <div key={orderEatIndex} className="flex items-center mt-4">
              <MyImage src={orderEat.eat.imageSrc} width="160" height="104"  alt={orderEat.eat.imageAlt}/>
              <div>
                <h3 className="text-lg font-bold">{orderEat.eat.name}</h3>
                <p>Ordered {order.eatQuantity[orderEatIndex]} servings for {orderEat.eat.price} UAH/portion</p>
                <p className="text-gray-500 mt-2">{orderEat.eat.ingredients}</p>
              </div>
            </div>
          ))}
          <p className="mt-4">Total Amount: {order.totalAmount} UAH</p>
        </div>
      ))}
    </div>
  </div>
  );
};

export default HistoryDishes