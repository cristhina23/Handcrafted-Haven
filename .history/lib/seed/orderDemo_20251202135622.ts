import mongoose from "mongoose";
import { Order } from "./models/Order"; // Asegúrate de importar tu modelo de Order

// -------------------------
// Datos del vendedor
const sellerId = new mongoose.Types.ObjectId("692e709b758610b8abeb901c");

// Usuarios compradores
const buyers = [
  { _id: "692218de1bb94c4026ecee0f", fullName: "Cristhina Chacon" },
  { _id: "69228dac758610b8abeb63b4", fullName: "Laura Mendoza" },
  { _id: "69228dac758610b8abeb63b5", fullName: "Carlos Alvarez" },
  { _id: "69228dac758610b8abeb63b6", fullName: "Sofía Rivas" },
  { _id: "69228dac758610b8abeb63b7", fullName: "Miguel Torres" },
  { _id: "69228dac758610b8abeb63b8", fullName: "Ana Castillo" },
  { _id: "69228dac758610b8abeb63b9", fullName: "Daniel Vega" },
  { _id: "69228dac758610b8abeb63ba", fullName: "Mariana López" },
  { _id: "69228dac758610b8abeb63bb", fullName: "Jorge Salcedo" },
  { _id: "69228dac758610b8abeb63bc", fullName: "Paula Andrade" },
  { _id: "69228dac758610b8abeb63bd", fullName: "Ricardo Fuentes" },
];

// Productos
const products = [
  { title: "Handwoven Alpaca Scarf", price: 48 },
  { title: "Knitted Baby Blanket", price: 55 },
  { title: "Handmade Crochet Tote Bag", price: 32 },
  { title: "Chunky Knit Pillow Cover", price: 29 },
  { title: "Andean Knitted Poncho", price: 78 },
  { title: "Handwoven Table Runner", price: 36 },
  { title: "Crochet Headband", price: 18 },
  { title: "Knitted Wool Socks", price: 22 },
  { title: "Macramé Wall Hanging", price: 45 },
  { title: "Hand-Knit Sweater", price: 89 },
];

// Funciones auxiliares
const randomInt = (min: number, max: number) => Math.floor(Math.random() * (max - min + 1)) + min;

const randomDate = (start: Date, end: Date) => {
  return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
};

// Conexión a MongoDB
mongoose.connect("mongodb://localhost:27017/tuDB", {}).then(async () => {
  console.log("Conectado a MongoDB");

  const now = new Date();
  const sixMonthsAgo = new Date();
  sixMonthsAgo.setMonth(now.getMonth() - 6);

  for (let i = 0; i < 100; i++) {
    // Elegir un comprador aleatorio
    const buyer = buyers[randomInt(0, buyers.length - 1)];

    // Elegir 1-3 productos aleatorios
    const numItems = randomInt(1, 3);
    const selectedProducts: any[] = [];
    const usedIndexes = new Set<number>();
    while (selectedProducts.length < numItems) {
      const idx = randomInt(0, products.length - 1);
      if (!usedIndexes.has(idx)) {
        usedIndexes.add(idx);
        const product = products[idx];
        const quantity = randomInt(1, 3);
        const discount = Math.random() < 0.3 ? randomInt(5, 15) : 0; // 30% chance de descuento
        const priceAfterDiscount = product.price * (1 - discount / 100);
        selectedProducts.push({
          productId: new mongoose.Types.ObjectId(),
          sellerId,
          quantity,
          priceAtPurchase: product.price,
          discount,
          subtotal: parseFloat((quantity * priceAfterDiscount).toFixed(2)),
        });
      }
    }

    const itemsTotal = selectedProducts.reduce((sum, item) => sum + item.subtotal, 0);
    const shippingTotal = 5;
    const grandTotal = parseFloat((itemsTotal + shippingTotal).toFixed(2));

    await Order.create({
      buyerId: new mongoose.Types.ObjectId(buyer._id),
      items: selectedProducts,
      itemsTotal,
      shippingTotal,
      grandTotal,
      status: ["pending", "processing", "shipped", "delivered"][randomInt(0, 3)],
      createdAt: randomDate(sixMonthsAgo, now),
    });
  }

  console.log("100 órdenes demo generadas exitosamente.");
  mongoose.disconnect();
});
