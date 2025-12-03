import { connectDB } from "@/lib/db/db";
import { faker } from "@faker-js/faker";
import { Order } from "@/lib/models/Order";
import { Product } from "@/lib/models/Product";
import { User } from "@/lib/models/User";

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
            sellerId: produ
