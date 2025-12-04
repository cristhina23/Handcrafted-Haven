import { connectDB } from "@/lib/db/db";
import { Order } from "@/lib/models/Order";
import { Product } from "@/lib/models/Product";
import { User } from "@/lib/models/User";

async function main() {
  try {
    await connectDB();

    const users = await User.find();
    const products = await Product.find();

    const orders = [];

    const startDate = new Date();
    startDate.setMonth(startDate.getMonth() - 6);
    const endDate = new Date();

    const statuses: Array<"pending" | "processing" | "shipped" | "delivered"> = [
      "pending",
      "processing",
      "shipped",
      "delivered",
    ];

    const fifteenDaysAgo = new Date();
    fifteenDaysAgo.setDate(fifteenDaysAgo.getDate() - 15);

    for (const buyer of users) {
      const orderCount = Math.floor(Math.random() * 5) + 1;

      for (let i = 0; i < orderCount; i++) {
        const itemCount = Math.floor(Math.random() * 3) + 1;
        const orderItems = [];
        let itemsTotal = 0;

        const selectedProducts: string[] = [];

        for (let j = 0; j < itemCount; j++) {
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          let product: any;
          do {
            product = products[Math.floor(Math.random() * products.length)];
          } while (selectedProducts.includes(product._id.toString()));
          selectedProducts.push(product._id.toString());

          const quantity = Math.floor(Math.random() * 3) + 1;
          const subtotal = product.price * quantity;

          orderItems.push({
            productId: product._id,
            sellerId: product.sellerId,
            quantity,
            priceAtPurchase: product.price,
            discount: 0,
            subtotal,
          });

          itemsTotal += subtotal;
        }

        const shippingTotal = Math.floor(Math.random() * 15) + 5;
        const grandTotal = itemsTotal + shippingTotal;

        const createdAt = new Date(
          startDate.getTime() + Math.random() * (endDate.getTime() - startDate.getTime())
        );

        // Si la orden es de hace más de 15 días, marcar como "delivered"
        let status: "pending" | "processing" | "shipped" | "delivered";
        if (createdAt < fifteenDaysAgo) {
          status = "delivered";
        } else {
          status = statuses[Math.floor(Math.random() * (statuses.length - 1))]; 
          // -1 para excluir "delivered" de las recientes
        }

        const order = new Order({
          buyerId: buyer._id,
          items: orderItems,
          itemsTotal,
          shippingTotal,
          grandTotal,
          status,
          createdAt,
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
