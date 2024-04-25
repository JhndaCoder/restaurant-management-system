import express from 'express';
import {
  getAllContains,
  getContainsByIds,
  createContains,
  deleteContains,
} from '../controllers/contains';

export const router = express.Router();

router.get('/', getAllContains);
router.get('/:itemId/:orderId', getContainsByIds);
router.post('/', createContains);
router.delete('/:itemId/:orderId', deleteContains);

export default router;
