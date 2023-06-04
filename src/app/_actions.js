'use server'
import prisma from "@/app/lib/prisma";

//Creat order
export const createOrder = async (data) => {
    try {
      const {
        name,
        email,
        mobilePhoneNumber,
        city,
        street,
        house,
        eats,
        totalAmount,
      } = data;
console.log(data)
      const existingUser = await prisma.user.findFirst({
        where: { mobilePhoneNumber },
      });
      
      let user;
      if (existingUser) {
        user = existingUser;
      } else {
        user = await prisma.user.create({
          data: {
            name,
            email,
            mobilePhoneNumber,
          },
        });
      }

    const order = await prisma.order.create({
        data: {
          user: {
            connect: { id: user.id },
          },
          userName: user.name,
          userEmail: user.email,
          userMobile: user.mobilePhoneNumber,
          city,
          street,
          house,
          totalAmount,
          eatQuantity: {
            set: eats.map((eat) =>eat.quantity),
          },
          orderEats: {
            connectOrCreate: eats.map((eat) => ({
              where: { id: eat.id },
              create: { eat: { connect: { id: eat.id } } },
            })),
          },
        },
        include: {
          orderEats: {
            include: {
              eat: true,
            },
          },
        },
      });
    } catch (error) {
      console.error('Error creating order:', error);
      throw new Error('Failed to create an order');
    } finally {
      await prisma.$disconnect();
    }
  };

  //Read order

  export const getOrderHistory = async (data) => {
    try {
      const { mobilePhoneNumber } = data;
      const orders = await prisma.order.findMany({
        where: { userMobile: mobilePhoneNumber },
        include: {
          orderEats: {
            include: {
              eat: true
            }
          }
        }
      });
      return orders;
    } catch (error) {
      console.error('Error finding order:', error);
      throw new Error('Failed to get an order');
    } finally {
      await prisma.$disconnect();
    }
  };