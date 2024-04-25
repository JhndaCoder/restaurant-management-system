import { Request, Response, NextFunction } from 'express';
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

// GET /foods
export const getAllFoods = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const foods = await prisma.food.findMany({
      include: {
        chef: true,
        Contains: true,
      },
    });
    res.json(foods);
  } catch (error) {
    next(error);
  }
};

// GET /foods/:id
export const getFoodById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    const food = await prisma.food.findUnique({
      where: { item_no: Number(id) },
      include: {
        chef: true,
        Contains: true,
      },
    });
    if (!food) {
      return res.status(404).json({ message: 'Food item not found' });
    }
    res.json(food);
  } catch (error) {
    next(error);
  }
};

// POST /foods
export const createFood = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { item_name, item_type, item_price, item_stock, chef_id } = req.body;
    const newFood = await prisma.food.create({
      data: {
        item_name,
        item_type,
        item_price,
        item_stock,
        chef_id,
      },
    });
    res.status(201).json(newFood);
  } catch (error) {
    next(error);
  }
};

// PUT /foods/:id
export const updateFood = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    const { item_name, item_type, item_price, item_stock, chef_id } = req.body;
    const updatedFood = await prisma.food.update({
      where: { item_no: Number(id) },
      data: {
        item_name,
        item_type,
        item_price,
        item_stock,
        chef_id,
      },
    });
    if (!updatedFood) {
      return res.status(404).json({ message: 'Food item not found' });
    }
    res.json(updatedFood);
  } catch (error) {
    next(error);
  }
};

// DELETE /foods/:id
export const deleteFood = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    const deletedFood = await prisma.food.delete({
      where: { item_no: Number(id) },
    });
    if (!deletedFood) {
      return res.status(404).json({ message: 'Food item not found' });
    }
    res.json(deletedFood);
  } catch (error) {
    next(error);
  }
};
