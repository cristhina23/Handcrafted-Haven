// pages/api/orders/[id].ts
import { NextApiRequest, NextApiResponse } from "next";
import { connectDB } from "@/lib/db/db";
import { Order } from "@/lib/models/Order";

connectDB();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { id } = req.query;

  switch (req.method) {
    case "GET":
      try {
        const orders = await Order.find().sort({ createdAt: -1 });
        return res.status(200).json(orders);
      } catch (err) {
        return res.status(500).json({ error: "Failed to fetch orders" });
      }

    case "PUT":
      try {
        const { status } = req.body;
        if (!status) return res.status(400).json({ error: "Status is required" });

        const updatedOrder = await Order.findByIdAndUpdate(
          id,
          { status },
          { new: true }
        );
        if (!updatedOrder) return res.status(404).json({ error: "Order not found" });

        return res.status(200).json(updatedOrder);
      } catch (err) {
        return res.status(500).json({ error: "Failed to update order" });
      }

    case "DELETE":
      try {
        const deletedOrder = await Order.findByIdAndDelete(id);
        if (!deletedOrder) return res.status(404).json({ error: "Order not found" });

        return res.status(200).json({ message: "Order deleted successfully" });
      } catch (err) {
        return res.status(500).json({ error: "Failed to delete order" });
      }

    default:
      return res.status(405).json({ error: "Method not allowed" });
  }
}
