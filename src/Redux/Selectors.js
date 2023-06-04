'use client'

import { createSelector } from 'reselect';

const eatSelector = (state) => state.eats;
const quantitySelector = createSelector(
  eatSelector,
  (eats) => eats.reduce((quantityObj, eat) => {
    quantityObj[eat.id] = eat.quantity;
    return quantityObj;
  }, {})
);

const totalPriceSelector = createSelector(
  eatSelector,
  (eats) => {
    return eats.reduce((totalPriceObj, eat) => {
      const eatQuantity = eat.quantity || 0;
      const eatTotalPrice = eat.price * eatQuantity;
      totalPriceObj[eat.id] = eatTotalPrice;
      return totalPriceObj;
    },{});
  }
);

const totalPriceSumSelector = createSelector(
  totalPriceSelector,
  (totalPrices) => {
    return Object.values(totalPrices).reduce((sum, price) => sum + price, 0);
  }
);

export {quantitySelector, totalPriceSelector,totalPriceSumSelector}