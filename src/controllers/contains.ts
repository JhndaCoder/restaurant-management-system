import { Request, Response, NextFunction } from 'express';
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

// GET /contains
export const getAllContains = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const contains = await prisma.contains.findMany({
      include: {
        food: true,
        order: true,
      },
    });
    res.json(contains);
  } catch (error) {
    next(error);
  }
};

// GET /contains/:itemId/:orderId
export const getContainsByIds = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { itemId, orderId } = req.params;
    const contain = await prisma.contains.findUnique({
      where: {
        item_no_ord_no: {
          item_no: Number(itemId),
          ord_no: Number(orderId),
        },
      },
      include: {
        food: true,
        order: true,
      },
    });
    if (!contain) {
      return res.status(404).json({ message: 'Contains relation not found' });
    }
    res.json(contain);
  } catch (error) {
    next(error);
  }
};

// POST /contains
export const createContains = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { item_no, ord_no } = req.body;
    const newContain = await prisma.contains.create({
      data: {
        item_no,
        ord_no,
      },
    });
    res.status(201).json(newContain);
  } catch (error) {
    next(error);
  }
};

// DELETE /contains/:itemId/:orderId
export const deleteContains = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { itemId, orderId } = req.params;
    const deletedContain = await prisma.contains.delete({
      where: {
        item_no_ord_no: {
          item_no: Number(itemId),
          ord_no: Number(orderId),
        },
      },
    });
    if (!deletedContain) {
      return res.status(404).json({ message: 'Contains relation not found' });
    }
    res.json(deletedContain);
  } catch (error) {
    next(error);
  }
};
