const { connectDB } = require("@/lib/db/db");
const { Order } = require("@/lib/models/Order");
const { Seller } = require("@/lib/models/Seller");
const { User } = require("@/lib/models/User");
const { NextResponse } = require("next/server");
const { auth } = require("@clerk/nextjs/server");
const mongoose = require("mongoose");

module.exports = {
  async GET(req, { params }) {
    try {
      const { id } = params;
      await connectDB();
      if (!mongoose.Types.ObjectId.isValid(id)) {
        return NextResponse.json({ message: "Invalid order ID" }, { status: 400 });
      }
      const order = await Order.findById(id)
        .populate({ path: "items.productId", select: "title images" })
        .lean();
      if (!order) {
        return NextResponse.json({ message: "Order not found" }, { status: 404 });
      }
      return NextResponse.json({ order });
    } catch (error) {
      console.error("Error fetching order:", error);
      return NextResponse.json({ message: "Server error" }, { status: 500 });
    }
  },
};
