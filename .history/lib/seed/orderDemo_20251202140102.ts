import { connectDB } from "./lib/db";
import { faker } from "@faker-js/faker";
import { Order } from "@/lib/models/";
import { Product } from "./models/Product";
import { User } from "./models/User";

async function main() {
  try {
    await connectDB();

    const users = await User.find();
    const products = await Product.find();

    const orders = [];

    for (let i = 0; i < 50; i++) {
      const buyer = faker.helpers.arrayElement(users);
      const product = faker.helpers.arrayElement(products);

      const quantity = faker.datatype.number({ min: 1, max: 3 });
      const subtotal = product.price * quantity;
      const shippingCost = faker.datatype.number({ min: 5, max: 15 });
      const grandTotal = subtotal + shippingCost;

      const order = new Order({
        buyerId: buyer._id,
        items: [
          {
            productId: product._id,
            sellerId: product.sellerId,
            quantity,
            priceAtPurchase: product.price,
            discount: 0,
            discountedPrice: product.price,
            subtotal,
          },
        ],
        itemsTotal: subtotal,
        shippingTotal: shippingCost,
        grandTotal,
        status: faker.helpers.arrayElement(["pending", "processing", "shipped", "completed"]),
        createdAt: faker.date.between("2024-06-01", "2024-12-01"),
      });

      orders.push(order);
    }

    await Order.insertMany(orders);
    console.log("Órdenes demo creadas correctamente.");
    process.exit(0);
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
}

main();
