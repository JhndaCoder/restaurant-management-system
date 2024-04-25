import { Request, Response, NextFunction } from 'express';
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

// GET /waiters
export const getAllWaiters = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const waiters = await prisma.waiter.findMany({
      include: {
        Orders: true,
        Tips: true,
      },
    });
    res.json(waiters);
  } catch (error) {
    next(error);
  }
};

// GET /waiters/:id
export const getWaiterById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    const waiter = await prisma.waiter.findUnique({
      where: { waiter_id: Number(id) },
      include: {
        Orders: true,
        Tips: true,
      },
    });
    if (!waiter) {
      return res.status(404).json({ message: 'Waiter not found' });
    }
    res.json(waiter);
  } catch (error) {
    next(error);
  }
};

// POST /waiters
export const createWaiter = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { waiter_fname, waiter_lname } = req.body;
    const newWaiter = await prisma.waiter.create({
      data: {
        waiter_fname,
        waiter_lname,
      },
    });
    res.status(201).json(newWaiter);
  } catch (error) {
    next(error);
  }
};

// PUT /waiters/:id
export const updateWaiter = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    const { waiter_fname, waiter_lname } = req.body;
    const updatedWaiter = await prisma.waiter.update({
      where: { waiter_id: Number(id) },
      data: {
        waiter_fname,
        waiter_lname,
      },
    });
    if (!updatedWaiter) {
      return res.status(404).json({ message: 'Waiter not found' });
    }
    res.json(updatedWaiter);
  } catch (error) {
    next(error);
  }
};

// DELETE /waiters/:id
export const deleteWaiter = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    const deletedWaiter = await prisma.waiter.delete({
      where: { waiter_id: Number(id) },
    });
    if (!deletedWaiter) {
      return res.status(404).json({ message: 'Waiter not found' });
    }
    res.json(deletedWaiter);
  } catch (error) {
    next(error);
  }
};
