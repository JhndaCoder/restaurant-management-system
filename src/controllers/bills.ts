import { Request, Response, NextFunction } from 'express';
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();
// GET /bills
export const getAllBills = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const bills = await prisma.bill.findMany({
      include: {
        Order: true,
      },
    });
    res.json(bills);
  } catch (error) {
    next(error);
  }
};

// GET /bills/:id
export const getBillById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    const bill = await prisma.bill.findUnique({
      where: { bill_no: Number(id) },
      include: {
        Order: true,
      },
    });
    if (!bill) {
      return res.status(404).json({ message: 'Bill not found' });
    }
    res.json(bill);
  } catch (error) {
    next(error);
  }
};

// POST /bills
export const createBill = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { tot_price, tax, discount, net_payable, ord_no } = req.body;
    const newBill = await prisma.bill.create({
      data: {
        tot_price,
        tax,
        discount,
        net_payable,
        ord_no,
      },
    });
    res.status(201).json(newBill);
  } catch (error) {
    next(error);
  }
};

// PUT /bills/:id
export const updateBill = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    const { tot_price, tax, discount, net_payable, ord_no } = req.body;
    const updatedBill = await prisma.bill.update({
      where: { bill_no: Number(id) },
      data: {
        tot_price,
        tax,
        discount,
        net_payable,
        ord_no,
      },
    });
    if (!updatedBill) {
      return res.status(404).json({ message: 'Bill not found' });
    }
    res.json(updatedBill);
  } catch (error) {
    next(error);
  }
};

// DELETE /bills/:id
export const deleteBill = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    const deletedBill = await prisma.bill.delete({
      where: { bill_no: Number(id) },
    });
    if (!deletedBill) {
      return res.status(404).json({ message: 'Bill not found' });
    }
    res.json(deletedBill);
  } catch (error) {
    next(error);
  }
};
