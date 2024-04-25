import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()
import { NextFunction, Request, Response } from "express";

export const getall = async(req:Request,res:Response,next:NextFunction) => {
   try {
    const customers = await prisma.customer.findMany();
     res.send(customers)
   } catch (error) {
    next(error)
   }
}
 
export const getbyid = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const id = req.params.id;
    const customer = await prisma.customer.findUnique({
      where: {
        cust_id: parseInt(id),
      },
    });
    res.send(customer);
  } catch (error) {
    next(error);
  }
};
 
export const add = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { cust_fname, cust_lname, contact_no } = req.body;
    const newCustomer = await prisma.customer.create({
      data: {
        cust_fname,
        cust_lname,
        contact_no,
      },
    });
    res.json(newCustomer);
  } catch (error) {
    next(error);
  }
};

export const update = async (req: Request, res: Response, next: NextFunction) => {
 try {
   const { id } = req.params;
   const { cust_fname, cust_lname, contact_no } = req.body;
   const updatedCustomer = await prisma.customer.update({
     where: {
       cust_id: parseInt(id),
     },
     data: {
       cust_fname,
       cust_lname,
       contact_no,
     },
   });
   if (updatedCustomer) {
     res.json(updatedCustomer);
   } else {
     res.status(404).json({ error: 'Customer not found' });
   }
 } catch (error) {
  next(error)
 }
};

export const deletee = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    const deletedCustomer = await prisma.customer.delete({
      where: {
        cust_id: parseInt(id),
      },
    });
    if (deletedCustomer) {
      res.json(deletedCustomer);
    } else {
      res.status(404).json({ error: 'Customer not found' });
    }
  } catch (error) {
    next(error)
  }
};

