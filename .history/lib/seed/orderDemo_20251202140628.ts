import { connectDB } from "@/lib/db/db";
import { Order } from "@/lib/models/Order";
import { Product } from "@/lib/models/Product";
import { User } from "@/lib/models/User";

async function main() {
  try {
    await connectDB();

    const users = await User.find(); // tus usuarios
    const products = await Product.find(); // tus productos

    const orders = [];

    // Ejemplo: cada usuario hace 2 órdenes con productos aleatorios
    for (const buyer of users) {
      for (let j = 0; j < 2; j++) {
        const product = products[Math.floor(Math.random() * products.length)];
        const quantity = Math.floor(Math.random() * 3) + 1; // 1 a 3
        const subtotal = product.price * quantity;
        const shippingCost = 10; // puedes poner un valor fijo o variable
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
              subtotal,
            },
          ],
          itemsTotal: subtotal,
          shippingTotal: shippingCost,
          grandTotal,
          status: "pending", // o "processing", "shipped", "delivered"
        });

        orders.push(order);
      }
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
