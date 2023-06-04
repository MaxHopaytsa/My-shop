const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient()

const shopData = [
          {
            title: 'McDonalds',
            name: 'mc',
            href: `/shop/mc`,
            latitude: 50.4510788,
            longitude: 30.5214591,
            imageSrc: 'mc.jpg',
            imageAlt: 'mc',
            eats:[
              {
                name: 'Potato',
                ingredients: 'Ingredient 1, Ingredient 2, Ingredient 3',
                price: 18,
                imageSrc: 'potato.jpg',
                imageAlt: 'potato',
              },
              {
                name: 'Burger1',
                ingredients: 'Ingredient 1, Ingredient 2, Ingredient 3',
                price: 98,
                imageSrc: 'burger1.jpg',
                imageAlt: 'burger1',
              },
              {
                name: 'Burger2',
                ingredients: 'Ingredient 1, Ingredient 2, Ingredient 3',
                price: 108,
                imageSrc: 'burger2.jpg',
                imageAlt: 'burger2',
              },
              {
                name: 'Burger3',
                ingredients: 'Ingredient 1, Ingredient 2, Ingredient 3',
                price: 104,
                imageSrc: 'burger3.jpg',
                imageAlt: 'burger3',
              },
            ]
          },
          {
            title: 'KFC',
            name: 'kfc',
            href: '/shop/kfc',
            latitude: 50.4391076,
            longitude: 30.4850542,
            imageSrc: 'kfc.jpg',
            imageAlt: 'kfc',    
            eats:[
              {
                name: 'Bucket',
                ingredients: 'Ingredient 1, Ingredient 2, Ingredient 3',
                price: 129,
                imageSrc: 'bucket.jpg',
                imageAlt: 'bucket',
               
              },
              {
                name: 'Potato',
                ingredients: 'Ingredient 1, Ingredient 2, Ingredient 3',
                price: 25,
                imageSrc: 'potatoskfc.jpg',
                imageAlt: 'potatoskfc',
              },
              {
                name: 'Potato',
                ingredients: 'Ingredient 1, Ingredient 2, Ingredient 3',
                price: 25,
                imageSrc: 'potatoskfc.jpg',
                imageAlt: 'potatoskfc',
              },
              {
                name: 'Chicken burger',
                ingredients: 'Ingredient 1, Ingredient 2, Ingredient 3',
                price: 25,
                imageSrc: 'chickenburger.jpg',
                imageAlt: 'chickenburger',
              },
              {
                name: 'Wings',
                ingredients: 'Ingredient 1, Ingredient 2, Ingredient 3',
                price: 25,
                imageSrc: 'wings.jpg',
                imageAlt: 'wings',
              },
            ]
          },
          {
            title: 'Пузата хата',
            name: 'puzatahata',
            href: '/shop/puzatahata',
            latitude: 50.462814,
            longitude: 30.519653,
            imageSrc: 'puzH.jpg',
            imageAlt: 'puzH',
            eats:[
                {
                  name: 'Cake',
                  ingredients: 'Ingredient 1, Ingredient 2, Ingredient 3',
                  price: 89,
                  imageSrc: 'cake.jpg',
                  imageAlt: 'cake',
                 
                },
                {
                  name: 'Borsch',
                  ingredients: 'Ingredient 1, Ingredient 2, Ingredient 3',
                  price: 55,
                  imageSrc: 'borsch.jpg',
                  imageAlt: 'borsch',
                },
                {
                  name: 'Solianka',
                  ingredients: 'Ingredient 1, Ingredient 2, Ingredient 3',
                  price: 65,
                  imageSrc: 'solianka.jpg',
                  imageAlt: 'solianka',
                },
                {
                  name: 'Vareniki',
                  ingredients: 'Ingredient 1, Ingredient 2, Ingredient 3',
                  price: 75,
                  imageSrc: 'vareniki.jpg',
                  imageAlt: 'vareniki',
                }
              ]
          },
          {
            
            title: 'Dominos',
            name: 'dominos',
            href: '/shop/dominos',
            latitude: 50.39640259999999,
            longitude: 30.5035045,
            imageSrc: 'Dominos_pizza.jpg',
            imageAlt: 'Dominos_pizza',
            eats:[
                {
                  name: 'Pizza1',
                  ingredients: 'Ingredient 1, Ingredient 2, Ingredient 3',
                  price: 189,
                  imageSrc: 'pizza1.jpg',
                  imageAlt: 'pizza1',
                 
                },
                {
                  name: 'Pizza2',
                  ingredients: 'Ingredient 1, Ingredient 2, Ingredient 3',
                  price: 135,
                  imageSrc: 'pizza2.jpg',
                  imageAlt: 'pizza2',
                },
                {
                  name: 'Pizza3',
                  ingredients: 'Ingredient 1, Ingredient 2, Ingredient 3',
                  price: 167,
                  imageSrc: 'pizza3.jpg',
                  imageAlt: 'pizza3',
                },
                {
                  name: 'Pizza4',
                  ingredients: 'Ingredient 1, Ingredient 2, Ingredient 3',
                  price: 195,
                  imageSrc: 'pizza4.jpg',
                  imageAlt: 'pizza4',
                },
              ]
          }
]
// Creating an initial database
async function main() {
    for (const shop of shopData) {
      const createdShop = await prisma.shop.create({
        data: {
          title: shop.title,
          name: shop.name,
          href: shop.href,
          latitude: shop.latitude,
          longitude: shop.longitude,
          imageSrc: shop.imageSrc,
          imageAlt: shop.imageAlt,
        },
      });
  
      for (const eat of shop.eats) {
        await prisma.eat.create({
          data: {
            shopId: createdShop.id,
            name: eat.name,
            ingredients: eat.ingredients,
            price: eat.price,
            imageSrc: eat.imageSrc,
            imageAlt: eat.imageAlt,
          },
        });
      }
    }
  }
main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })