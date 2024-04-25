import express from 'express';
import {
  getAllWaiters,
  getWaiterById,
  createWaiter,
  updateWaiter,
  deleteWaiter,
} from '../controllers/waiters';

export const router = express.Router();

router.get('/', getAllWaiters);
router.get('/:id', getWaiterById);
router.post('/', createWaiter);
router.put('/:id', updateWaiter);
router.delete('/:id', deleteWaiter);

export default router;
