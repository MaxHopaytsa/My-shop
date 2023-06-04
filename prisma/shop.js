import prisma from "@/app/lib/prisma";
import { cache } from "react";

// Read shops
export const getAllShops = cache(async () => {
  try {
    const shops = await prisma.shop.findMany({});
    console.log(shops);
    return shops;
  } catch (error) {
    console.error('Error reading shops:', error);
    throw new Error('Failed to get shops');
  }
});

// Read dishes
export const getEatsByShopId = cache(async (shopId) => {
  try {
    const eats = await prisma.eat.findMany({
      where: {
        shopId: shopId,
      },
      include: {
        shop: true,
      },
    });
    return eats;
  } catch (error) {
    console.error('Error reading dishes:', error);
    throw new Error('Failed to get dishes');
  }
});