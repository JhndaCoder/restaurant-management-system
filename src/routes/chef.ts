import express from 'express';
import {
  getAllChefs,
  getChefById,
  createChef,
  updateChef,
  deleteChef,
} from '../controllers/chef';

export const router = express.Router();

router.get('/', getAllChefs);
router.get('/:id', getChefById);
router.post('/', createChef);
router.put('/:id', updateChef);
router.delete('/:id', deleteChef);


