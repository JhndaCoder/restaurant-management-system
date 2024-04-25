import { Request, Response, NextFunction } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// GET /orders
export const getAllOrders = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const orders = await prisma.order.findMany();
    res.json(orders);
  } catch (error) {
    next(error);
  }
};

// GET /orders/:id
export const getOrderById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const id = req.params.id;
    const order = await prisma.order.findUnique({
      where: {
        ord_no: parseInt(id),
      },
    });
    res.send(order);
  } catch (error) {
    next(error);
  }
};

// POST /orders
export const createOrder = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { cust_id, waiter_id } = req.body;
    const newOrder = await prisma.order.create({
      data: {
        cust_id: parseInt(cust_id),
        waiter_id: parseInt(waiter_id),
      },
    });
    res.json(newOrder);
  } catch (error) {
    next(error);
  }
};

// PUT /orders/:id
export const updateOrder = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const id = req.params.id;
    const { cust_id, waiter_id } = req.body;
    const updatedOrder = await prisma.order.update({
      where: {
        ord_no: parseInt(id),
      },
      data: {
        cust_id: parseInt(cust_id),
        waiter_id: parseInt(waiter_id),
      },
    });
    res.json(updatedOrder);
  } catch (error) {
    next(error);
  }
};

// DELETE /orders/:id
export const deleteOrder = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const id = req.params.id;
    const deletedOrder = await prisma.order.delete({
      where: {
        ord_no: parseInt(id),
      },
    });
    res.json(deletedOrder);
  } catch (error) {
    next(error);
  }
};

// Router
