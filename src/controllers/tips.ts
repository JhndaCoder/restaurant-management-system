import { Request, Response, NextFunction } from 'express';
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

// GET /tips
export const getAllTips = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const tips = await prisma.tip.findMany({
      include: {
        customer: true,
        waiter: true,
      },
    });
    res.json(tips);
  } catch (error) {
    next(error);
  }
};

// GET /tips/:customerId/:waiterId
export const getTipByIds = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { customerId, waiterId } = req.params;
    const tip = await prisma.tip.findUnique({
      where: {
        cust_id_waiter_id: {
          cust_id: Number(customerId),
          waiter_id: Number(waiterId),
        },
      },
      include: {
        customer: true,
        waiter: true,
      },
    });
    if (!tip) {
      return res.status(404).json({ message: 'Tip not found' });
    }
    res.json(tip);
  } catch (error) {
    next(error);
  }
};

// POST /tips
export const createTip = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { cust_id, waiter_id, tip } = req.body;
    const newTip = await prisma.tip.create({
      data: {
        cust_id,
        waiter_id,
        tip,
      },
    });
    res.status(201).json(newTip);
  } catch (error) {
    next(error);
  }
};

// PUT /tips/:customerId/:waiterId
export const updateTip = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { customerId, waiterId } = req.params;
    const { tip } = req.body;
    const updatedTip = await prisma.tip.update({
      where: {
        cust_id_waiter_id: {
          cust_id: Number(customerId),
          waiter_id: Number(waiterId),
        },
      },
      data: {
        tip,
      },
    });
    if (!updatedTip) {
      return res.status(404).json({ message: 'Tip not found' });
    }
    res.json(updatedTip);
  } catch (error) {
    next(error);
  }
};

// DELETE /tips/:customerId/:waiterId
export const deleteTip = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { customerId, waiterId } = req.params;
    const deletedTip = await prisma.tip.delete({
      where: {
        cust_id_waiter_id: {
          cust_id: Number(customerId),
          waiter_id: Number(waiterId),
        },
      },
    });
    if (!deletedTip) {
      return res.status(404).json({ message: 'Tip not found' });
    }
    res.json(deletedTip);
  } catch (error) {
    next(error);
  }
};
