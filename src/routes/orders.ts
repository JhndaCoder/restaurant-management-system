import { Router } from "express";
import { getAllOrders,getOrderById,createOrder,updateOrder,deleteOrder } from "../controllers/orders";
export const orderRoutes = Router();
orderRoutes
  .get('/', getAllOrders)
  .get('/:id', getOrderById)
  .post('/', createOrder)
  .put('/:id', updateOrder)
  .delete('/:id', deleteOrder);
