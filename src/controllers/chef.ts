import { Request, Response, NextFunction } from 'express';

import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();


// GET /chefs
export const getAllChefs = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const chefs = await prisma.chef.findMany({
      include: {
        Foods: true,
      },
    });
    res.json(chefs);
  } catch (error) {
    next(error);
  }
};

// GET /chefs/:id
export const getChefById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    const chef = await prisma.chef.findUnique({
      where: { chef_id: Number(id) },
      include: {
        Foods: true,
      },
    });
    if (!chef) {
      return res.status(404).json({ message: 'Chef not found' });
    }
    res.json(chef);
  } catch (error) {
    next(error);
  }
};

// POST /chefs
export const createChef = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { chef_fname, chef_lname, chef_type } = req.body;
    const newChef = await prisma.chef.create({
      data: {
        chef_fname,
        chef_lname,
        chef_type,
      },
    });
    res.status(201).json(newChef);
  } catch (error) {
    next(error);
  }
};

// PUT /chefs/:id
export const updateChef = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    const { chef_fname, chef_lname, chef_type } = req.body;
    const updatedChef = await prisma.chef.update({
      where: { chef_id: Number(id) },
      data: {
        chef_fname,
        chef_lname,
        chef_type,
      },
    });
    if (!updatedChef) {
      return res.status(404).json({ message: 'Chef not found' });
    }
    res.json(updatedChef);
  } catch (error) {
    next(error);
  }
};

// DELETE /chefs/:id
export const deleteChef = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    const deletedChef = await prisma.chef.delete({
      where: { chef_id: Number(id) },
    });
    if (!deletedChef) {
      return res.status(404).json({ message: 'Chef not found' });
    }
    res.json(deletedChef);
  } catch (error) {
    next(error);
  }
};
