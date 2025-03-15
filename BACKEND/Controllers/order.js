import orderModel from "../Models/order.js";
import userModel from "../Models/user.js";

// Order place
const orderPlace = async (req, res) => {
  try {
    const { id } = req.headers;
    const { order } = req.body;

    if (!id || !order || !Array.isArray(order)) {
      return res
        .status(400)
        .json({ success: false, msg: "Invalid input data" });
    }

    for (const orderData of order) {
      const newOrder = new orderModel({
        user: id,
        book: orderData._id,
      });
      const orderDataFromDb = await newOrder.save();
      // Saving order in userModel
      await userModel.findByIdAndUpdate(id, {
        $push: { orders: orderDataFromDb._id },
      });
      // Clearing cart
      await userModel.findByIdAndUpdate(id, { $pull: { cart: orderData._id } });
    }

    return res
      .status(200)
      .json({ success: true, msg: "Order Placed Successfully" });
  } catch (error) {
    console.error("Error placing order:", error);
    res.status(500).json({ success: false, msg: "An Error Occurred" });
  }
};

// Get orders history
const getOrderHistory = async (req, res) => {
  try {
    const { id } = req.headers;

    if (!id) {
      return res
        .status(400)
        .json({ success: false, msg: "User ID is required" });
    }

    const userData = await userModel.findById(id).populate({
      path: "orders",
      populate: { path: "book" },
    });

    if (!userData) {
      return res.status(404).json({ success: false, msg: "User not found" });
    }

    const ordersData = userData.orders.reverse();
    return res.status(200).json({
      success: true,
      data: ordersData,
    });
  } catch (error) {
    console.error("Error fetching order history:", error);
    res.status(500).json({ success: false, msg: "An Error Occurred" });
  }
};

// Get all orders
const getAllOrders = async (req, res) => {
  try {
    const ordersData = await orderModel
      .find()
      .populate({ path: "book" })
      .populate({ path: "user" })
      .sort({ createdAt: -1 });

    return res.status(200).json({ success: true, data: ordersData });
  } catch (error) {
    console.error("Error fetching all orders:", error);
    res.status(500).json({ success: false, msg: "An Error Occurred" });
  }
};

// Update status by admin
const updateStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    if (!status) {
      return res
        .status(400)
        .json({ success: false, msg: "Status is required" });
    }

    await orderModel.findByIdAndUpdate(id, { status });

    return res
      .status(200)
      .json({ success: true, msg: "Status Updated Successfully" });
  } catch (error) {
    console.error("Error updating status:", error);
    res.status(500).json({ success: false, msg: "An Error Occurred" });
  }
};

export { orderPlace, getOrderHistory, getAllOrders, updateStatus };
